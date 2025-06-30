import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  FormCard,
  GoBackBar,
  InputField,
  PrimaryButton,
  TopHeading,
} from "../../../components";
import { Container } from "../../../atom-components";
import { validateConfirmPassword, validatePassword } from "../../../helpers";
import { openToast, toggleLoader } from "../../../store/reducer";
import ApiManager from "../../../helpers/api-manager";

export default function ResetPassword({ navigation, route }) {
  const { otpId } = route?.params;
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    re_enter_password: "",
  });
  const dispatch = useDispatch();
  const passRef = useRef(null);

  const { password, re_enter_password } = formData;
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

  const validate = () => {
    let obj = {};
    obj.password = validatePassword(password);
    obj.re_enter_password = validateConfirmPassword(password, re_enter_password);

    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (validate()) return;
    dispatch(toggleLoader(true))
    try {
      const { data } = await ApiManager("post", "auth/reset-password", { otpId: otpId, newPassword: formData?.password });
      navigation.navigate("LoginWithEmail");
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
      <GoBackBar hide />
      <Container light>
        <TopHeading
          title="Reset Your Password"
          subTitle="Enter your new password"
          mB={17}
        />
        {/* Input Field Card Section */}
        <FormCard mB={17}>
          <InputField
            label="Enter New Password"
            value={password}
            handleChange={(e) => handleFormData(e, "password")}
            error={formError?.password}
            onSubmitEditing={() => passRef.current.focus()}
            password
          />
          <InputField
            label="Re-Enter New Password"
            value={re_enter_password}
            handleChange={(e) => handleFormData(e, "re_enter_password")}
            error={formError?.re_enter_password}
            ref={passRef}
            onSubmitEditing={() => handleSubmit()}
            password
          />
        </FormCard>
        <PrimaryButton label="Submit" onPress={handleSubmit} mt={32} />
      </Container>
    </>
  );
}
