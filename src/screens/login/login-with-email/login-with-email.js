import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AuthLinkButton,
  FormCard,
  GoBackBar,
  InputField,
  PrimaryButton,
  TopHeading,
} from "../../../components";
import { Container } from "../../../atom-components";
import {
  addDeviceToken,
  sizer,
  validateEmail,
  validatePassword,
} from "../../../helpers";
import {
  login,
  openToast,
  setPreferenceScreen,
  toggleLoader,
} from "../../../store/reducer";
import ApiManager from "../../../helpers/api-manager";
import { usePushNotification } from "../../../hooks";
import { View } from "react-native";

export default function LoginWithEmail({ navigation }) {
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "volunteer",
    loginType: "email",
  });
  const dispatch = useDispatch();
  const passRef = useRef(null);
  const { getFCMToken } = usePushNotification();

  const { email, password } = formData;

  const handleFormData = (e, name) => {
    const value = name === 'email' ? e.trim() : e;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (formError[name]) {
      setFormError((prevFormErr) => ({
        ...prevFormErr,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let obj = {};
    obj.email = validateEmail(email);
    obj.password = validatePassword(password);

    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleLogin = async () => {
    if (validate()) return;
    let fcmToken = await getFCMToken();
    dispatch(toggleLoader(true));
    try {
      const { data } = await ApiManager("post", "auth/sign-in", formData);
      await AsyncStorage.setItem("access_token", data?.response?.accessToken);
      addDeviceToken(fcmToken, dispatch);
      dispatch(login(data?.response));
      navigation.navigate("TodayScreen", { screen: "Today" })
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error?.response);
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

  return (
    <>
      <GoBackBar />
      <Container light>
        <TopHeading
          title="Login with Email"
          subTitle="Use the email you used to create your account before"
          mB={17}
        />
        <FormCard mB={17}>
          <InputField
            label="Email"
            value={email}
            handleChange={(e) => handleFormData(e, "email")}
            error={formError?.email}
            onSubmitEditing={() => passRef.current.focus()}
          />
          <InputField
            label="Password"
            value={password}
            handleChange={(e) => handleFormData(e, "password")}
            error={formError?.password}
            ref={passRef}
            onSubmitEditing={handleLogin}
            password={true}
          />
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
        <PrimaryButton label="Login" onPress={handleLogin} mt={32} />
      </Container>
    </>
  );
}
