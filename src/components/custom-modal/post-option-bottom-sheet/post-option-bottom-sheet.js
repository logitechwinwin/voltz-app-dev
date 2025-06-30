import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomBottomSheet from "../bottom-sheet-wrapper/bottom-sheet-wrapper";
import { sizer } from "../../../helpers";
import { baseOpacity, COLORS } from "../../../globals";
import { Typography } from "../../../atom-components";

const PostOptionBottomSheet = ({
  isVisible,
  setVisible = () => { },
  handlePostDeleteAndUpdate = () => { },
  setPostModal = () => { },
  communityData = {},
  userId,
  postData = {},
  showUpdate = true
}) => {
  const updateOption = () => {
    if (
      communityData?.createdBy?.id == userId &&
      postData?.author?.id == userId
    ) {
      return true;
    }
    if (communityData?.createdBy?.id != userId) {
      return true;
    }
    return false;
  };

  return (
    <CustomBottomSheet isVisible={isVisible} setVisible={setVisible}>
      {communityData?.createdBy?.id == userId && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={baseOpacity}
          onPress={() => {
            setVisible(false);
            handlePostDeleteAndUpdate("patch", postData?.pinned, true);
          }}
        >
          <Typography text={postData?.pinned ? "Unpin" : "Pin"} size={17} color={COLORS.greyV7} />
        </TouchableOpacity>
      )}
      {updateOption() && showUpdate && (
        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: sizer.moderateVerticalScale(
                communityData?.createdBy?.id == userId ? 12 : -5
              ),
            },
          ]}
          activeOpacity={baseOpacity}
          onPress={() => {
            setVisible(false);
            setTimeout(() => {
              setPostModal(true);
            }, 600)
          }}
        >
          <Typography text="Update" size={17} color={COLORS.greyV7} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.button, { marginTop: sizer.moderateVerticalScale(12) }]}
        activeOpacity={baseOpacity}
        onPress={() => {
          setVisible(false);
          handlePostDeleteAndUpdate("delete");
        }}
      >
        <Typography text="Delete" size={17} color={COLORS.greyV7} />
      </TouchableOpacity>
    </CustomBottomSheet>
  );
};

export default PostOptionBottomSheet;

const styles = StyleSheet.create({
  button: {
    paddingTop: sizer.moderateVerticalScale(12),
    paddingBottom: sizer.moderateVerticalScale(14),
    borderBottomWidth: 1,
    borderColor: COLORS.borderV2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
