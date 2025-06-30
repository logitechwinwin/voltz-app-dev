import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiManager from "../helpers/api-manager";
import { openToast, toggleLoader } from "../store/reducer";

const useFetchEventsData = ({
  shouldFetch,
  query = "",
  type = "",
  byInterest = false,
  loader = false,
  id = false,
  loaderBackgroundWhite = false,
  isFocused = true,
}) => {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storeReducer);


  const fetchData = async (empty = false) => {
    if (shouldFetch) {
      empty && setEventsData([]);
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
          id
            ? `events/${id}`
            : `events?type=${type}&${userId}${query}`
        );
        setEventsData(data?.response?.details);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error?.response?.data);
        // dispatch(openToast({ message: error?.response?.data?.message }));
      } finally {
        setIsLoading(false);
        loader && dispatch(toggleLoader(false));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, shouldFetch, query, user, type, id, isFocused]);

  return { eventsData, isLoading, setEventsData, refetch: fetchData };
};

export default useFetchEventsData;
