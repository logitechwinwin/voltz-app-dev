import React, { useEffect, useState } from "react";
import {
  Linking,
  LogBox,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { baseApiUrl, COLORS, linking } from "../globals";
import {
  closeToast,
  login,
  logOut,
  setIsDeepLink,
  setOnboard,
  setPreferenceScreen,
  toggleLoader,
} from "../store/reducer";
import { CustomToast, GlobalModal } from "../components";
import { AppStack, OnboardStack } from "./";
import { SplashScreen } from "../screens";
import ApiManager from "../helpers/api-manager";
import { Loader } from "../atom-components";
import { SocketProvider } from "../contexts/socket-context";
import { usePushNotification } from "../hooks";

function RootNavigation() {
  const [splashScreen, setSplashScreen] = useState(true);

  const { toast, onboard, showLoader, preferenceScreen, isLogged } =
    useSelector((state) => state.storeReducer);
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const { requestUserPermission, notificationListener } = usePushNotification(
    dispatch,
    navigationRef
  );

  const requestNotificationPermission = async () => {
    if(Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return result;
    }
  };

  const onboardCheck = async () => {
    const on_board = await AsyncStorage.getItem("@onboard");
    if (on_board || on_board == "true") {
      dispatch(setOnboard(false));
    }
  };

  const preferenceScreenCheck = async () => {
    const preferenceScreen = await AsyncStorage.getItem("preferenceScreen");
    if (preferenceScreen || preferenceScreen == "true") {
      dispatch(setPreferenceScreen(false));
    }
  };

  const hideSplashScreen = () => setSplashScreen(false);

  const validateToken = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      dispatch(toggleLoader(true));
      try {
        let { data } = await ApiManager("get", "auth/me");
        dispatch(login(data?.response));
      } catch (error) {
        if (error?.response?.status === 401) {
          dispatch(logOut());
          hideSplashScreen();
        }
      } finally {
        dispatch(toggleLoader(false));
        hideSplashScreen();
      }
    } else {
      dispatch(logOut());
      dispatch(toggleLoader(false));
      hideSplashScreen();
    }
  };

  useEffect(() => {
    const handleDeepLink = (url) => {
      dispatch(setIsDeepLink(true));
      console.log("Received URL:", url);
    };

    const linkingListener = Linking.addEventListener("url", ({ url }) =>
      handleDeepLink(url)
    );

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (notificationData?.screenType && isLogged) {
  //     setTimeout(() => {
  //       if (notificationData?.screenType == 'Estimate') {
  //         navigationRef.navigate('Notifications');
  //         return;
  //       }
  //       navigationRef?.navigate(notificationData?.screenType);
  //     }, 500);
  //   }
  // }, [isLogged]);

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    preferenceScreenCheck();
    requestUserPermission();
    notificationListener();
    requestNotificationPermission();
    onboardCheck();
    validateToken();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={onboard ? COLORS.whiteV1 : COLORS.white}
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <NavigationContainer ref={navigationRef} linking={linking}>
          <SplashScreen status={splashScreen} setStatus={setSplashScreen} />
          {onboard ? (
            <OnboardStack />
          ) : (
            <SocketProvider isLogged={isLogged}>
              <AppStack preferenceScreen={preferenceScreen} />
            </SocketProvider>
          )}
        </NavigationContainer>
        {toast.open && (
          <CustomToast toast={toast} close={() => dispatch(closeToast())} />
        )}
        {showLoader && <Loader backgroundColor={showLoader?.background} />}
      </SafeAreaView>
      <GlobalModal />
    </>
  );
}

export default RootNavigation;
