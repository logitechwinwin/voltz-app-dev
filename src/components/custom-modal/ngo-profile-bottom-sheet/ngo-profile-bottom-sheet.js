import { StyleSheet, TouchableOpacity } from "react-native";

import { renderSvg } from "../../../utils";
import { ChevronRightIconV1 } from "../../../assets";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";
import { Typography } from "../../../atom-components";
import CustomBottomSheet from "../bottom-sheet-wrapper/bottom-sheet-wrapper";

const NGOProfileBottomSheet = ({
  isVisible,
  setVisible,
  onPress = () => {},
  ngoData,
}) => {
  return (
    <CustomBottomSheet isVisible={isVisible} setVisible={setVisible}>
      <TouchableOpacity
        style={[styles.button, { marginTop: sizer.moderateVerticalScale(12) }]}
        activeOpacity={baseOpacity}
        onPress={() => {
          onPress(ngoData?.id, "unfollow");
          setVisible(false);
        }}
      >
        <Typography text="Unfollow NGO" size={17} color={COLORS.greyV7} />
        {renderSvg(ChevronRightIconV1, 7, 12)}
      </TouchableOpacity>
    </CustomBottomSheet>
  );
};

export default NGOProfileBottomSheet;

const styles = StyleSheet.create({
  button: {
    paddingTop: sizer.moderateVerticalScale(12),
    paddingBottom: sizer.moderateVerticalScale(14),
    borderBottomWidth: 1,
    borderColor: COLORS.borderV2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
