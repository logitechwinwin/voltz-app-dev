import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { sizer } from "../../../helpers";
import { Flex, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import { CampaignNoIcon } from "../../../assets";
import moment from "moment";

const RenderItem = ({ item }) => {
  return (
    <Flex flexStyle={styles.main} algItems="center" jusContent="space-between">
      <View>
        <Typography
          text={moment(item?.createdAt).format("dddd, MMMM D, YYYY")}
          size={12}
          bold
          color={COLORS.greyV9}
        />
        <Flex>
          <Typography text={`Type: `} size={12} mT={2} />
          <Typography
            text={`${item?.type} `}
            bold
            size={12}
            color={COLORS.textV3}
            mT={2}
          />
        </Flex>
        <Flex>
          <Typography text={`Status: `} size={12} mT={2} />
          <Typography
            text={`${item?.status} `}
            bold
            size={12}
            color={COLORS.textV3}
            mT={2}
          />
        </Flex>
      </View>

      <Flex algItems="center" gap={2}>
        <Typography
          text={"+" + item?.amount}
          size={20}
          bold
          color={COLORS.primary}
        />
        <CampaignNoIcon />
      </Flex>
    </Flex>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  main: {
    // height: sizer.moderateVerticalScale(40),
    marginBottom: sizer.moderateVerticalScale(24),
  },
});
