import React from "react";
import { View } from "react-native";

import { sizer } from "../../helpers";
import { COLORS } from "../../globals";
import { Flex } from "../../atom-components";

const Steps = ({ active, points }) => (
  <Flex gap={sizer.moderateScale(6)} jusContent="center" algItems="center">
    {Array.from({ length: points }).map((_, index) => (
      <View
        key={index}
        style={{
          width: sizer.moderateScale(7) * (active == index ? 1 : 0.9),
          height: sizer.moderateScale(7) * (active == index ? 1 : 0.9),
          borderRadius: 10,
          backgroundColor: active == index ? COLORS.secondary : COLORS.grey,
        }}
      />
    ))}
  </Flex>
);

export default Steps;
