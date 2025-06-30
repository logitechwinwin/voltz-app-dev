import React, { useCallback, useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import {
  FormCard,
  GoBackBar,
  InputField,
  PhoneInputExample,
  PrimaryButton,
  TopHeading,
} from "../../../components";
import { Container } from "../../../atom-components";
import {
  addDeviceToken,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../../helpers";
import {
  login,
  openToast,
  setUser,
  toggleLoader,
} from "../../../store/reducer";
import { useDispatch } from "react-redux";
import ApiManager from "../../../helpers/api-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { usePushNotification } from "../../../hooks";

export default function CreateAccount({ navigation }) {

  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    re_enter_password: "",
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    re_enter_password,
  } = formData;

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passRef = useRef(null);
  const reenterPassRef = useRef(null);
  const dispatch = useDispatch();
  const { getFCMToken } = usePushNotification();

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
    obj.firstName = validateName(firstName, "The First Name field is required");
    obj.lastName = validateName(lastName, "The Last Name field is required");
    obj.phoneNumber = validatePhone(phoneNumberRef?.current?.state?.value);
    obj.re_enter_password = validateConfirmPassword(
      password,
      re_enter_password
    );
    obj.password = validatePassword(password);

    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleSignup = async () => {
    if (validate()) {
      return;
    }
    let fcmToken = await getFCMToken();
    dispatch(toggleLoader(true));
    try {
      const { re_enter_password, ...remainingObj } = formData;
      const { data } = await ApiManager(
        "post",
        "auth/volunteer/sign-up",
        remainingObj
      );

      await AsyncStorage.setItem("access_token", data?.response?.accessToken);
      addDeviceToken(fcmToken, dispatch);
      dispatch(login(data?.response));
      dispatch(
        openToast({
          type: "success",
          message: "Your account created successfully",
        })
      );
      resetToHomeWithExistingScreens();
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormError(error?.response?.data?.details);
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  // Function to reset the navigation state
  const resetToHomeWithExistingScreens = () => {
    // Filter out authentication screens
    const filteredRoutes = navigation
      ?.getState()
      ?.routes?.filter(
        (route) =>
          ![
            "Login",
            "OtpVerification",
            "LoginWithEmail",
            "ForgotPassword",
            "ResetPassword",
            "CreateAccount",
          ].includes(route.name)
      );

    // Reset the navigation state
    navigation.dispatch(
      CommonActions.reset({
        index: filteredRoutes.length - 1,
        routes: filteredRoutes,
      })
    );
  };

  const handlePhoneNumberChange = useCallback((number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNumber: number,
    }));
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={{ flex: 1 }} >
      <ScrollView>
        <GoBackBar />
        <Container light>
          <TopHeading title="Create your profile" mB={28} mT={23} />
          <FormCard>
            <InputField
              label="First name"
              value={firstName}
              handleChange={(e) => handleFormData(e, "firstName")}
              error={formError?.firstName}
              onSubmitEditing={() => lastNameRef.current.focus()}
            />
            <InputField
              label="Last name"
              value={lastName}
              handleChange={(e) => handleFormData(e, "lastName")}
              error={formError?.lastName}
              ref={lastNameRef}
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <InputField
              label="Email"
              value={email}
              handleChange={(e) => handleFormData(e, "email")}
              error={formError?.email}
              ref={emailRef}
              onSubmitEditing={() => phoneNumberRef.current.focus()}
            />
            {/* <InputField
            label="Phone number"
            value={phoneNumber}
            handleChange={(e) => handleFormData(e, "phoneNumber")}
            error={formError?.phoneNumber}
            ref={phoneNumberRef}
            numPad
            maxLength={10}
            onSubmitEditing={() => passRef.current.focus()}
            contextMenuHidden={true}
          /> */}

            <PhoneInputExample
              error={formError?.phoneNumber}
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
              onSubmitEditing={() => reenterPassRef.current.focus()}
              password
            />
            <InputField
              label="Confirm password"
              value={re_enter_password}
              handleChange={(e) => handleFormData(e, "re_enter_password")}
              error={formError?.re_enter_password}
              ref={reenterPassRef}
              onSubmitEditing={() => handleSignup()}
              // mB={32}
              password
            />
          </FormCard>
          <PrimaryButton mt={16} label="Create account" onPress={handleSignup} />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}
