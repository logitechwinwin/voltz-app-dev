import { Avatar } from "react-native-paper";

import { Flex } from "../../atom-components";
import { sizer } from "../../helpers";
import DATA from "../../screens/campaign-profile/data";

const ProfilePartnerAvatars = ({ mt = 0 }) => {
  return (
    <Flex>
      {DATA.charityAvatars.map((img, i) => {
        return (
          <Avatar.Image
            key={i}
            style={{
              marginRight: sizer.moderateScale(-8),
              borderWidth: 0,
              backgroundColor: "white",
              marginTop: sizer.moderateVerticalScale(mt),
            }}
            size={sizer.fontScale(42)}
            source={img}
          />
        );
      })}
    </Flex>
  );
};

export default ProfilePartnerAvatars;
