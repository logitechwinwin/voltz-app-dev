import { StyleSheet } from "react-native";
import { fontFamily, sizer } from "../../../helpers";

export const styles = StyleSheet.create({
  btn: {
    // height: sizer.moderateVerticalScale(52),
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    ...fontFamily.semiBold(),
    fontSize: sizer.fontScale(14),
    textAlign: "center",
  },
});
