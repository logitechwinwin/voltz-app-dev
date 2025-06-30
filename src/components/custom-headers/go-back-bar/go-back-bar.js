import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { sizer } from "../../../helpers";
import { ChevronBackIcon } from "../../../assets";
import { COLORS, CONSTANTS, baseOpacity } from "../../../globals";
import { Typography } from "../../../atom-components";

export default function GoBackBar({ hide = false, handleBack = false }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (handleBack) {
      handleBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {!hide && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={baseOpacity}
          hitSlop={styles.hitSlop}
          onPress={handlePress}
        >
          <ChevronBackIcon />
          <Typography size={17} color={COLORS.primary} text="Back" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: sizer.moderateVerticalScale(42),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
  },
  button: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 15,
    right: 30,
  },
});
