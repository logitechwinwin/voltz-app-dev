import { openToast } from "../store/reducer";
import ApiManager from "./api-manager";

export const addDeviceToken = async (fcmToken, dispatch) => {
  try {
    await ApiManager("post", "users/add-device-token", {
      deviceToken: fcmToken,
    });
  } catch (error) {
    console.log("🚀 ~ addDeviceToken ~ error:", error?.response?.data);
    dispatch(openToast({ message: error?.response?.data?.message }));
  }
};

export const removeDeviceToken = async (fcmToken, dispatch) => {
  try {
    await ApiManager("post", "users/remove-device-token", {
      deviceToken: fcmToken,
    });
  } catch (error) {
    console.log("🚀 ~ removeDeviceToken ~ error:", error?.response);
    dispatch(openToast({ message: error?.response?.data?.message }));
  }
};
