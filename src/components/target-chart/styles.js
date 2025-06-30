import { StyleSheet } from "react-native";
import { fontFamily, sizer } from "../../helpers";
import { COLORS } from "../../globals";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: sizer.moderateVerticalScale(27),
    paddingHorizontal: sizer.moderateScale(22),
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btn: {
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: COLORS.white,
  },
  btnText: {
    ...fontFamily.bold(),
    color: COLORS.blackV2,
  },
  topTitle: {
    textAlign: "center",
    size: 20,
    mB: 24,
    color: COLORS.blackV2,
  },
});
