import React from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { COLORS } from "../../globals";
import { fontFamily, sizer } from "../../helpers";
import { DownArrowDropdown } from "../../assets";

const CustomDropdown = ({
  mT = 0,
  style,
  Data = [],
  height = 46,
  placeholder = "Select",
  value = "",
  selectedValue = () => {},
  outerContStyle,
  LeftIcon,
  labelField = 'label',
  valueField = 'id',
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: sizer.moderateVerticalScale(mT),
        },
        outerContStyle,
      ]}
    >
      <Dropdown
        style={[
          styles.dropdown,
          { height: sizer.moderateVerticalScale(height) },
        ]}
        selectedTextStyle={{
          color: COLORS.text,
          ...fontFamily.regular(),
          fontSize: sizer.fontScale(14),
        }}
        itemTextStyle={{
          color: COLORS.black,
          ...fontFamily.regular(),
          fontSize: sizer.fontScale(12),
        }}
        itemContainerStyle={{ color: COLORS.black }}
        data={Data}
        placeholderStyle={{
          color: COLORS.greyV7,
          fontSize: sizer.fontScale(14),
        }}
        placeholder={placeholder}
        labelField={labelField}
        valueField={valueField}
        renderRightIcon={() => <DownArrowDropdown />}
        renderLeftIcon={() => (
          <View style={styles.leftIconContainer}>
            {LeftIcon}
          </View>
        )}
        value={value}
        showsVerticalScrollIndicator={false}
        onChange={(item) => {
          selectedValue(item);
        }}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    flex: 1,
    borderBottomColor: COLORS.greyV11,
    borderBottomWidth: 1,
    borderRadius: 0,
    ...fontFamily.regular(),
  },
  leftIconContainer: {
    marginRight: sizer.moderateScale(12),
  },
});
