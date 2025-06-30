import { StyleSheet, TouchableOpacity, View } from "react-native";

import { SearchV2, UsersThree } from "../../../assets";
import { Flex, Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";

const EmptyComponent = () => {
  return (
    <View style={styles.main}>
      <UsersThree />
      <Typography text="You aren’t in a community...yet!" semiBold mT={16} />
      <Typography
        color={COLORS.text}
        medium
        textAlign="center"
        text="Communities help you connect, pray, celebrate, and grow closer to God with others."
        semiBold
      />

      <TouchableOpacity activeOpacity={baseOpacity} style={styles.btn}>
        <Flex gap={6} jusContent="center" algItems="center">
          <SearchV2 />
          <Typography text="Find Community" color={COLORS.secondary} semiBold />
        </Flex>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: sizer.moderateScale(358),
    height: sizer.moderateVerticalScale(52),
    backgroundColor: COLORS.lightblue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: sizer.moderateVerticalScale(16),
  },
});
