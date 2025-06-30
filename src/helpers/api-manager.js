import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { baseUrl } from "../globals";

async function CheckInternet() {
  try {
    const response = await NetInfo.fetch();
    return response.isConnected;
  } catch (error) {
    console.error("Error checking internet connectivity:", error);
    return false;
  }
}
async function ApiManager(method = "", path = "", params = {}, headerOpt = {}) {

  const isConnected = await CheckInternet();
  if (!isConnected) {
    return new Promise((resolve, reject) => {
      reject({
        response: {
          data: { message: "Please Check Your Internet Connection" },
        },
      });
    });
  }

  let header = {
    headers: {
      "Content-Type": "application/json",
      ...headerOpt,
    },
  };

  const token = await AsyncStorage.getItem("access_token");
  if (token) {
    header.headers.Authorization = `Bearer ${token}`;
  }
  return new Promise((myResolve, myReject) => {
    if (method === "post" || method === "put" || method === "patch") {
      axios[method](baseUrl + path, params, header)
        .then((response) => myResolve(response))
        .catch((err) => myReject(err));
    } else {
      axios[method](baseUrl + path, header)
        .then((response) => myResolve(response))
        .catch((err) => myReject(err));
    }
  });
}

export default ApiManager;
