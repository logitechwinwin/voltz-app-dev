import { StyleSheet } from "react-native";

import { sizer } from "../../helpers";
import { COLORS } from "../../globals";

const common = {
  position: "absolute",
  alignSelf: "center",
};

export const styles = StyleSheet.create({
  bannerView: {
    ...common,
    top: sizer.moderateVerticalScale(47),
  },
  main: {
    flex: 1,
    paddingTop: sizer.moderateVerticalScale(461),
  },
  backgroundImg: {
    width: sizer.moderateScale(306),
    height: sizer.moderateVerticalScale(641),
  },
  cardCom: {
    ...common,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // shadowOpacity: 0.58,
    // elevation: 24
    elevation: 30,
  },
  cardView1: {
    top: sizer.moderateVerticalScale(158),
    borderRadius: 16,
    overflow: "hidden",
  },
  cardView2: {
    top: sizer.moderateVerticalScale(42),
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  cardView3: {
    top: sizer.moderateVerticalScale(297),
    borderRadius: 16,
    backgroundColor: "white",
    padding: sizer.moderateScale(16),
  },
  onboardAvatar: {
    ...common,
    top: sizer.moderateVerticalScale(150),
  },
  userName: {
    size: 14,
    bold: true,
    color: COLORS.text,
    textAlign: "center",
  },
  voltzCard: {
    ...common,
    top: sizer.moderateVerticalScale(308),
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: sizer.moderateScale(64.5),
    paddingVertical: sizer.moderateVerticalScale(11.5),
    shadowColor: "#00000033",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 6.27,
    // shadowOpacity: 0.34,
    elevation: 10,
  },
  voltzText: {
    size: 12,
    semiBold: true,
    color: COLORS.primary,
    textAlign: "center",
  },
  cardImg1: {
    width: sizer.moderateScale(327),
    height: sizer.moderateScale(109),
  },
});
