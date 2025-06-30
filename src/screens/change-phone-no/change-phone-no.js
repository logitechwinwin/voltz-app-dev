import { useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { Container, Flex, Typography } from "../../atom-components";
import {
  FormCard,
  Header,
  OutlineButton,
  PhoneInputExample,
  PrimaryButton,
} from "../../components";
import { sizer } from "../../helpers";
import { login, openToast, toggleLoader } from "../../store/reducer";
import ApiManager from "../../helpers/api-manager";

export default function ChangePhoneNo({ navigation }) {
  const { user } = useSelector((state) => state.storeReducer);
  // const [phoneError, setPhoneError] = useState("");
  const [phoneNumberr, setPhoneNumberr] = useState(
    user?.details?.phoneNumber || ""
  );

  const phoneNumberRef = useRef(null);
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (!phoneNumberRef?.current?.isValidNumber()) return;
    dispatch(toggleLoader(true));
    try {
      let { data } = await ApiManager("patch", "users", formData);
      dispatch(login(data?.response));
      dispatch(openToast({ type: "success", message: data?.message }));
      navigation.navigate("Setting");
    } catch (error) {
      if (error?.response?.status === 422) {
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
        <Typography text="Change Phone Number" size={20} bold mT={20} mB={20} />

        <FormCard mB={22}>
          <PhoneInputExample
            phoneNumber={phoneNumberr}
            setPhoneNumber={setPhoneNumberr}
            phoneNumberRef={phoneNumberRef}
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
