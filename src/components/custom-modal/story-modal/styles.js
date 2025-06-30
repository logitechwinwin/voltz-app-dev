import { StyleSheet } from "react-native";
import { COLORS, CONSTANTS } from "../../../globals";
import { sizer } from "../../../helpers";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  header: {
    paddingHorizontal: CONSTANTS.containerPaddingX,
    position: "absolute",
    width: "100%",
    paddingTop: sizer.moderateVerticalScale(20),
  },
  progressView: {
    flexDirection: "row",
    gap: sizer.moderateScale(5),
    zIndex: 100,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizer.moderateScale(11),
  },
  profileText: {
    alignItems: "center",
    flexDirection: "row",
    gap: sizer.moderateScale(9),
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
  },
  halfScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    backgroundColor: "transparent",
    zIndex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 70,
  },
  loaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1, // Ensure the loader is on top of the video
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around", // Distribute space evenly
    alignItems: "center",
    paddingVertical: 10, // Add some padding for better spacing
    position: "absolute",
    bottom: 10, // Position it at the bottom of the modal
    width: "100%",
  },
  bottomIcon: {
    alignItems: "center",
  },
  touchableArea: {
    width: '50%',
    height: '100%',
    position: 'absolute',
  },
});
