import { StyleSheet } from "react-native";

import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";

export const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    gap: sizer.moderateScale(8),
    marginBottom: sizer.moderateVerticalScale(16),
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  coverImg: { height: sizer.moderateVerticalScale(63) },
  profileImg: {
    backgroundColor: COLORS.secondary,
    width: sizer.moderateScale(44),
    height: sizer.moderateScale(44),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.white,
    position: "absolute",
    top: sizer.moderateVerticalScale(40),
    alignSelf: "center",
    borderColor: COLORS.primary
  },
  bodyView: {
    marginHorizontal: sizer.moderateScale(16),
    marginBottom: sizer.moderateVerticalScale(16),
  },
  cardTitle: {
    size: 12,
    semiBold: true,
    textAlign: "center",
    color: COLORS.blackV1,
    mT: 32,
    mB: 12,
  },
});
