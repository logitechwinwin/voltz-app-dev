import { View } from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { styles } from "./styles";
import { Container, Flex, Typography } from "../../atom-components";
import {
  FormCard,
  Header,
  InputField,
  OutlineButton,
  PasswordChangeModal,
  PrimaryButton,
} from "../../components";
import {
  sizer,
  validateConfirmPassword,
  validatePassword,
} from "../../helpers";
import { openToast, toggleLoader } from "../../store/reducer";
import ApiManager from "../../helpers/api-manager";

export default function ChangePassword({ navigation }) {
  const [isVisible, setVisible] = useState(false);
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { password, newPassword, confirmPassword } = formData;

  const newPassRef = useRef(null);
  const reenterPassRef = useRef(null);
  const dispatch = useDispatch();

  const handleFormData = (e, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e.trim(),
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
    obj.newPassword = validatePassword(newPassword);
    obj.confirmPassword = validateConfirmPassword(newPassword, confirmPassword);

    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleSave = async () => {
    if (validate()) return;
    dispatch(toggleLoader(true));
    try {
      let { data } = await ApiManager("patch", "auth/change-password", {
        password: password,
        newPassword: newPassword,
      });

      dispatch(openToast({ type: "success", message: data?.message }));
      navigation.navigate("Setting");
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormError(error?.response?.data?.message);
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
      <View style={styles.headerView}>
        <Header back />
      </View>
      <Container light>
        <Typography text="Change Password" size={20} bold mT={20} mB={20} />

        <FormCard mB={22}>
          <InputField
            label="Enter Old Password"
            value={password}
            handleChange={(e) => handleFormData(e, "password")}
            error={formError?.password}
            onSubmitEditing={() => newPassRef.current.focus()}
            password
          />
          <InputField
            label="Enter New Password"
            value={newPassword}
            handleChange={(e) => handleFormData(e, "newPassword")}
            error={formError?.newPassword}
            ref={newPassRef}
            onSubmitEditing={() => reenterPassRef.current.focus()}
            password
          />
          <InputField
            label="Re-enter New Password"
            value={confirmPassword}
            handleChange={(e) => handleFormData(e, "confirmPassword")}
            error={formError?.confirmPassword}
            ref={reenterPassRef}
            onSubmitEditing={() => handleSave()}
            password
          />
        </FormCard>
        <Flex gap={sizer.moderateScale(10)} mt={41}>
          <OutlineButton
            label="Cancel"
            mt={0}
            style={styles.buttons}
            onPress={() => navigation.goBack()}
          />
          <PrimaryButton
            label="Save"
            height={36}
            btnStyle={styles.buttons}
            onPress={handleSave}
          />
        </Flex>
      </Container>
      {isVisible && (
        <PasswordChangeModal isVisible={isVisible} setVisible={setVisible} />
      )}
    </>
  );
}
