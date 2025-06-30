import { StyleSheet, TouchableOpacity } from "react-native";

import { renderSvg } from "../../../utils";
import { ChevronRightIconV1 } from "../../../assets";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";
import { Typography } from "../../../atom-components";
import CustomBottomSheet from "../bottom-sheet-wrapper/bottom-sheet-wrapper";

const CampaignProfileBottomSheet = ({
  isVisible,
  setVisible,
  navigateLogMyHour = () => { },
  leaveEvent = () => { },
  campaignStatus = null
}) => {
  const isUpcoming = campaignStatus?.status === "Upcoming"
  return (
    <CustomBottomSheet isVisible={isVisible} setVisible={setVisible}>
      {/* <TouchableOpacity
        style={styles.button}
        disabled={isUpcoming}
        activeOpacity={baseOpacity}
        onPress={() => {
          setVisible(false);
          navigateLogMyHour();
        }}
      >
        <Typography text="Log My Hours" size={17} color={!isUpcoming ?COLORS.greyV7: COLORS.greyV11} />
        {renderSvg(ChevronRightIconV1, 7, 12)}
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[styles.button, { marginTop: sizer.moderateVerticalScale(12) }]}
        activeOpacity={baseOpacity}
        onPress={() => {
          leaveEvent();
          setVisible(false);
        }}
      >
        <Typography text="Leave Event" size={17} color={COLORS.greyV7} />
        {renderSvg(ChevronRightIconV1, 7, 12)}
      </TouchableOpacity>
    </CustomBottomSheet >
  );
};

export default CampaignProfileBottomSheet;

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
