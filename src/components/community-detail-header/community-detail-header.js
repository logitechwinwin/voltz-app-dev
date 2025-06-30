import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Flex, Typography } from "../../atom-components";
import OutlineButton from "../custom-buttons/outline-button/outline-button";
import ProfileHeader from "../profile-header/profile-header";
import { sizer } from "../../helpers";
import { baseOpacity, COLORS, placeholder_cover_img } from "../../globals";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, TickIcon } from "../../assets";
import Confirmation from "../custom-modal/confirmation-modal";
import { useCheckLoginStatus } from "../../hooks";
import AddCommunityModal from "../custom-modal/add-community-modal/add-community-modal";
import { openToast, toggleLoader } from "../../store/reducer";
import ApiManager from "../../helpers/api-manager";

const CommunityDetailHeader = ({
  handleJoinAndUnJoin = () => { },
  data = {},
  fetchData = () => { },
}) => {
  const { user } = useSelector((state) => state.storeReducer);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const { checkLoginStatus } = useCheckLoginStatus();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleCommunityJoin = () => {
    if (checkLoginStatus()) {
      if (data?.isJoined) {
        setModal(true);
        return;
      }
      handleJoinAndUnJoin("join");
    }
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

  const communityId = Number(data?.id);

  const handleSave = async () => {
    // dispatch(toggleLoader(true));
    setLoading(true)
    let _fd = new FormData();
    _fd.append("bannerImage", {
      uri: formData?.bannerImage,
      type: "image/jpeg",
      name: "bannerImage.jpg",
    });
    _fd.append("title", formData?.title);
    _fd.append("description", formData?.description);
    try {
      let { data } = await ApiManager(
        "patch",
        `community/${communityId}`,
        _fd,
        {
          "content-type": "multipart/form-data",
        }
      );
      dispatch(openToast({ type: "success", message: data?.message }));
      fetchData();
      setEditModal(false);
      setFormData({
        bannerImage: "",
        title: "",
        description: "",
      });
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormError(error?.response?.data?.details);
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      setLoading(false)
      // dispatch(toggleLoader(false));

    }
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <ProfileHeader
        coverImg={{ uri: data?.bannerImage || placeholder_cover_img }}
      >
        <Typography text="Community" mT={14} size={11} color="#27272E99" />
        <Typography text={data.title} size={24} bold color="#3C3F43" />
        <Typography size={12} LineHeight={18} mT={4} text={data?.description} />

        {data?.createdBy?.id === user?.details?.id && (
          <TouchableOpacity
            hitSlop={{ right: 5, left: 5, top: 5, bottom: 5 }}
            activeOpacity={baseOpacity}
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              setFormError({})
              setEditModal(true);
            }}
          >
            <EditIcon width={25} height={25} />
          </TouchableOpacity>
        )}
        {data?.createdBy?.id !== user?.details?.id && (
          <Flex>
            <OutlineButton
              style={{ height: sizer.moderateVerticalScale(38) }}
              label={data?.isJoined ? "Joined" : "Join"}
              active={data?.isJoined}
              icon={
                data?.isJoined && (
                  <TickIcon
                    stroke={!data?.isJoined ? COLORS.primary : COLORS.white}
                    width={sizer.moderateScale(12)}
                    height={sizer.moderateVerticalScale(12)}
                  />
                )
              }
              onPress={handleCommunityJoin}
            />
          </Flex>
        )}

        {data?.isJoined && (
          <Confirmation
            isVisible={modal}
            setVisible={setModal}
            onPress={() => {
              handleJoinAndUnJoin("unjoin");
            }}
            leftLabel="Yes! Leave"
            leave="community"
            action="leave"
          />
        )}

        <AddCommunityModal
          visible={editModal}
          loading={loading}
          setVisible={setEditModal}
          formData={formData}
          formError={formError}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      </ProfileHeader>
    </View>
  );
};

export default CommunityDetailHeader;

const styles = StyleSheet.create({});
