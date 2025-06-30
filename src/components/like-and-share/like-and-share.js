import { TouchableOpacity } from "react-native";

import { LikesIcon, ShareIconV2 } from "../../assets";
import { Flex } from "../../atom-components";
import { COLORS, baseOpacity } from "../../globals";

const LikeAndShare = ({
  saved,
  savePress = () => {},
  sharePress = () => {},
}) => {
  return (
    <Flex>
      <TouchableOpacity activeOpacity={baseOpacity} onPress={sharePress}>
        <ShareIconV2 />
      </TouchableOpacity>
    </Flex>
  );
};

export default LikeAndShare;
