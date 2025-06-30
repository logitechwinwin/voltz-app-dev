import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  AuthLinkButton,
  FormCard,
  GoBackBar,
  InputField,
  PrimaryButton,
  TopHeading,
} from "../../../components";
import { Container } from "../../../atom-components";
import ApiManager from "../../../helpers/api-manager";
import { openToast, toggleLoader } from "../../../store/reducer";

export default function OtpVerification({ navigation, route }) {
  const { email } = route?.params;
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const dispatch = useDispatch();
  const otpValue = "";

  const validate = () => {
    if (!inputValue) {
      setErrorMsg("The OTP field is required.");
      return false;
     } 
    // else if (inputValue != otpValue) {
    //   console.log('inputValue: ', inputValue, 'otpValue: ', otpValue);
    //   setErrorMsg("The OTP you entered is incorrect");
    //   return false;
    // }
    setErrorMsg("");
    return true;
  };

  const handleInputChange = (value) => {
    if (isNaN(value)) return;
    setInputValue(value);
    if (!!errorMsg) setErrorMsg("");
  };

  const handleNext = async () => {
    console.log('verify otp button pressed in otp verification');
    if (!validate()) return;
    console.log('inputValue: ', inputValue, 'otpValue: ', otpValue);
    const formData = {
      email: email,
      otp: inputValue
    }
    dispatch(toggleLoader(true))
    try {
      const { data } = await ApiManager("post", "auth/verify-otp", formData);
      console.log('otpId: ', data.response.details.otpId);
      navigation.navigate("ResetPassword", { otpId: data?.response?.details?.otpId });
    } catch (error) {
      if (error?.response?.status === 422) {
        console.log('error?.response?.data?.details: ', error?.response?.data?.details);
        setErrorMsg(error?.response?.data?.details)
        dispatch(openToast({ message: error?.response?.data?.message }));
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      console.log('finally block');
      dispatch(toggleLoader(false))
    }
  };

  const handleResend = async () => {
    if (!validate()) return;
    dispatch(toggleLoader(true))
    try {
      const { data } = await ApiManager("post", "auth/resend-otp", { email: email });
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
  }

  useEffect(() => {
    let interval;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      setBtnDisable(true);
      return () => clearInterval(interval);
    } else {
      setBtnDisable(false);
    }
  }, [seconds]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <GoBackBar hide />
      <Container light>
        <TopHeading
          title="Verification Code"
          subTitle={"We have sent the OTP to your email to reset your password"}
          mB={17}
        />
        {/* Input Field Card Section */}
        <FormCard>
          <InputField
            label="Enter OTP"
            value={inputValue}
            handleChange={handleInputChange}
            error={errorMsg}
            numPad
            maxLength={6}
          />
          <AuthLinkButton
            text="Did not receive the code?"
            btnText="Resend →"
            onPress={() => {
              setSeconds(60);
              handleResend()
            }}
            timerValue={formatTime(seconds)}
            btnDisable={btnDisable}
          />
        </FormCard>
        <PrimaryButton label="Verify OTP" onPress={handleNext} mt={32} />
      </Container>
    </>
  );
}
