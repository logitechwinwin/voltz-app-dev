import { FlatList, View } from "react-native";

import { EmptyState } from "../../../atom-components";
import { ViewAll } from "../../../screens/today/shared";
import RenderItem from "./renderItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ListSkeleton } from "../../skeleton-loaders";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiManager from "../../../helpers/api-manager";
import { openToast } from "../../../store/reducer";

const Followers = ({ userId, activeTab }) => {
  const [isFollowingNgoLoading, setIsFollowingNgoLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getFollowers = async () => {
    setIsFollowingNgoLoading(true);
    try {
      const { data } = await ApiManager("get", `follow/followers/${userId}`);
      const newItems = data?.response?.details?.items || [];
      setData(newItems);
    } catch (error) {
      dispatch(
        openToast({
          message: error.response?.data?.message,
        })
      );
    } finally {
      setIsFollowingNgoLoading(false);
    }
  };

  useEffect(() => {
    activeTab == 3 && getFollowers();
  }, [isFocused, activeTab]);

  return (
    <>
      <ViewAll
        fontBold
        label="Volunteers"
        mb={13}
        mt={26}
        onPress={() => {
          navigation.navigate("ViewAllVolunteers", {
            userId,
            type: "followers",
          });
        }}
      />

      {!data?.length && isFollowingNgoLoading ? (
        <ListSkeleton />
      ) : (
        data?.slice(0, 5)?.map((item, i) => <RenderItem item={item} key={i} />)
      )}

      {!data?.length && !isFollowingNgoLoading && (
        <EmptyState message="No Volunteers Found" />
      )}
    </>
  );
};

export default memo(Followers);
