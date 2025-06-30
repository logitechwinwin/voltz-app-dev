import { StyleSheet } from "react-native";

import { COLORS } from "../../globals";
import { sizer } from "../../helpers";

export const styles = StyleSheet.create({
  chartView: {
    alignItems: "center",
  },
  chartCenterText: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  topHeading: {
    text: "Impact Portfolio",
    size: 18,
    semiBold: true,
    color: COLORS.blackV1,
    mB: 15,
  },
  progressCard: { marginBottom: sizer.moderateVerticalScale(26) },
  progressBar: {
    height: sizer.moderateVerticalScale(2),
    backgroundColor: COLORS.grey,
  },
});
