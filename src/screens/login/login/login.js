import React, { useRef, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { styles } from "./styles";
import { Container, Typography } from "../../../atom-components";
import {
  AuthLinkButton,
  FormCard,
  InputField,
  PhoneInputExample,
  PrimaryButton,
  SocialButton,
  TopHeading,
} from "../../../components";
import { renderSvg } from "../../../utils";
import {
  SocialEmailIcon,
  SocialFacebookIcon,
  SocialGoogleIcon,
  UsersThreeDark
} from "../../../assets";
import {
  addDeviceToken,
  sizer,
  validatePassword,
  validatePhone,
} from "../../../helpers";
import {
  login,
  openToast,
  setPreferenceScreen,
  setUser,
  toggleLoader,
} from "../../../store/reducer";
import ApiManager from "../../../helpers/api-manager";
import { usePushNotification } from "../../../hooks";
import { err } from "react-native-svg";

export default function Login({ navigation }) {
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    role: "volunteer",
    loginType: "phonenumber",
  });

  const dispatch = useDispatch();
  const { getFCMToken } = usePushNotification();
  const phoneNumberRef = useRef(null);
  const passRef = useRef(null);
  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId: "928492200732-5q3eu071ts44pod1j0oal2etf1vcgo3d.apps.googleusercontent.com", // Replace with your Web Client ID from Google Developer Console
    });
  }, []);

  const { phoneNumber, password } = formData;
  const validate = () => {
    let obj = {};
    obj.phoneNumber = validatePhone(phoneNumber);
    obj.password = validatePassword(password);

    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleFormData = (e, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e,
    }));
    if (formError[name]) {
      setFormError((prevFormErr) => ({
        ...prevFormErr,
        [name]: "",
      }));
    }
  };

  const handleLogin = async (type, socialData, accessToken) => {
    console.log('Login button pressed');
    let fcmToken = await getFCMToken();
    if (type ? false : validate() || !phoneNumberRef?.current?.isValidNumber())
      return;
    dispatch(toggleLoader(true));
    // console.log('type: ', type, 'formData: [ ', formData, ' ]');
    try {
      // console.log('type: ', type, 'formData: [ ', formData, ' ]');
      const { data } = await ApiManager(
        "post",
        type ? "auth/third-party-login" : "auth/sign-in",
        type ? { provider: type, token: socialData, accessToken } : formData
      );
      console.log('Request verification is successful ???: [ ', data, ' ]');
      await AsyncStorage.setItem("access_token", data?.response?.accessToken);
      addDeviceToken(fcmToken, dispatch);
      if (!!type && data?.response?.isNewUser) {
        dispatch(setUser(data?.response));
        navigation.navigate("PreferencesSelection");
      } else {
        dispatch(login(data?.response));
        navigation.navigate("TodayScreen", { screen: "Today" })
      }
    } catch (error) {
      console.error('social_login_error', error);
      if (error?.response?.status === 422) {
        setFormError(error?.response?.data?.details);
        dispatch(openToast({ message: error?.response?.data?.message }));
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  // GoogleSignin.configure({
  //   webClientId:
  //     "928492200732-5q3eu071ts44pod1j0oal2etf1vcgo3d.apps.googleusercontent.com",
  // });

  const handlePhoneNumberChange = (number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: number,
    }));
  };

  console.log('welcome screen');

  return (
    <ScrollView>
      <Container light>
        <TopHeading
          title="Welcome!"
          subTitle="Use the same phone number that you used when logging into the
        app before."
          mB={17}
        />
        <FormCard>
          <PhoneInputExample
            phoneNumber={phoneNumber}
            setPhoneNumber={handlePhoneNumberChange}
            phoneNumberRef={phoneNumberRef}
          />

          <InputField
            label="Password"
            value={password}
            handleChange={(e) => handleFormData(e, "password")}
            error={formError?.password}
            ref={passRef}
            onSubmitEditing={() => handleLogin()}
            password
          />

          {/* <AuthLinkButton
            mB={10}
            btnText="Forgot password?"
            onPress={() => navigation.navigate("ForgotPassword")}
            jusContent="flex-end"
          /> */}
          <AuthLinkButton
            btnText="Forgot password?"
            onPress={() => navigation.navigate("ForgotPassword")}
            jusContent="flex-end"
          />
          <View style={{ marginTop: sizer.moderateVerticalScale(15) }}>
            <AuthLinkButton
              text="Don't have an account?"
              btnText="Create an account →"
              onPress={() => navigation.navigate("CreateAccount")}
            />
          </View>
        </FormCard>
        {/* Login Button */}
        <PrimaryButton
          label="Log in"
          onPress={() => handleLogin()}
          mt={32}
          mb={16}
        />
        <Typography {...styles.divider} />
        {/* Social Buttons */}
        <SocialButton
          text="Continue as Guest"
          icon={renderSvg(UsersThreeDark, 26, 18)}
          handlePress={() => navigation.navigate("Home")}
          mT={16}
          type="email"
        />
        <SocialButton
          text="Continue with Email"
          icon={renderSvg(SocialEmailIcon, 26, 18)}
          handlePress={() => navigation.navigate("LoginWithEmail")}
          mT={16}
          type="email"
        />
        <SocialButton
          text="Continue with Google"
          icon={renderSvg(SocialGoogleIcon, 21, 21)}
          handlePress={handleLogin}
          type="google"
        />
        <SocialButton
          text="Continue with Facebook"
          icon={renderSvg(SocialFacebookIcon, 22, 21)}
          handlePress={handleLogin}
          type="facebook"
        />
        {/* <SocialButton
          text="Continue with Apple"
          icon={renderSvg(SocialAppleIcon, 19, 22)}
          handlePress={handleLogin}
        />
        <SocialButton
          text="Continue with LinkedIn"
          icon={renderSvg(SocialLinekdinIcon, 24, 24)}
          handlePress={handleLogin}
          mB={24}
        /> */}
      </Container>
    </ScrollView>
  );
}

const Text = ({ color, text }) => (
  <Typography size={14} color={color} text={text} />
);
