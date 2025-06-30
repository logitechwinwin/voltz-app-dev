import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Flex } from "../../../atom-components";
import {
  ChevronBackIcon,
  HorizontalEllipsis,
  Logo,
  NotificationIcon,
  SettingIcon,
  ShareIcon,
  VoltzIconWhenPFP,
} from "../../../assets";
import { sizer } from "../../../helpers";
import { COLORS, baseOpacity } from "../../../globals";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCheckLoginStatus } from "../../../hooks";
import { resetToFirstScreen } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeepLink } from "../../../store/reducer";

const Header = ({
  back,
  rightIcon,
  pH = 0,
  walletIcon = false,
  setShowWallet = () => {},
  backPress,
}) => {
  const navigation = useNavigation();
  const { checkLoginStatus } = useCheckLoginStatus();
  const { isDeepLink } = useSelector((state) => state.storeReducer);
  const dispatch = useDispatch();

  const handleBackPress = backPress || (() => navigation.goBack());

  return (
    <Flex flexStyle={styles.main} pH={pH}>
      {back ? (
        <TouchableOpacity
          activeOpacity={baseOpacity}
          onPress={() =>
            isDeepLink
              ? (resetToFirstScreen(navigation), dispatch(setIsDeepLink(false)))
              : handleBackPress()
          }
          hitSlop={styles.hitSlop}
          style={styles.backButton}
        >
          <ChevronBackIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={baseOpacity} style={{ opacity: 0 }}>
          <HorizontalEllipsis />
        </TouchableOpacity>
      )}
      <View style={styles.centeredView}>
        {back ? <VoltzIconWhenPFP /> : <Logo />}
      </View>
      {!back && (
        <Flex algItems="center" gap={16}>
          {walletIcon && (
            <TouchableOpacity
              activeOpacity={baseOpacity}
              onPress={() => {
                checkLoginStatus() && setShowWallet(true);
              }}
            >
              <MaterialCommunityIcons
                name={"wallet-outline"}
                size={sizer.moderateScale(20)}
                iconType="solid"
                color={COLORS.black}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={baseOpacity}
            onPress={() => {
              checkLoginStatus() && navigation.navigate("Messages");
            }}
          >
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={baseOpacity}
            onPress={() => {
              checkLoginStatus() && navigation.navigate("Notifications");
            }}
          >
            <NotificationIcon />
          </TouchableOpacity>
        </Flex>
      )}

      {rightIcon && (
        <TouchableOpacity
          activeOpacity={baseOpacity}
          onPress={() => {
            navigation.navigate("Setting");
          }}
        >
          <SettingIcon />
        </TouchableOpacity>
      )}
    </Flex>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "space-between",
    height: sizer.moderateVerticalScale(54),
    backgroundColor: COLORS.white,
  },
  centeredView: {
    position: "absolute",
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    zIndex: 10, // Ensure the back button is on top
  },
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
});
