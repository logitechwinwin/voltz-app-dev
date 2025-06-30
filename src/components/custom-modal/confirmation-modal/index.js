import { StyleSheet, TouchableOpacity } from "react-native";

import { Flex, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { sizer } from "../../../helpers";

const Confirmation = ({
  isVisible,
  setVisible,
  onPress,
  leftLabel,
  leave,
  action,
}) => {
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible} mH={35}>
      <Typography textAlign="center" mT={43} medium>
        Confirmation
      </Typography>
      <Typography
        textAlign="center"
        mT={12}
        size={14}
        LineHeight={24}
        color={COLORS.greyV6}
      >
        Are you sure you want to {action} {leave ? `this ${leave}` : ""}
      </Typography>

      <Flex flexStyle={styles.flexStyles}>
        <TouchableOpacity
          onPress={() => {
            onPress();
            setVisible(false);
          }}
          activeOpacity={0.6}
          style={[styles.btnStyles, { borderRightWidth: 0.5 }]}
        >
          <Typography size={14} medium color={COLORS.secondary}>
            {leftLabel}
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          activeOpacity={0.6}
          style={[styles.btnStyles, { borderLeftWidth: 0.5 }]}
        >
          <Typography size={14} medium color={COLORS.black} letterSpacing={0.1}>
            Cancel
          </Typography>
        </TouchableOpacity>
      </Flex>
    </ModalWrapper>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  btnStyles: {
    flex: 0.5,
    height: "100%",
    borderTopWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  flexStyles: {
    height: sizer.moderateVerticalScale(59),
    marginHorizontal: sizer.moderateScale(-17),
    marginTop: sizer.moderateScale(30),
    overflow: "hidden",
  },
});
