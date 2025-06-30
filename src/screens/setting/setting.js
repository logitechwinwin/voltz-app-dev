import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { Container, Flex, Typography } from "../../atom-components";
import { Header } from "../../components";
import { removeDeviceToken, sizer } from "../../helpers";
import { COLORS, CONSTANTS, baseOpacity } from "../../globals";
import { ChevronRightIconV1 } from "../../assets";
import { accountData, documentationData } from "./data";
import { logOut, openToast, toggleLoader } from "../../store/reducer";
import { usePushNotification } from "../../hooks";

export default function Setting({ navigation }) {
  const ListItem = ({ item }) => {
    const actionGoTo = item?.goTo;
    const dispatch = useDispatch();
    const { getFCMToken } = usePushNotification();

    const removeFcmToken = async () => {
      dispatch(toggleLoader(true));
      // let fcmToken = await getFCMToken();
      try {
        // await removeDeviceToken(fcmToken, dispatch);
        dispatch(logOut());
        navigation.navigate("TodayScreen", { screen: "Today" })
      } catch (error) {
        dispatch(openToast({ message: error?.response?.data?.message }));
      } finally {
        dispatch(toggleLoader(false));
      }
    };

    const handlePress = () => {
      if (!!actionGoTo) {
        navigation.navigate(actionGoTo);
      } else if (item?.label == "Sign out") {
        removeFcmToken();
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        style={styles.pressItem}
        onPress={handlePress}
      >
        <Flex algItems="center" gap={sizer.moderateScale(8)}>
          <View
            style={{
              width: sizer.moderateScale(28),
              alignItems: "center",
            }}
          >
            {item?.icon}
          </View>
          <Typography text={item?.label} color={COLORS.blackV2} />
        </Flex>
        <ChevronRightIconV1 />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <Header back />
      <View style={styles.main}>
        <Typography text="Account" size={20} bold mT={20} mB={10} />
        {accountData.map((item, i) => (
          <ListItem key={i} item={item} />
        ))}
        <Typography text="Documentation" size={20} bold mT={10} mB={10} />
        {documentationData.map((item, i) => (
          <ListItem key={i} item={item} />
        ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
    paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
    backgroundColor: COLORS.whiteV1,
  },
  pressItem: {
    height: sizer.moderateVerticalScale(48),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
