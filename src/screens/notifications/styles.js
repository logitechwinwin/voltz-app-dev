import { StyleSheet } from "react-native";
import { COLORS, CONSTANTS } from "../../globals";
import { sizer } from "../../helpers";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.lightblueV1,
    marginHorizontal: -CONSTANTS.containerPaddingX,
    paddingHorizontal: sizer.moderateScale(15),
  },
  divider: {
    backgroundColor: COLORS.grey,
    height: 1.5,
    marginHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
  },
  flatlist: {
    marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
  },
});
