import React from "react";
import { View } from "react-native";

import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";

export default function FormCard({ children = "", mT = 17, mB = 28, pH = 23 }) {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: sizer.moderateScale(pH),
        paddingTop: sizer.moderateVerticalScale(mT),
        paddingBottom: sizer.moderateVerticalScale(mB),
        borderRadius: 16,
      }}
    >
      {children}
    </View>
  );
}
