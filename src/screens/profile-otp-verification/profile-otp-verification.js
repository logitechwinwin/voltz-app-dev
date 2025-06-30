import React, { useState } from "react";
import { View } from "react-native";

import { Container } from "../../atom-components";
import {
  AuthLinkButton,
  FormCard,
  Header,
  InputField,
  PrimaryButton,
  TopHeading,
} from "../../components";
import { styles } from "./styles";

export default function ProfileOtpVerification({ navigation, route }) {
  const [inputValue, setInputValue] = useState("1234");
  const [errorMsg, setErrorMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  const { screenType } = route?.params;
  const isEmailScreen = screenType == "email";
  const otpValue = "1234";

  const validate = () => {
    if (!inputValue) {
      setErrorMsg("The OTP field is required.");
      return false;
    } else if (inputValue != otpValue) {
      console.log('inputValue: ', inputValue, 'otpValue: ', otpValue);
      setErrorMsg("The OTP you entered is incorrect");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleInputChange = (value) => {
    if (isNaN(value)) return;
    setInputValue(value.trim());
    if (!!errorMsg) setErrorMsg("");
  };

  const handleNext = () => {
    console.log('verify otp button pressed in profile otp verification');
    if (!validate()) return;
    navigation.navigate("Setting");
  };

  return (
    <>
      <View style={styles.headerView}>
        <Header back />
      </View>
      <Container light>
        <TopHeading
          title="Verification Code"
          subTitle={`We have sent the OTP to verify your new ${
            isEmailScreen ? `email${"\n"}address` : `phone${"\n"}number`
          }
          `}
          mT={20}
          mB={0}
        />
        {/* Input Field Card Section */}
        <FormCard>
          <InputField
            label="OTP"
            value={inputValue}
            handleChange={handleInputChange}
            error={errorMsg}
            numPad
            maxLength={4}
          />
          <AuthLinkButton
            text="Did not receive the code?"
            btnText="Resend →"
            onPress={() => {
              setBtnDisable(true);
            }}
            btnDisable={btnDisable}
          />
        </FormCard>
        <PrimaryButton label="Verify Otp" onPress={handleNext} mt={32} />
      </Container>
    </>
  );
}
