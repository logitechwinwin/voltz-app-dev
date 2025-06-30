import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import {
  AddCommunityModal,
  HeaderWithTitle,
  HorizontalScrollviewSpacing,
  SearchField,
} from "../../components";
import { sizer, validateEmptyField } from "../../helpers";
import { baseOpacity, COLORS, CONSTANTS, placeholder_cover_img } from "../../globals";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { BoldPlusIcon, ChevronRightBold } from "../../assets";
import { useEffect, useState } from "react";
import ApiManager from "../../helpers/api-manager";
import { useDispatch, useSelector } from "react-redux";
import { openToast, toggleLoader } from "../../store/reducer";
import { ListSkeleton } from "../../components/skeleton-loaders";
import { useCheckLoginStatus } from "../../hooks";
import FilterButtons from "../deals/shared/filter-buttons";

const Community = ({ navigation, route }) => {
  const { user } = useSelector((state) => state?.storeReducer);
  const { userId: id = 0 } = route?.params || {};
  const userId = id || user?.details?.id;
  const [modalVisible, setModalVisible] = useState("");
  const [communityData, setCommunityData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingLoading, setTypingLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    bannerImage: "",
    title: "",
    description: "",
  });
  const [currentCatagory, setCurrentCatagory] = useState("");

  const [path, setPath] = useState("");

  const dispatch = useDispatch();
  const { checkLoginStatus } = useCheckLoginStatus();
  const perPage = 20;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => {
          navigation.navigate("CommunityDetails", { id: item?.id });
        }}
      >
        <Flex
          flexStyle={{ marginBottom: sizer.moderateVerticalScale(15) }}
          algItems="center"
          jusContent="space-between"
        >
          <Flex flexStyle={{ alignItems: "center" }}>
            <Avatar.Image
              style={{ backgroundColor: COLORS.grey }}
              source={{ uri: item?.bannerImage || placeholder_cover_img }}
            />
            <View style={{ marginLeft: sizer.moderateScale(15), width: "72%" }}>
              <Typography text={item.title} numberOfLines={1} semiBold />
              <Typography
                text={item.description}
                numberOfLines={2}
                color="#757575"
                size={12}
              />
            </View>
          </Flex>

          <Flex
            algItems="center"
            flexStyle={{
              position: "absolute",
              right: 0,
            }}
          >
            <ChevronRightBold />
          </Flex>
        </Flex>
      </TouchableOpacity>
    );
  };

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
    obj.bannerImage = validateEmptyField(formData?.bannerImage, "bannerImage");
    obj.title = validateEmptyField(formData?.title, "title");
    obj.description = validateEmptyField(formData?.description, "description");
    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleCategoryChange = (categoryLabel) => {
    setCurrentCatagory(categoryLabel);
    let newPath = "";

    if (categoryLabel.includes("Joined")) {
      newPath = `&joinedCommunities=true`;
    } else if (categoryLabel.includes("My Communities")) {
      newPath = "&myCommunities=true";
    } else if (categoryLabel.includes("Not Joined")) {
      newPath = "&notJoinedCommunities=true";
    }

    setPath(newPath);
  };

  const handleGetCommunities = async () => {
    let apiRoute = userId
      ? `community?page=${page}&perPage=${perPage}${path}&userId=${userId}&activationStatus=active&search=${searchVal}${
          id ? `&myCommunities=true` : ``
        }`
      : `community?page=${page}&perPage=${perPage}&search=${searchVal}&activationStatus=active`;
    setIsLoading(true);
    try {
      let { data } = await ApiManager("get", apiRoute);
      if (page > 1 && !searchVal) {
        setCommunityData((prev) => ({
          ...prev,
          details: [
            ...(prev?.details || []),
            ...(data?.response?.details || []),
          ],
        }));
      } else {
        setCommunityData(data?.response);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (validate()) return;
    dispatch(toggleLoader(true));
    let _fd = new FormData();
    _fd.append("bannerImage", {
      uri: formData?.bannerImage,
      type: "image/jpeg",
      name: "bannerImage.jpg",
    });
    _fd.append("title", formData?.title);
    _fd.append("description", formData?.description);
    try {
      let { data } = await ApiManager("post", "community", _fd, {
        "content-type": "multipart/form-data",
      });
      dispatch(openToast({ type: "success", message: data?.message }));
      handleGetCommunities();
      // setModalVisible(false);
      setFormData({
        bannerImage: "",
        title: "",
        description: "",
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

  const handleLoadMore = () => {
    if (
      communityData?.details?.length >= perPage &&
      communityData?.totalPages !== page
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (searchVal) {
      setCommunityData([]);
      setPage(1);
    }
    handleGetCommunities();
  }, [page, searchVal, user, typingLoading, path, user?.details?.id]);

  return (
    <>
      <Container>
        <HeaderWithTitle label="Community" />
        <View style={{ marginBottom: sizer.moderateVerticalScale(12) }}>
          <SearchField
            value={searchVal}
            setValue={setSearchVal}
            // setLoading={setTypingLoading}
            setData={setCommunityData}
          />
        </View>
        {checkLoginStatus(false) && (
          <View style={{ height: sizer.moderateVerticalScale(80) }}>
            <HorizontalScrollviewSpacing>
              <FilterButtons
                categories={[
                  { label: "All", id: 1 },
                  { label: "Joined", id: 2 },
                  { label: "My Communities", id: 3 },
                  { label: "Not Joined", id: 4 },
                ]}
                oneSelect
                currentCatagory={currentCatagory}
                setCurrentCatagory={handleCategoryChange}
              />
            </HorizontalScrollviewSpacing>
          </View>
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <FlatList
            data={communityData?.details || []}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: communityData?.details?.length ? 0 : 1,
            }}
            ListEmptyComponent={
              isLoading || typingLoading ? (
                <ListSkeleton />
              ) : (
                <EmptyState message={"No Community Found"} />
              )
            }
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoading && communityData?.length && page > 1 ? (
                <ActivityIndicator style={{ marginVertical: 20 }} />
              ) : null
            }
          />
        </KeyboardAvoidingView>
      </Container>
      <AddCommunityModal
        visible={modalVisible}
        setVisible={setModalVisible}
        formData={formData}
        formError={formError}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </>
  );
};

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

export default Community;

//add community button

{
  /* <TouchableOpacity
          style={styles.floatingButton}
          activeOpacity={baseOpacity}
          onPress={() => {
            setFormError("");
            setFormData({});
            checkLoginStatus() && setModalVisible(true);
          }}
        >
          <BoldPlusIcon
            width={sizer.moderateScale(25)}
            height={sizer.moderateVerticalScale(25)}
          />
        </TouchableOpacity> */
}
