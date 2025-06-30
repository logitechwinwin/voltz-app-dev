import { StyleSheet } from "react-native";
import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";

export const styles = StyleSheet.create({
  main: {
    marginTop: sizer.moderateVerticalScale(1),
    marginBottom: sizer.moderateVerticalScale(24),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: sizer.moderateVerticalScale(2),
    paddingLeft: sizer.moderateVerticalScale(5),
    paddingRight: sizer.moderateVerticalScale(8),
    alignItems: "center",
    gap: sizer.moderateScale(12),
    flexDirection: "row",
    paddingVertical: sizer.moderateVerticalScale(7),
  },
  img: {
    width: sizer.moderateScale(146),
    height: sizer.moderateVerticalScale(99),
    borderRadius: sizer.fontScale(8),
  },
  coverImg: {
    position: "absolute",
    top: sizer.moderateVerticalScale(8),
    left: sizer.moderateScale(6.5),
    width: sizer.moderateScale(33),
    height: sizer.moderateVerticalScale(33),
    borderRadius: 50,
  },
  discountView: {
    position: "absolute",
    bottom: sizer.moderateVerticalScale(8),
    left: sizer.moderateScale(6.5),
    width: sizer.moderateScale(62),
    height: sizer.moderateVerticalScale(24),
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  btnStyle: { height: sizer.moderateVerticalScale(33) },
  title: {
    size: 15,
    // semiBold: true,
    bold: true,
    numberOfLines: 1,
    ellipsizeMode: true,
    mR: 10,
  },
});
