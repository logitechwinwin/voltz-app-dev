import { Flex, Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { ShootingStar } from "../../../assets";
import { TouchableOpacity } from "react-native";

const ViewAll = ({
  label = "",
  color = "#27272E",
  leftIcon = false,
  fontBold = false,
  onPress = () => { },
  mt = 16,
  mb = 0,
  showViewAll = true,
}) => {
  return (
    <Flex flexStyle={{ justifyContent: "space-between" }} mt={mt} mb={mb}>
      <Flex gap={5}>
        {leftIcon && <ShootingStar />}
        <Typography
          text={label}
          size={leftIcon ? 14 : 16}
          color={color}
          mB={10}
          {...(fontBold ? { bold: true } : { medium: true })}
        />
      </Flex>
      {showViewAll && (
        <TouchableOpacity
          activeOpacity={baseOpacity}
          onPress={onPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Typography text="View all" size={14} color={COLORS.secondary} bold />
        </TouchableOpacity>
      )}
    </Flex>
  );
};

export default ViewAll;
