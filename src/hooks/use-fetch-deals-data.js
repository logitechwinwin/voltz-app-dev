import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openToast, toggleLoader } from "../store/reducer";
import ApiManager from "../helpers/api-manager";

const useFetchDealsData = ({
  shouldFetch,
  query = "",
  loader = false,
  id = false,
  loaderBackgroundWhite = false,
  isFocused = true,
}) => {
  const [dealsData, setDealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storeReducer);

  const fetchData = async () => {
    setIsLoading(true);
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
        id ? `deal/${id}` : `deal?${userId}${query}`
      );
      setDealsData(data?.response?.details);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setIsLoading(false);
      loader && dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch, id, isFocused, user, query, dispatch]);

  return { dealsData, isLoading, refetch: fetchData };
};

export default useFetchDealsData;
