import { StyleSheet, TouchableOpacity } from "react-native";

import { Flex, Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";
import { ActivityIndicator } from "react-native-paper";

const OutlineButton = ({
  label = "",
  onPress = () => { },
  style,
  mt = 14,
  labelSize = 14,
  icon = false,
  iconGap = 6,
  smallBtn = false,
  isLoading = false,
  disabled = false,
  active = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={baseOpacity}
      style={[
        styles.btnView,
        style,
        {
          marginTop: sizer.moderateVerticalScale(mt),
          borderColor: disabled
            ? COLORS.grey
            : active
              ? COLORS.primary
              : COLORS.secondary,
          backgroundColor: active ? COLORS.primary : "transparent",
        },
        smallBtn && {
          height: sizer.moderateVerticalScale(29),
          borderWidth: sizer.moderateScale(1),
        },
      ]}
      onPress={onPress}
    >
      <Flex gap={iconGap} algItems="center">
        {!!icon && icon}
        {isLoading ? (
          <ActivityIndicator
            size={16}
            color={active ? COLORS.white : COLORS.primary}
          />
        ) : (
          <Typography
            text={label}
            color={
              disabled ? COLORS.grey : active ? COLORS.white : COLORS.secondary
            }
            semiBold
            size={labelSize}
          />
        )}
      </Flex>
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: sizer.moderateVerticalScale(42),
    borderWidth: sizer.moderateScale(2),
    borderRadius: sizer.moderateScale(50),
  },
});
