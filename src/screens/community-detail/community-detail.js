import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { openToast, toggleLoader } from "../../store/reducer";

import { Container, EmptyState } from "../../atom-components";
import { baseOpacity, COLORS, placeholder_profile_img } from "../../globals";
import {
  AddPostModal,
  CommunityDetailHeader,
  Header,
  PostCard,
  PostOptionBottomSheet,
} from "../../components";
import { sizer, validateEmptyField } from "../../helpers";
import ApiManager from "../../helpers/api-manager";
import format from "pretty-format";
import { BoldPlusIcon } from "../../assets";

const CommunityDetail = ({ route, navigation }) => {
  const { id } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [postOption, setPostOption] = useState(false);
  const [postId, setPostId] = useState("");
  const [data, setData] = useState({
    communityData: {},
    postsData: [],
  });
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    content: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storeReducer);
  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e }));
    if (formError[name]) {
      setFormError((prevFormErr) => ({
        ...prevFormErr,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let obj = {};
    obj.content = validateEmptyField(formData?.content, "post");
    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const fetchData = async (loader = true) => {
    loader && dispatch(toggleLoader({ loader: true, background: "white" }));
    try {
      const [communityRes, postRes] = await Promise.all([
        ApiManager("get", `community/${id}`),
        ApiManager("get", `post?communityId=${id}`),
      ]);
      setData({
        communityData: communityRes.data.response.details,
        postsData: postRes.data.response.details,
      });
    } catch (error) {
      dispatch(openToast({ message: error.response.data.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleSave = async () => {
    if (validate()) return;
    dispatch(toggleLoader(true));
    setModalVisible(false);
    try {
      let { data } = await ApiManager("post", "post", {
        content: formData?.content,
        communityId: id,
      });
      dispatch(openToast({ type: "success", message: data?.message }));
      fetchData();
      setFormData({
        content: "",
      });
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormError(error?.response?.data?.details);
        dispatch(openToast({ message: error?.response?.data?.message }));
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleJoinAndUnJoin = async (action) => {
    dispatch(toggleLoader(true));
    try {
      let { data } = await ApiManager("post", `community/${id}/${action}`);
      dispatch(openToast({ type: "success", message: data?.message }));
      fetchData();
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handlePostDeleteAndUpdate = async (method, pinnedStatus = false, onPinPress = false) => {
    setModalVisible(false);
    dispatch(toggleLoader(true));
    try {
      let { data } = await ApiManager(
        method,
        `post/${postId?.id}`,
        method == "patch"
          ? {
            content: formData?.content,
            ...(onPinPress ? pinnedStatus ? { unpinned: true } : { pinned: true } : {})
          }
          : {}
      );
      dispatch(openToast({ type: "success", message: data?.message }));
      fetchData();
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };


  const handleLikePress = async (postId, isLiked) => {
    try {
      await ApiManager("post", `post/${postId}/${isLiked ? "like" : "unlike"}`);
      fetchData(false);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <PostCard
      me={user}
      data={item}
      navigation={navigation}
      communityData={data?.communityData}
      onLikePress={handleLikePress}
      onMenuPress={() => {
        setPostOption(true),
          setPostId(item),
          setFormData({
            content: item?.content,
          });
      }}
    />
  );

  const renderFloatingButton = () => {
    if (
      data?.communityData?.isJoined ||
      data?.communityData?.createdBy?.id === user?.details?.id
    ) {
      return (
        <TouchableOpacity
          style={styles.floatingButton}
          activeOpacity={baseOpacity}
          onPress={() => {
            setFormData({ content: "" });
            setPostId("");
            setModalVisible(true);
          }}
        >
          <BoldPlusIcon
            width={sizer.moderateScale(25)}
            height={sizer.moderateVerticalScale(25)}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };



  return (
    <>
      <Container bgColor={COLORS.whiteV1} pH={0}>
        <Header back pH={16} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={40}
          style={{ flex: 1 }}
        >
          <FlatList
            data={data?.postsData || []}
            ListHeaderComponent={
              <CommunityDetailHeader
                handleJoinAndUnJoin={handleJoinAndUnJoin}
                data={data?.communityData}
                fetchData={fetchData}
              />
            }
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyState message={"No Post Found"} />}
          />
        </KeyboardAvoidingView>
        {renderFloatingButton()}
        <PostOptionBottomSheet
          isVisible={postOption}
          setVisible={setPostOption}
          handlePostDeleteAndUpdate={handlePostDeleteAndUpdate}
          setPostModal={setModalVisible}
          communityData={data?.communityData}
          postData={postId}
          userId={user?.details?.id}
        />
      </Container >
      <AddPostModal
        visible={modalVisible}
        setVisible={setModalVisible}
        formData={formData}
        formError={formError}
        handleChange={handleChange}
        handleSave={postId?.id ? handlePostDeleteAndUpdate : handleSave}
        isUpdate={postId?.id}
      />
    </>
  );
};

export default CommunityDetail;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    right: sizer.moderateScale(16),
    bottom: sizer.moderateVerticalScale(16),
    width: sizer.moderateScale(56),
    height: sizer.moderateScale(56),
    borderRadius: sizer.moderateScale(28),
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    paddingHorizontal: sizer.moderateScale(10),
  },
});
