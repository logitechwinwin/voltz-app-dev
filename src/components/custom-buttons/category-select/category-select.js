import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Flex, Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";
import { data } from "./data";

const CategorySelect = ({
  mT = 12,
  mB = 0,
  pH = 0,
  select = 0,
  onSelect = () => {},
}) => {
  return (
    <Flex
      mt={mT}
      mb={mB}
      jusContent="space-evenly"
      flexStyle={{ paddingHorizontal: sizer.moderateScale(pH) }}
    >
      {data.map((item) => {
        const active = item?.label == select;
        return (
          <TouchableOpacity
            key={item?.id}
            activeOpacity={1}
            onPress={() => onSelect(item?.label)}
            style={[
              styles.selectBtn,
              { backgroundColor: active ? COLORS.secondary : COLORS.white },
            ]}
          >
            <Typography
              text={item?.label}
              size={20}
              color={active ? COLORS.white : COLORS.blackV2}
              bold
            />
          </TouchableOpacity>
        );
      })}
    </Flex>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  selectBtn: {
    paddingVertical: sizer.moderateVerticalScale(4),
    paddingHorizontal: sizer.moderateScale(12),
    borderRadius: 50,
  },
});
