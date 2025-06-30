import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { Flex, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import { sizer } from "../../../helpers";
import OutlineButton from "../../custom-buttons/outline-button/outline-button";

const ConfirmAvail = ({
  isVisible,
  setVisible = () => {},
  handleDealAvail = () => {},
}) => {
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible}>
      <View style={styles.container}>
        <Typography
          text="Are you sure want to avail this deal?"
          size={16}
          color={COLORS.blackV1}
          textAlign="center"
          bold
          mB={10}
        />
        <Flex algItems={"center"} gap={8}>
          <OutlineButton label="OK" onPress={handleDealAvail} />
          <OutlineButton label="Cancel" onPress={() => setVisible(false)} />
        </Flex>
      </View>
    </ModalWrapper>
  );
};

export default ConfirmAvail;

const styles = StyleSheet.create({
  container: {
    padding: sizer.moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
