import React from "react";
import { StyleSheet, View } from "react-native";

import { COLORS } from "../../../globals";
import { sizer } from "../../../helpers";
import { Typography } from "../../../atom-components";

export default function TopicSelect({ item, isSelected, onSelect }) {
  return (
    <View
      style={[
        styles.button,
        { backgroundColor: isSelected ? COLORS.primary : COLORS.lightblue },
      ]}
      onStartShouldSetResponder={() => onSelect(item.id || item)}
    >
      <Typography
        text={item.label || item}
        semiBold
        color={isSelected ? COLORS.white : COLORS.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: sizer.moderateScale(10),
    paddingVertical: sizer.moderateVerticalScale(6),
    borderRadius: 50,
  },
});
