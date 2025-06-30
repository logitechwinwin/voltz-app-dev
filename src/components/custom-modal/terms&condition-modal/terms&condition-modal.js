import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { CheckBox, ModalWrapper, OutlineButton } from "../../";
import { Flex, Typography } from "../../../atom-components";

export default function TermsAndConditionModal({ isVisible, setVisible }) {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible} pT={26} pB={19} pH={26}>
      <View>
        <Typography text="Do You Accept Terms?" medium textAlign="center" />
        <Flex algItems="center" gap={12} mt={27}>
          <CheckBox isCheck={checkbox1} setCheck={setCheckbox1} />
          <Typography text="I accept the terms of use" />
        </Flex>

        <Flex algItems="center" gap={12} mt={16} mb={19}>
          <CheckBox isCheck={checkbox2} setCheck={setCheckbox2} />
          <Typography text="I accept the terms and conditions" />
        </Flex>

        <Flex algItems="center" gap={12} mt={16}>
          <OutlineButton label="Accept" />
          <OutlineButton label="Decline" onPress={()=> {console.log("heelo")}}/>
        </Flex>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({});
