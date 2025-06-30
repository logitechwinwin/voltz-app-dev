import { StyleSheet } from "react-native";

import { Flex, Typography } from "../../atom-components";
import { DonationIcon } from "../../assets";
import { COLORS, placeholder_profile_img } from "../../globals";
import { Avatar } from "react-native-paper";
import { sizer } from "../../helpers";
import { donators } from "./data";
import { formatNumber } from "../../utils";
import format from "pretty-format";

const DonationAvatarGroup = ({ small = true, data }) => {
  const donationsCount = data?.donationsCount || 0;
  const firstName = data?.donations[0]?.user?.firstName || "";
  const donationText = donationsCount == 0
  ? '0 Donation'
  : donationsCount > 1
  ? `${firstName} and ${donationsCount - 1} others donated`
  : `${firstName} donated only`
  return (
    <Flex algItems="center" mt={small ? 10 : 17} jusContent="space-between">
      <Flex algItems="center" gap={3} flexStyle={{ width: "55%" }}>
        {(data?.donations || []).slice(0, 3).map((obj, i) => {
          return (
            <Avatar.Image
              key={i}
              style={styles.avatarImg}
              size={sizer.fontScale(small ? 11 : 14)}
              source={{
                uri: obj?.user?.profileImage || placeholder_profile_img,
              }}
            />
          );
        })}
        <Typography
          text={donationText}
          color={COLORS.greyV7}
          mL={4}
          size={small ? 9 : 11}
          numberOfLines={1}
        />
      </Flex>
      <Flex gap={2}>
        <DonationIcon />
        <Typography
          text={`${formatNumber(data?.donationReceived)} Donated`}
          color={COLORS.greyV7}
          size={small ? 9 : 11}
        />
      </Flex>
    </Flex>
  );
};

export default DonationAvatarGroup;

const styles = StyleSheet.create({
  avatarImg: {
    marginRight: sizer.moderateScale(-5),
    borderWidth: 0,
    backgroundColor: "white",
  },
});
