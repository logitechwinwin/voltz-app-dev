import { StyleSheet } from "react-native";
import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: sizer.moderateScale(16),
    paddingVertical: sizer.moderateVerticalScale(16),
    flexDirection: "row",
    borderRadius: 16,
    justifyContent: "space-between",
    gap: sizer.moderateScale(25),
    marginBottom: sizer.moderateVerticalScale(16),
  },
  body: { width: "50%", flexShrink: 1, justifyContent: "space-between" },
  title: {
    semiBold: true,
    color: COLORS.textV2,
    numberOfLines: 1,
  },
  subTitle: {
    size: 12,
    medium: true,
    color: COLORS.textV2,
    numberOfLines: 3,
    marginBottom: 5,
  },
  cardImg: {
    width: sizer.moderateScale(120),
    height: sizer.moderateVerticalScale(88),
    borderRadius: 8,
  },
});
