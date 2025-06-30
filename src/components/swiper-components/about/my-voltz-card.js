import { StyleSheet, View } from "react-native";

import { Flex, Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";
import { limitNumber } from "../../../utils/limit-number";
import { Tooltip } from "react-native-paper";
import { formatNumber } from "../../../utils";

const MyVoltzCard = ({ item }) => {
  return (
    <View style={styles.main}>
      <Typography
        text={item.label}
        size={12}
        bold
        color={COLORS.greyV8}
        mT={6}
      />
      <Tooltip
        title={limitNumber(item.value)}
        enterTouchDelay={0}
        leaveTouchDelay={1000}
        style={{ justifyContent: "flex-start" }}
      >
        <Flex gap={4} algItems="center" mt={6}>
          {item.Icon}
          <Typography text={formatNumber(item.value)} size={18} bold color={COLORS.blackV2} />
        </Flex>
      </Tooltip>
      <Flex gap={2} algItems="center" mt={6} mb={11}>
        {/* <Typography
          text={item.percentageChange}
          size={12}
          bold
          color={
            item.changeDirection == "up" ? COLORS.secondary : COLORS.dangerV2
          }
        />
        {item.changeDirection == "up" ? <IncrementIcon /> : <DecrementIcon />} */}
      </Flex>
    </View>
  );
};

export default MyVoltzCard;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(115),
    backgroundColor: COLORS.white,
    borderRadius: sizer.fontScale(9),
    paddingHorizontal: sizer.moderateScale(9),
    marginTop: sizer.moderateVerticalScale(16),
  },
});
