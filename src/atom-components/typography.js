import React, { useState } from "react";
import { Text } from "react-native";

import { COLORS } from "../globals";
import { sizer, fontFamily } from "../helpers";

export default function Typography({
  color = COLORS.black,
  size = 16,
  pT = 0,
  pB = 0,
  pR = 0,
  pL = 0,
  mT = 0,
  mB = 0,
  mL = 0,
  mR = 0,
  extraLight = false,
  endIcon = false,
  light = false,
  medium = false,
  semiBold = false,
  bold = false,
  extraBold = false,
  upperCase = false,
  capitalize = false,
  textAlign = "left",
  text,
  numberOfLines,
  ellipsizeMode = false,
  LineHeight,
  children,
  style,
  ...props
}) {
  const styleObj = {
    color: color,
    fontSize: sizer.fontScale(size),
    paddingTop: sizer.moderateVerticalScale(pT),
    paddingBottom: sizer.moderateVerticalScale(pB),
    paddingLeft: sizer.moderateScale(pL),
    paddingRight: sizer.moderateScale(pR),
    marginTop: sizer.moderateVerticalScale(mT),
    marginBottom: sizer.moderateVerticalScale(mB),
    marginLeft: sizer.moderateScale(mL),
    marginRight: sizer.moderateScale(mR),
    ...(extraLight
      ? { ...fontFamily.extraLight() }
      : light
        ? { ...fontFamily.light() }
        : medium
          ? { ...fontFamily.medium() }
          : semiBold
            ? { ...fontFamily.semiBold() }
            : bold
              ? { ...fontFamily.bold() }
              : extraBold
                ? { ...fontFamily.extraBold() }
                : { ...fontFamily.regular() }),
    ...(upperCase && { textTransform: "uppercase" }),
    ...(capitalize && { textTransform: "capitalize" }),
    textAlign: textAlign,
    ...(LineHeight && { lineHeight: LineHeight }),
    ...style,
    ...props,
  };
  const [lines, setLines] = useState(0)
  const handleLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    const lineHeight = styleObj.fontSize || 14; // assuming 14 if not specified
    const lines = Math.floor(height / lineHeight);
    setLines(lines)

  }

  return (
    <>
      <Text
        style={styleObj}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode ? "tail" : undefined}
        onLayout={handleLayout}
      >
        {children}
        {text && text}
      </Text>
      {endIcon && lines > 20 && endIcon}
    </>

  );
}
