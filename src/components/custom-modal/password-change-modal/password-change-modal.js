import React from "react";
import { StyleSheet, View } from "react-native";

import { ModalWrapper, OutlineButton } from "../../";
import { Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { PassChangedIcon } from "../../../assets";
import { renderSvg } from "../../../utils";

export default function PasswordChangeModal({ isVisible, setVisible }) {
  const handleClose = () => {
    setVisible(!isVisible);
  };

  return (
    <ModalWrapper
      isVisible={isVisible}
      setVisible={setVisible}
      modalBoxStyle={styles.modalBox}
      pT={20}
      pB={20}
      pH={26}
    >
      <Typography
        text={`Password changed
successfully`}
        textAlign="center"
        medium
        mB={20}
      />
      {renderSvg(PassChangedIcon, 86, 82)}
      <OutlineButton
        label="Ok"
        mt={24}
        style={styles.btn}
        onPress={handleClose}
      />
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: sizer.moderateVerticalScale(40),
    flex: 0,
    width: "100%",
  },
  modalBox: {
    width: sizer.moderateScale(260),
    alignSelf: "center",
    alignItems: "center",
  },
});
