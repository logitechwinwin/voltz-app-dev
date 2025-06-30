import { Avatar } from "react-native-paper";

import { Flex } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { COLORS, placeholder_profile_img } from "../../../globals";

const CharityGroupedAvatar = ({ data }) => {
  return (
    <Flex>
      {(data?.donations || []).map((item, i) => {
        return (
          <Avatar.Image
            key={i}
            style={{
              marginRight: -3,
              borderWidth: 0,
              backgroundColor: COLORS.primary,
            }}
            size={sizer.fontScale(16)}
            source={{ uri: item?.user?.profileImage || placeholder_profile_img }}
          />
        );
      })}
    </Flex>
  );
};

export default CharityGroupedAvatar;
