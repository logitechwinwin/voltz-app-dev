import { StyleSheet } from "react-native";
import { sizer } from "../../../helpers";

export const styles = StyleSheet.create({
  stepView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: sizer.moderateVerticalScale(30),
  },
  nextBtn: {
    width: sizer.moderateScale(90),
    right: sizer.moderateScale(20),
    alignSelf: "flex-end",
  },
  steps: { position: "absolute" },
});
