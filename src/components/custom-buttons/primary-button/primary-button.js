import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Flex } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { styles } from "./styles";
import { COLORS, baseOpacity } from "../../../globals";

function PrimaryButton({
  label = "Custom Button",
  btnStyle = {},
  textStyle = {},
  onPress = () => {},
  upperCase = false,
  loader = false,
  height,
  icon = false,
  iconRight = false,
  type = "primary",
  mb = 0,
  mt = 0,
  iconGap = 8,
  ...props
}) {
  let bgColor;
  let textColor = COLORS.white;
  let loaderColor = COLORS.white;

  if (type === "primary") {
    bgColor = COLORS.primary;
  } else if (type === "secondary") {
    bgColor = COLORS.black;
  } else if (type === "danger") {
    bgColor = COLORS.danger;
  } else {
    bgColor = COLORS.white;
    textColor = COLORS.black;
    loaderColor = COLORS.white;
  }

  const obj = {
    btn: {
      backgroundColor: bgColor,
      marginBottom: sizer.moderateVerticalScale(mb),
      marginTop: sizer.moderateVerticalScale(mt),
    },
    text: {
      textTransform: upperCase ? "uppercase" : "none",
      color: textColor,
    },
  };

  return (
    <TouchableOpacity
      disabled={loader}
      activeOpacity={baseOpacity}
      style={[
        styles.btn,
        obj.btn,
        btnStyle,
        height
          ? { height: sizer.moderateVerticalScale(height) }
          : { height: sizer.moderateVerticalScale(52) },
      ]}
      onPress={onPress}
      {...props}
    >
      {loader ? (
        <ActivityIndicator size={sizer.fontScale(19)} color={loaderColor} />
      ) : (
        <Flex gap={iconGap} algItems="center">
          {!!icon && icon}
          <Text style={[styles.btnText, obj.text, textStyle]}>{label}</Text>
          {!!iconRight && iconRight}
        </Flex>
      )}
    </TouchableOpacity>
  );
}

export default PrimaryButton;
