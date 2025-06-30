import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { Flex, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import OutlineButton from "../../custom-buttons/outline-button/outline-button";

const VoltzRequest = ({ isVisible, setVisible, navigation }) => {
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible} pH={39} pB={24}>
      <Typography
        text="Voltz Redeem Request"
        textAlign="center"
        medium
        mT={24}
      />
      <Typography
        text="Your Voltz Redeem Request Is Sent to the Campaign Manager"
        medium
        mT={17}
        color={COLORS.greyV10}
        textAlign="center"
      />

      <Flex>
        <OutlineButton label="Ok" mt={32} onPress={() => navigation.goBack()} />
      </Flex>
    </ModalWrapper>
  );
};

export default VoltzRequest;

const styles = StyleSheet.create({});
