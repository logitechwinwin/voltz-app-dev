import React from "react";
import { View } from "react-native";

import sizer from "../helpers/sizer";
export default function Flex({
  children = "",
  direction,
  jusContent,
  algItems,
  flexWrap,
  mt,
  mb,
  pb,
  pt,
  pH,
  gap,
  flexStyle = {},
  extraStyles = {},
}) {
  return (
    <View
      style={{
        flexDirection: direction || "row",
        justifyContent: jusContent || "flex-start",
        alignItems: algItems || "flex-start",
        flexWrap: flexWrap || "nowrap",
        gap: gap || 0,
        marginTop: sizer.moderateVerticalScale(mt) || 0,
        marginBottom: sizer.moderateVerticalScale(mb) || 0,
        paddingBottom: sizer.moderateVerticalScale(pb) || 0,
        paddingTop: sizer.moderateVerticalScale(pt) || 0,
        paddingHorizontal: sizer.moderateVerticalScale(pH) || 0,
        ...flexStyle,
        ...extraStyles,
      }}
    >
      {children}
    </View>
  );
}
