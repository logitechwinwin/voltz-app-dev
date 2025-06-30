import { useState } from "react";
import ApiManager from "../helpers/api-manager";
import { useDispatch } from "react-redux";
import { openToast, toggleLoader } from "../store/reducer";

const useRegisterUnRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const registerUnRegister = async (id, action) => {
    setIsLoading(true);

    const apiUrl =
      action == "register" ? `events/register` : `events/un-register`;

    try {
      await ApiManager("post", apiUrl, {
        eventId: id,
      });
      return true;
    } catch (err) {
      dispatch(openToast({ message: err.response?.data?.message }));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUnRegister, isLoading };
};

export default useRegisterUnRegister;
