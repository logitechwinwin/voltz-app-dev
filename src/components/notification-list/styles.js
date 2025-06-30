import { StyleSheet } from "react-native";
import { sizer } from "../../helpers";
import { CONSTANTS } from "../../globals";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
    paddingVertical: sizer.moderateVerticalScale(12),
  },
  main: {
    flexDirection: "row",
    gap: sizer.moderateScale(CONSTANTS.containerPaddingX - 3),
    alignItems: "center",
  },
  readDot: {
    width: sizer.fontScale(5),
    height: sizer.fontScale(5),
    top: 0,
    right: 0,
    borderRadius: 50,
    position: "absolute",
  },
});
