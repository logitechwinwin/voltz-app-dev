import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useCheckLoginStatus = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.storeReducer);

  const checkLoginStatus = (navigate = true) => {
    if (!user) {
      navigate && navigation.navigate("Login");
      return false;
    }
    return true;
  };

  return { checkLoginStatus };
};

export default useCheckLoginStatus;
