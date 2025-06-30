import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomBottomSheet from "../bottom-sheet-wrapper/bottom-sheet-wrapper";
import { sizer } from "../../../helpers";
import { baseOpacity, COLORS } from "../../../globals";
import { Flex, Typography } from "../../../atom-components";
import Icon from "react-native-vector-icons/Entypo";

const StoryOptionBottomSheet = ({
  isVisible,
  myStory,
  setVisible = () => { },
  recordVideo = () => { },
  openGallery = () => { },
  showMyStory = () => { },
}) => {
  return (
    <CustomBottomSheet isVisible={isVisible} setVisible={setVisible}>
      {!!myStory && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={baseOpacity}
          onPress={() => {
            setVisible(false);
            showMyStory();
          }}
        >
          <Flex algItems={"center"}>
            <Icon
              name="eye"
              size={sizer.moderateScale(20)}
              color={COLORS.greyV7}
            />
            <Typography
              text="View Story"
              size={17}
              mL={10}
              color={COLORS.greyV7}
            />
          </Flex>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={baseOpacity}
        onPress={async () => {
          await openGallery();
          setVisible(false);
        }}
      >
        <Flex algItems={"center"}>
          <Icon
            name="images"
            size={sizer.moderateScale(20)}
            color={COLORS.greyV7}
          />
          <Typography
            text="Open Gallery"
            size={17}
            mL={10}
            color={COLORS.greyV7}
          />
        </Flex>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={baseOpacity}
        onPress={async () => {
          await recordVideo();
          setVisible(false);
        }}
      >
        <Flex algItems={"center"}>
          <Icon
            name="video-camera"
            size={sizer.moderateScale(20)}
            color={COLORS.greyV7}
          />
          <Typography
            text="Open Camera"
            size={17}
            mL={10}
            color={COLORS.greyV7}
          />
        </Flex>
      </TouchableOpacity>
    </CustomBottomSheet>
  );
};

export default StoryOptionBottomSheet;

const styles = StyleSheet.create({
  button: {
    paddingTop: sizer.moderateVerticalScale(12),
    paddingBottom: sizer.moderateVerticalScale(14),
    // borderBottomWidth: 1,
    borderColor: COLORS.borderV2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
