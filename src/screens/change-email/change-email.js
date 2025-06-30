import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { Container, Flex, Typography } from "../../atom-components";
import {
  FormCard,
  Header,
  InputField,
  OutlineButton,
  PrimaryButton,
} from "../../components";
import { sizer, validateEmail } from "../../helpers";
import { login, openToast, toggleLoader } from "../../store/reducer";
import ApiManager from "../../helpers/api-manager";

export default function ChangeEmail({ navigation }) {
  const { user } = useSelector((state) => state.storeReducer);
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    email: user?.details?.email || "",
  });
  const dispatch = useDispatch();

  const { email } = formData;
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
    obj.email = validateEmail(email);

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
      let { data } = await ApiManager("patch", "users", formData);
      dispatch(login(data?.response));
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
        <Typography text="Change Email" size={20} bold mT={20} mB={20} />

        <FormCard mB={22}>
          <InputField
            label="Enter New Email"
            value={email}
            handleChange={(e) => handleFormData(e, "email")}
            error={formError?.email}
            onSubmitEditing={() => handleSave()}
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
    </>
  );
}
