import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openToast, toggleLoader } from "../store/reducer";
import ApiManager from "../helpers/api-manager";
import format from "pretty-format";

const useFetchNgoData = ({
  shouldFetch,
  query = "",
  byInterest = false,
  loader = true,
  id = false,
  loaderBackgroundWhite = false,
  isFocused = true,
}) => {
  const [ngoData, setNgoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storeReducer);

  const fetchData = async (empty = false) => {
    setIsLoading(true);
    empty && setNgoData([]);
    loader &&
      dispatch(
        toggleLoader(
          loaderBackgroundWhite ? { loader: true, background: "white" } : true
        )
      );
    try {
      const userId = user?.details?.id ? `userId=${user?.details?.id}&` : "";
      const { data } = await ApiManager(
        "get",
        id
          ? `ngo/${id}`
          // : `ngo?byUserInterest=${byInterest}&${userId}${query}`
          : `ngo?byUserInterest=${byInterest}&${userId}${query}`
      );
      setNgoData(data?.response?.details);
    } catch (error) {
      dispatch(
        // openToast({
        //   message: error.response?.data?.message,
        // })
      );
    } finally {
      setIsLoading(false);
      loader && dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [dispatch, shouldFetch, query, user, isFocused]);

  return { ngoData, isLoading, setNgoData, refetch: fetchData };
};

export default useFetchNgoData;
