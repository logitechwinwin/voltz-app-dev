import { Avatar } from "react-native-paper";

import { Flex } from "../../atom-components";
import { sizer } from "../../helpers";

const GroupedAvatar = ({ size = 14 }) => {
  const DATA = [
    require("../../assets/images/profile-avatar.png"),
    require("../../assets/images/profile-avatar2.png"),
    require("../../assets/images/profile-avatar3.png"),
  ];

  return (
    <Flex flexStyle={{ marginRight: sizer.moderateScale(4) }} algItems="Center">
      {DATA.map((img, i) => {
        return (
          <Avatar.Image
            key={i}
            style={{
              marginRight: -5,
              borderWidth: 0,
              backgroundColor: "white",
            }}
            size={sizer.fontScale(size)}
            source={img}
          />
        );
      })}
    </Flex>
  );
};

export default GroupedAvatar;
