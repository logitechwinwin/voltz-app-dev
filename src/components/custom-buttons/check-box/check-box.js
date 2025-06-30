import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { COLORS } from "../../../globals";
import { sizer } from "../../../helpers";

const CheckBox = ({ isCheck, setCheck, size = sizer.fontScale(18) }) => {
  const onCheck = () => {
    setCheck(!isCheck);
  };
  return (
    <TouchableOpacity
      onPress={onCheck}
      style={[
        styles.checkbox,
        isCheck ? styles.activeBox : styles.inactiveBox,
        { width: size, height: size },
      ]}
    >
      {isCheck && <Icon name="check" size={size * 0.9} color={COLORS.white} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  activeBox: {
    backgroundColor: COLORS.primary,
  },
  inactiveBox: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});

export default CheckBox;
