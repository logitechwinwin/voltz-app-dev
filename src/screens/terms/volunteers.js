import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Container, Flex, Typography } from "../../atom-components";
import {
  CheckBox,
  Header,
  OutlineButton,
  PrimaryButton,
} from "../../components";
import { COLORS } from "../../globals";
import { sizer } from "../../helpers";
import { text } from "./data";

const VolunteersTerms = ({ showAcceptBtn }) => {
  const [checkbox, setCheckBox] = useState(false);
  return (
    <ScrollView>
      <Container>
        <Header back />
        <Typography text="Volunteers" color={COLORS.primary} semiBold mT={29} />
        <Typography text="Terms and Conditions" size={24} bold />
        <Typography
          text="Your Agreement"
          bold
          mT={10}
          color={COLORS.darkblue}
        />

        <Typography
          color={COLORS.greyV2}
          LineHeight={21}
          size={14}
          mT={6}
          // textAlign="justify"
          text={text}
        />
        {showAcceptBtn && (
          <>
            <Flex gap={5}>
              <CheckBox isCheck={checkbox} setCheck={setCheckBox} />
              <Typography
                size={14}
                bold
                LineHeight={21}
                text="By ticking this box, you agree to the above terms 
and conditions."
              />
            </Flex>

            <Flex mt={23} gap={9} mb={40}>
              <PrimaryButton
                label="Accept"
                height={31}
                btnStyle={{ flex: 0.5, borderRadius: sizer.moderateScale(50) }}
              />
              <OutlineButton
                label="Decline"
                mt={0}
                style={{ flex: 0.5, height: sizer.moderateVerticalScale(31) }}
              />
            </Flex>
          </>
        )}
      </Container>
    </ScrollView>
  );
};

export default VolunteersTerms;

const styles = StyleSheet.create({});
