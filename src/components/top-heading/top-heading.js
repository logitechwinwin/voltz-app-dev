import React from "react";
import { View } from "react-native";

import { Typography } from "../../atom-components";
import { COLORS } from "../../globals";
import { sizer } from "../../helpers";

export default function TopHeading({
  title = "",
  subTitle = "",
  mT = 31,
  mB = 0,
}) {
  return (
    <View
      style={{
        marginTop: sizer.moderateVerticalScale(mT),
        marginBottom: sizer.moderateVerticalScale(mB),
      }}
    >
      <Typography size={24} bold color={COLORS.blackV1}>
        {title}
      </Typography>
      {subTitle && (
        <Typography size={14} medium mT={4} color={COLORS.text}>
          {subTitle}
        </Typography>
      )}
    </View>
  );
}
