import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import {
  FormCard,
  GoBackBar,
  InputField,
  PrimaryButton,
  TopHeading,
} from "../../../components";
import { Container, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import { validateEmail } from "../../../helpers";
import { openToast, toggleLoader } from "../../../store/reducer";
import ApiManager from "../../../helpers/api-manager";

export default function ForgotPassword({ navigation }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const validate = () => {
    let obj = {};
    obj.email = validateEmail(inputValue);
    if (!Object.values(obj).every((value) => value === "")) {
      setErrorMsg(obj);
      return true;
    }
    return false;
  };


  const handleInputChange = (value) => {
    setInputValue(value);
    if (!!errorMsg.email) setErrorMsg("");
  };

  const handleNext = async () => {
    console.log('handleNext button pressed');
    if (validate()) return;
    dispatch(toggleLoader(true))
    try {
      const { data } = await ApiManager("post", "auth/forget-password", { email: inputValue });  
      navigation.navigate("OtpVerification", { email: inputValue });
    } catch (error) {
      if (error?.response?.status === 422) {
        setErrorMsg(error?.response?.data?.details)
        dispatch(openToast({ message: error?.response?.data?.message }));
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      dispatch(toggleLoader(false))
    }
  };

  return (
    <>
      <GoBackBar />
      <Container light>
        <TopHeading
          title="Forgot Password"
          subTitle="Use the email you used to create your account before"
          mB={17}
        />
        <FormCard>
          <InputField
            label="Email"
            value={inputValue}
            handleChange={handleInputChange}
            error={errorMsg.email}
            keyboardType="email-address"
            onSubmitEditing={() => handleNext()}
          />
          <Typography size={14} color={COLORS.text}>
            We’ll text you a OTP to continue
          </Typography>
        </FormCard>
        <PrimaryButton label="Next" onPress={handleNext} mt={32} />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
