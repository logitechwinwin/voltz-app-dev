import React from "react";
import { View } from "react-native";

import sizer from "../helpers/sizer";
import { COLORS, CONSTANTS } from "../globals";

export default function Container({
  children,
  style = {},
  pT = 0,
  pB = 0,
  pH = CONSTANTS.containerPaddingX,
  flex = 1,
  bgColor = "",
  light = false,
}) {
  return (
    <View
      style={[
        {
          flex: flex,
          backgroundColor: bgColor
            ? bgColor
            : light
            ? COLORS.whiteV1
            : COLORS.white,
          paddingHorizontal: sizer.moderateScale(pH),
          paddingTop: sizer.moderateVerticalScale(pT),
          paddingBottom: sizer.moderateVerticalScale(pB),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
