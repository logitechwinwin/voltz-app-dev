import { StyleSheet } from "react-native";

import { COLORS, CONSTANTS } from "../../globals";
import { sizer } from "../../helpers";

export const styles = StyleSheet.create({
  headerView: {
    backgroundColor: COLORS.white,
    paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
  },
});
