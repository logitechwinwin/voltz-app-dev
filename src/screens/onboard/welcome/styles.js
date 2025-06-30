import { StyleSheet } from "react-native";

import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  banner: {
    flex: 1,
  },
  imageView: {
    position: "absolute",
    top: sizer.moderateVerticalScale(47),
    alignSelf: "center",
  },
  image: {
    width: sizer.moderateScale(307),
    height: sizer.moderateScale(641),
  },
  bannerText: {
    size: 14,
    medium: true,
    textAlign: "center",
    color: COLORS.text,
  },
  typoView: {
    position: "absolute",
    top: sizer.moderateScale(444),
    alignSelf: "center",
  },
});
