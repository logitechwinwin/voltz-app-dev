import { StyleSheet } from "react-native";
import { sizer } from "../../helpers";
import { COLORS } from "../../globals";

export const styles = StyleSheet.create({
  tabsScrollView: { marginTop: sizer.moderateVerticalScale(20) },
  animatedView: {
    height: sizer.moderateVerticalScale(2),
    backgroundColor: COLORS.secondary,
  },
  tabContainer: {
    marginTop: 2,
    paddingHorizontal: sizer.moderateScale(14),
  },
  tabBar: {
    flexDirection: "row",
  },
  tab: {
    paddingTop: sizer.moderateVerticalScale(2),
  },
  tabLabel: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
