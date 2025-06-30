import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

import { DownArrowDropdown } from "../../assets";
import { sizer } from "../../helpers";
import { COLORS } from "../../globals";

const MultiSelectComponent = ({
  Data = [],
  LeftIcon,
  handleGetSelectedSDGs,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected) {
      handleGetSelectedSDGs(selected);
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Data}
        labelField="label"
        valueField="id"
        placeholder="Select SDGs"
        searchPlaceholder="Search..."
        value={selected}
        onChange={(item) => {
          setSelected(item);
        }}
        renderRightIcon={() => <DownArrowDropdown />}
        renderLeftIcon={() => (
          <View style={styles.leftIconContainer}>{LeftIcon}</View>
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 0 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    color: COLORS.greyV7,
    fontSize: sizer.fontScale(14),
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  leftIconContainer: {
    marginRight: sizer.moderateScale(12),
  },
});
