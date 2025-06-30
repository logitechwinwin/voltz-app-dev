import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../../../globals";
import { sizer, fontFamily } from "../../../helpers";
import { ActivityIndicator } from "react-native-paper";
import { Flex } from "../../../atom-components";

export default function OutlineSelect({
  item,
  isSelected,
  onSelect,
  inActiveText = "",
  activeText = "",
  isLoading = false,
  textStyle = {},
  btnStyles = {},
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.button,
        isSelected ? styles.activeBtn : styles.inactiveBtn,
        btnStyles,
      ]}
      onPress={() => onSelect(item?.id, isSelected)}
      disabled={isLoading}
    >
      <Flex algItems={"center"}>
        {isLoading ? (
          <ActivityIndicator
            color={isSelected ? COLORS.white : COLORS.primary}
            size={14}
            style={{ marginRight: 12 }}
          />
        ) : (
          <Text
            style={[
              styles.text,
              { color: isSelected ? COLORS.white : COLORS.secondary },
              textStyle,
            ]}
          >
            {isSelected ? activeText : inActiveText}
          </Text>
        )}
      </Flex>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: sizer.moderateVerticalScale(32),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  activeBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  inactiveBtn: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  text: {
    ...fontFamily.bold(),
    fontSize: sizer.fontScale(14),
  },
});
