import { Fragment, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { COLORS, baseOpacity, placeholder_profile_img } from "../../globals";
import { sizer } from "../../helpers";
import { Flex } from "../../atom-components";
import { BoldPlusIcon } from "../../assets";
import {
  HorizontalScrollviewSpacing,
  ProfileBottomSheet,
  StoryModal,
  StoryOptionBottomSheet,
} from "../index";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ApiManager from "../../helpers/api-manager";
import { openToast, toggleLoader } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import format from "pretty-format";
import {
  AddStoryModal,
  CustomBottomSheet,
  HorizontalFlatlist,
  ProfileHeader,
} from "./shared";
import { ViewAll } from "../../screens/today/shared";
import { EmptyState, Typography } from "../../atom-components";
import { CONSTANTS } from "../../globals";

const Stories = () => {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [userStory, setUserStory] = useState([]);
  const [storyOption, setStoryOption] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storeReducer);
  const users = stories?.allStories || [];

  const getAllStories = async () => {
    try {
      let { data } = await ApiManager("get", `story`);
      setStories(data?.response?.details);
    } catch (error) {
      console.log("🚀 ~ getAllStories ~ error:", error?.response?.data);
      // dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
    }
  };

  const recordVideo = async () => {
    const options = {
      mediaType: "video",
      durationLimit: 30,
      videoQuality: "high",
    };
    await launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled video recording");
      } else if (response.errorCode) {
        console.log("Error: ", response.errorMessage);
      } else {
        console.log("Video path: ", response.assets[0].uri);
        uploadMedia(response.assets[0].uri, "video");
      }
    })
  };

  const openGallery = async () => {
    const options = {
      mediaType: "mixed",
      durationLimit: 30,
    };
    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled media picking");
      } else if (response.errorCode) {
        console.log("Error: ", response.errorMessage);
      } else {
        const selectedMediaType = response.assets[0].type;
        if (selectedMediaType.startsWith("image/")) {
          uploadMedia(response.assets[0].uri, "image");
        } else if (selectedMediaType.startsWith("video/")) {
          const videoDuration = response.assets[0].duration;
          if (videoDuration <= 30) {
            uploadMedia(response.assets[0].uri, "video");
          } else {
            dispatch(
              openToast({
                message: "Please select a video shorter than 30 seconds.",
              })
            );
          }
        }
      }
    })
      ;
  };

  const uploadMedia = async (videoUri, type) => {
    console.log("🚀 ~ uploadMedia ~ type:", type)
    console.log("🚀 ~ uploadMedia ~ videoUri:", videoUri)
    const _fd = new FormData();
    setLoading(true);
    try {
      _fd.append("storyFile", {
        uri: videoUri,
        type: type == "image" ? "image/jpeg" : "video/mp4",
        name: type == "image" ? "image.jpeg" : "video.mp4",
      });
      let { data } = await ApiManager("post", "story", _fd, {
        "content-type": "multipart/form-data",
      });
      dispatch(openToast({ type: "success", message: data?.message }));
      getAllStories();
    } catch (error) {
      // console.log("🚀 ~ uploadMedia ~ error:", error?.response?.data);
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setLoading(false);
    }
  };

  const AvatarImage = ({ profileImage = null, size = 67 }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          style={{ backgroundColor: COLORS.secondary, zIndex: 10 }}
          size={sizer.moderateScale(size)}
          source={{
            uri: profileImage || placeholder_profile_img,
          }}
        />
      </View>
    );
  };

  const nextUserStory = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setUserStory({
        stories: users[currentUserIndex + 1]?.stories,
        user: users[currentUserIndex + 1]?.user,
      });
    } else {
      setVisible(false);
    }
  };

  const prevUserStory = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setUserStory({
        stories: users[currentUserIndex - 1]?.stories,
        user: users[currentUserIndex - 1]?.user,
      });
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <>
      <HorizontalScrollviewSpacing>
        <Flex gap={12} mt={8}>
          <TouchableOpacity
            style={{ padding: 5 }}
            activeOpacity={baseOpacity}
            onPress={() => setStoryOption(true)}
          >
            {!loading && stories?.myStories?.stories?.length ? (
              <LinearGradient
                colors={["#17B582", "#00676D"]}
                start={{ x: 1, y: 0.01 }}
                style={{
                  borderRadius: 50,
                  padding: 3,
                }}
              >
                <AvatarImage
                  size={72}
                  profileImage={user?.details?.profileImage}
                />
              </LinearGradient>
            ) : (
              <>
                {loading && (
                  <ActivityIndicator
                    size={sizer.moderateScale(72 + 5)}
                    color={COLORS.primary}
                    style={styles.loader}
                  />
                )}
                <AvatarImage
                  size={72}
                  profileImage={user?.details?.profileImage}
                />
              </>
            )}
            <View style={styles.plusView}>
              <BoldPlusIcon />
            </View>
          </TouchableOpacity>
          {(stories?.allStories || []).map((user, i) => {
            return (
              <Fragment key={i}>
                <TouchableOpacity
                  key={i}
                  activeOpacity={baseOpacity}
                  onPress={() => {
                    setCurrentUserIndex(i);
                    setVisible(true);
                    setUserStory({ stories: user?.stories, user: user?.user });
                  }}
                  onLongPress={() => {
                    setProfileVisible(true);
                  }}
                >
                  <LinearGradient
                    colors={["#17B582", "#00676D"]}
                    start={{ x: 1, y: 0.01 }}
                    style={{
                      borderRadius: 50,
                      padding: 3,
                    }}
                  >
                    <AvatarImage profileImage={user?.user?.profileImage} />
                  </LinearGradient>
                </TouchableOpacity>

                <ProfileBottomSheet
                  isVisible={profileVisible}
                  setVisible={setProfileVisible}
                  handlePress={() => {
                    navigation.navigate("VolunteerProfile", {
                      profileType: "public",
                      user: user,
                    });
                    setProfileVisible(false);
                  }}
                />
              </Fragment>
            );
          })}
        </Flex>
      </HorizontalScrollviewSpacing>
      {visible && (
        <StoryModal
          isVisible={visible}
          setVisible={setVisible}
          userStory={userStory}
          nextUserStory={nextUserStory}
          prevUserStory={prevUserStory}
        />
      )}
      <StoryOptionBottomSheet
        isVisible={storyOption}
        setVisible={setStoryOption}
        recordVideo={recordVideo}
        openGallery={openGallery}
        myStory={stories?.myStories?.stories?.length}
        showMyStory={() => {
          setTimeout(() => {
            setCurrentUserIndex(user?.length);
            setVisible(true);
            setUserStory({
              stories: stories?.myStories?.stories,
              user: user?.details,
            });
          }, 1000);

        }}
      />
    </>
  );
};

export default Stories;

const styles = StyleSheet.create({
  plusView: {
    alignItems: "center",
    justifyContent: "center",
    width: sizer.moderateScale(24),
    height: sizer.moderateScale(24),
    position: "absolute",
    top: sizer.moderateScale(56),
    left: sizer.moderateScale(59),
    backgroundColor: COLORS.secondary,
    borderRadius: sizer.fontScale(50),
    zIndex: 11,
  },
  loader: {
    position: "absolute",
    zIndex: 1,
    left: "50%",
    right: "50%",
    bottom: 0,
    top: 0,
  },
  animatedView: {
    flex: 1,
    backgroundColor: "white",
  },
});
