import { useState } from "react";
import ApiManager from "../helpers/api-manager";
import { useDispatch } from "react-redux";
import { openToast } from "../store/reducer";

const useFollowUnfollow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const followUnfollow = async (id, action) => {
    setIsLoading(true);

    const apiUrl = `follow/${id}`;
    const method = action === "follow" ? "post" : "delete";
    try {
      await ApiManager(method, apiUrl);

      return true
    } catch (err) {
      dispatch(openToast({ message: err.response?.data?.message }));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { followUnfollow, isLoading };
};

export default useFollowUnfollow;
