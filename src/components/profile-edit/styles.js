import { StyleSheet } from "react-native";

import { sizer } from "../../helpers";
import { CONSTANTS } from "../../globals";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: sizer.moderateVerticalScale(158),
    marginHorizontal: sizer.moderateVerticalScale(-CONSTANTS.containerPaddingX),
  },

  container2: {
    width: sizer.moderateScale(100),
    height: sizer.moderateVerticalScale(100),
    marginHorizontal: sizer.moderateVerticalScale(-CONSTANTS.containerPaddingX),
    borderRadius: 100,
    position: "absolute",
    top: sizer.moderateVerticalScale(74),
    left: sizer.moderateScale(14),
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    alignItems: "center",
    borderWidth: sizer.moderateScale(3),
    borderColor: "white",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { styles };
