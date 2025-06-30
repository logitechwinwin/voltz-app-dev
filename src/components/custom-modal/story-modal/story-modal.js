import {
  View,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Video from "react-native-video";
import { styles } from "./styles";
import { Flex, Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { COLORS, baseOpacity, placeholder_profile_img } from "../../../globals";
import FastImage from "react-native-fast-image";
import moment from "moment";
import ProgressBar from "../../progress-bar/progress-bar"; // Import your ProgressBar component
import ApiManager from "../../../helpers/api-manager";
import { openToast } from "../../../store/reducer";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../../utils";

export default function StoryModal({
  isVisible,
  setVisible,
  userStory = {},
  nextUserStory = () => { },
  prevUserStory = () => { },
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width, height } = useWindowDimensions();
  const [videoDuration, setVideoDuration] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [storyActions, setStoryActions] = useState([]);
  const dispatch = useDispatch();
  const currentStory = (userStory?.stories || [])[activeIndex];

  const toggleVisible = () => {
    setActiveIndex(0);
    setVisible(false);
  };

  const handleNext = () => {
    if (activeIndex < (userStory?.stories || []).length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
      nextUserStory();
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(0);
      prevUserStory();
    }
  };

  const getMediaType = (url) => {
    const extension = url?.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    }
    return "unknown";
  };

  const storyAction = async (id, action, isSeen) => {
    let actions;
    if (isSeen) return;

    if (action == "toggle-like") {
      actions = ["isLiked", "likesCount"];
    } else if (action == "shared") {
      actions = ["isShared", "sharesCount"];
    } else {
      actions = ["isSeen", "viewsCount"];
    }

    try {
      let { data } = await ApiManager("patch", `story/${id}/${action}`);
      setStoryActions((prevActions) =>
        prevActions.map((story) =>
          story.id === id
            ? {
              ...story,
              [actions[0]]: !story[actions[0]],
              [actions[1]]: !story[actions[0]]
                ? +story[actions[1]] + 1
                : Math.max(0, story[actions[1]] - 1),
            }
            : story
        )
      );
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  };

  const handleLoadStart = () => {
    setIsBuffering(true);
  };

  const handleLoaded = (meta) => {
    setVideoDuration(meta?.duration || 3);
    setIsBuffering(false);
  };

  const handleBuffer = ({ isBuffering }) => {
    setIsBuffering(isBuffering);
  };

  const handleLongPress = () => {
    setIsPaused(true);
  };

  const handlePressOut = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    setStoryActions(userStory?.stories || []);
  }, [userStory]);

  useEffect(() => {
    storyAction(currentStory?.id, "seen", currentStory?.isSeen);
  }, [activeIndex, currentStory?.isSeen]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={toggleVisible}
      animationType="fade"
    >
      <SafeAreaView
        style={styles.container}
      >
        <TouchableOpacity
          activeOpacity={1}
          // onPress={handleNext}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
          style={styles.container}
        >
          <View style={styles.header}>
            <View style={styles.progressView}>
              {(userStory?.stories || []).map((item, i) => (
                <ProgressBar key={i} currentIndex={i} activeIndex={activeIndex} />
              ))}
            </View>
            <Flex
              mt={13}
              algItems="center"
              jusContent="space-between"
              flexStyle={{ zIndex: 10 }}
            >
              <View style={styles.profileSection}>
                <Avatar.Image
                  source={{
                    uri: userStory?.user?.profileImage || placeholder_profile_img,
                  }}
                  size={sizer.fontScale(31)}
                />
                <View style={styles.profileText}>
                  <Typography
                    text={
                      userStory?.user?.firstName + " " + userStory?.user?.lastName
                    }
                    size={14}
                    bold
                    color={COLORS.white}
                  />
                  <Typography
                    text={moment(currentStory?.createdAt).fromNow()}
                    size={12}
                    color={COLORS.white}
                  />
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={baseOpacity}
                onPress={toggleVisible}
                style={{ zIndex: 99 }}
              >
                <Icon name="x" size={sizer.fontScale(30)} color={COLORS.white} />
              </TouchableOpacity>
            </Flex>
          </View>

          {getMediaType(currentStory?.contentUrl) === "image" ? (
            <View style={styles.videoContainer}>
              <FastImage
                source={{
                  uri: currentStory.contentUrl,
                  priority: FastImage.priority.high,
                }}
                style={{ width: width, height: height - 140 }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadStart={() => handleLoadStart()}
                onLoadEnd={() => handleLoaded()}
              />
            </View>
          ) : (
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: currentStory?.contentUrl }}
                style={{ width: width, height: height - 140 }}
                resizeMode="contain"
                paused={isPaused}
                useTextureView
                onEnd={handleNext}
                bufferConfig={{
                  minBufferMs: 5000,
                  maxBufferMs: 30000,
                  bufferForPlaybackMs: 2000,
                  bufferForPlaybackAfterRebufferMs: 3000,
                }}
                onBuffer={handleBuffer}
                onError={(error) => {
                  console.log("Video Error: ", error);
                }}
                onLoadStart={handleLoadStart}
                onLoad={handleLoaded}
                rate={1.0}
                volume={1.0}
              />
            </View>
          )}

          {isBuffering && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          )}

          <TouchableOpacity
            activeOpacity={1}
            style={{ ...styles.touchableArea, left: 0, width: "50%" }}
            onPress={handlePrevious}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={{ ...styles.touchableArea, right: 0, width: "50%" }}
            onPress={handleNext}
          />

          <View style={styles.iconRow}>
            <TouchableOpacity activeOpacity={1} style={styles.bottomIcon}>
              <Icon name="eye" size={20} color={COLORS.white} />
              <Typography color={COLORS.white} size={13}>
                {formatNumber(storyActions[activeIndex]?.viewsCount)}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomIcon}
              onPress={() => storyAction(currentStory?.id, "toggle-like")}
            >
              {storyActions[activeIndex]?.isLiked ? (
                <FontAwesomeIcon name="heart" size={20} color={COLORS.danger} />
              ) : (
                <Icon name="heart" size={20} color={COLORS.white} />
              )}
              <Typography color={COLORS.white} size={13}>
                {formatNumber(storyActions[activeIndex]?.likesCount)}
              </Typography>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
