import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";
import { CustomBottomSheet } from "../..";
import { ChevronRightIconV1 } from "../../../assets";
import { renderSvg } from "../../../utils";

export default function ProfileBottomSheet({
  isVisible,
  setVisible,
  handlePress = () => {},
}) {
  return (
    <CustomBottomSheet isVisible={isVisible} setVisible={setVisible} pH={22}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={baseOpacity}
        onPress={handlePress}
      >
        <Typography text="View Profile" size={17} color={COLORS.greyV7} />
        {renderSvg(ChevronRightIconV1, 7, 12)}
      </TouchableOpacity>
    </CustomBottomSheet>
  );
}

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
