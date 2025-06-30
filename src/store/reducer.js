import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const myReducer = createSlice({
  name: "storeReducer",
  initialState: {
    isLogged: false,
    isDeepLink: false,
    user: null,
    showLoader: false,
    onboard: true,
    preferenceScreen: true,
    splashScreen: true,
    toast: {
      open: false,
      message: "",
      type: "",
    },
  },

  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state) => {
      state.isLogged = false;
      state.user = null;
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("preferenceScreen");
      state.preferenceScreen = true;
    },
    login: (state, { payload }) => {
      state.isLogged = true;
      if (payload) {
        state.user = payload;
      }
    },
    toggleLoader: (state, { payload }) => {
      state.showLoader = payload;
    },
    setIsDeepLink: (state, { payload }) => {
      state.isDeepLink = payload;
    },
    openToast: (state, { payload }) => {
      state.toast = {
        open: true,
        message: payload.message,
        type: payload.type,
      };
    },
    closeToast: (state) => {
      state.toast = {
        open: false,
        message: null,
        type: "",
      };
    },
    setOnboard: (state, { payload }) => {
      state.onboard = payload;
    },
    setPreferenceScreen: (state, { payload }) => {
      state.preferenceScreen = payload;
    },
    setSplashScreen: (state) => {
      state.splashScreen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  logOut,
  toggleLoader,
  openToast,
  closeToast,
  login,
  setOnboard,
  setSplashScreen,
  setEvents,
  leaveEvent,
  setUserFollow,
  setPreferenceScreen,
  setIsDeepLink,
} = myReducer.actions;
export default myReducer.reducer;
