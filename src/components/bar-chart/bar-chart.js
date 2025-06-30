import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { sizer } from "../../helpers";
import { COLORS } from "../../globals";
import { Typography } from "../../atom-components";
import { ChartTooltip } from "../";
import format from "pretty-format";

const CustomBarChart = ({ targetAchievement }) => {
  const [tooltipIndex, setTooltipIndex] = useState(null);

  const closeTooltip = () => {
    setTooltipIndex(null);
  };

  const currentMonth = new Date().toLocaleString("default", { month: "short" });

  return (
    <View style={styles.chart}>
      {/* Bar Chart Black Tooltip */}
      {Number(tooltipIndex) === tooltipIndex && (
        <ChartTooltip
          closeTooltip={closeTooltip}
          barIndex={tooltipIndex}
          barLength={targetAchievement?.length}
          targetAchievementData={targetAchievement}
        />
      )}
      {targetAchievement?.map((item, index) => (
        <View
          key={index}
          style={styles.barContainer}
          onStartShouldSetResponder={() => setTooltipIndex(index)}
        >
          <View style={styles.bar}>
            <View style={[styles.barLimit, { height: `${100}%` }]}>
              <View
                style={[
                  styles.barHighlighted,
                  {
                    height: `${(item?.workingHours * 100) / item?.goalHours}%`,
                  },
                ]}
              />
            </View>
          </View>
          <Typography
            text={item?.month}
            size={8}
            color={item?.month == currentMonth ? COLORS.secondary : "#969696"}
            mT={9}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    paddingVertical: sizer.moderateVerticalScale(18),
    backgroundColor: COLORS.white,
    flexDirection: "row",
    borderRadius: 24,
    justifyContent: "space-evenly",
  },
  barContainer: {
    alignItems: "center",
  },
  bar: {
    height: sizer.moderateVerticalScale(100),
    width: sizer.moderateScale(10),
    borderRadius: 100,
    justifyContent: "flex-end",
  },
  barLimit: {
    overflow: "hidden",
    borderRadius: 100,
    backgroundColor: "#E8E5E5",
    justifyContent: "flex-end",
  },
  barHighlighted: {
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
  },
});

export default CustomBarChart;
