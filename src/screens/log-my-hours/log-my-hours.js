import { StyleSheet } from "react-native";

import { Container, Flex, Typography } from "../../atom-components";
import {
  HeaderWithTitle,
  InputField,
  OutlineButton,
  VoltzRequest,
} from "../../components";
import { COLORS } from "../../globals";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiManager from "../../helpers/api-manager";
import { openToast, toggleLoader } from "../../store/reducer";
import { useNavigation } from "@react-navigation/native";

const LogMyHours = ({ route }) => {
  const { eventId } = route?.params ?? {};
  const [isVisible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRequest = async () => {
    dispatch(toggleLoader(true));
    try {
      await ApiManager("post", `volunteer-requests`, {
        eventId: eventId,
        quotedHours: value,
      });
      setVisible(true);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        navigation.goBack();
        setVisible(false);
      }, 2000);
    }
  }, [isVisible]);

  return (
    <Container>
      <HeaderWithTitle label="My Hours" />
      <Typography
        mT={48}
        text="Enter the hours you work in event"
        color={COLORS.blackV2}
      />
      <InputField
        mT={20}
        label="Hours"
        value={value}
        maxLength={10}
        handleChange={(e) => setValue(e)}
        numPad
        contextMenuHidden={true}
      />
      <Flex mt={10}>
        <OutlineButton
          disabled={!value?.toString().trim()}
          onPress={handleRequest}
          label="Send Voltz Request"
        />
      </Flex>
      <VoltzRequest
        isVisible={isVisible}
        setVisible={setVisible}
        navigation={navigation}
      />
    </Container>
  );
};

export default LogMyHours;

const styles = StyleSheet.create({});
