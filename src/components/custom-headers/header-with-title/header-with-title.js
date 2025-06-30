import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Flex, Typography } from "../../../atom-components";
import { ChevronBackIcon } from "../../../assets";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";

const HeaderWithTitle = ({ label }) => {
  const navigation = useNavigation();
  return (
    <Flex jusContent="space-between" flexStyle={styles.main}>
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={styles.hitSlop}
      >
        <ChevronBackIcon />
      </TouchableOpacity>
      <Typography text={label} color={COLORS.blackV1} semiBold />
      <View />
    </Flex>
  );
};

export default HeaderWithTitle;

const styles = StyleSheet.create({
  main: {
    height: sizer.moderateVerticalScale(40),
    alignItems: "center",
  },
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
});
