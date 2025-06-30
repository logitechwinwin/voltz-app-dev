import { StyleSheet, TouchableOpacity } from "react-native";

import { sizer } from "../../helpers";
import { Typography } from "../../atom-components";
import { COLORS } from "../../globals";

const DonationChip = ({ activeChip, setActiveChip, i, dollars, setAmount }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setActiveChip(i);
        setAmount(dollars);
      }}
      activeOpacity={1}
      style={[
        styles.main,
        { backgroundColor: activeChip === i ? "#B9FBFF" : "#fff" },
        { borderColor: activeChip === i ? COLORS.primary : "#C4C4C4" },
      ]}
    >
      <Typography
        text={dollars}
        size={18}
        semiBold
        color={activeChip === i ? COLORS.primary : COLORS.black}
      />
    </TouchableOpacity>
  );
};

export default DonationChip;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(97),
    height: sizer.moderateScale(53),
    backgroundColor: "pink",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});
