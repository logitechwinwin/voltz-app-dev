import React from "react";
import { StyleSheet, View } from "react-native";
import { sizer } from "../helpers";
import { EmptyCampaign } from "../assets";
import Typography from "./typography";

const EmptyState = ({ message, width = 200, height = 200, style }) => {
  return (
    <View style={[styles.container, style]}>
      <EmptyCampaign
        width={sizer.moderateScale(width)}
        height={sizer.moderateVerticalScale(height)}
      />
      <Typography textAlign="center" mT={6} bold>
        {message || "No Data Found"}
      </Typography>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    marginVertical: sizer.moderateVerticalScale(20),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
