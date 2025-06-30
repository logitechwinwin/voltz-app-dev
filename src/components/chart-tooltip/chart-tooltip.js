import React from "react";
import { View, StyleSheet } from "react-native";
import { sizer } from "../../helpers";
import { Typography } from "../../atom-components";
import { COLORS } from "../../globals";

export default function ChartTooltip({
  closeTooltip,
  barIndex,
  barLength,
  targetAchievementData,
}) {
  // Percentage range from 0% to 75%
  const percentageRange = 84;

  // Calculate step size
  const stepSize = percentageRange / barLength;

  // Generate the percentage array
  const percentageArray = Array.from(
    { length: barLength },
    (v, i) => i * stepSize
  );

  return (
    <View style={styles.toolTipContainer} pointerEvents="box-none">
      <View
        style={[styles.tooltipCard, { left: `${percentageArray[barIndex]}%` }]}
        onStartShouldSetResponder={closeTooltip}
      >
        <Typography text={`Goals: ${targetAchievementData[barIndex]?.goalHours} hrs`} size={9} color={COLORS.white} />
        <Typography
          text={`Completed: ${targetAchievementData[barIndex]?.workingHours} hrs`}
          size={9}
          color={COLORS.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolTipContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    zIndex: 9,
  },
  tooltipCard: {
    alignSelf: "flex-start",
    paddingVertical: sizer.moderateVerticalScale(3),
    paddingHorizontal: sizer.moderateScale(6),
    justifyContent: "center",
    backgroundColor: COLORS.textV2,
    borderRadius: 5,
  },
});
