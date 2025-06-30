import { View, FlatList } from "react-native";

import { Container, EmptyState } from "../../atom-components";
import { HeaderWithTitle, SearchField } from "../../components";
import { sizer } from "../../helpers";

import RenderItem from "../../components/swiper-components/followers/renderItem";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ApiManager from "../../helpers/api-manager";
import { openToast } from "../../store/reducer";
import { ListSkeleton } from "../../components/skeleton-loaders";
import { ActivityIndicator } from "react-native-paper";
import format from "pretty-format";

const ViewAllVolunteers = ({ route }) => {
  const { userId, type = null, eventId } = route?.params ?? {};
  const [isFollowingNgoLoading, setIsFollowingNgoLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [typingLoading, setTypingLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const perPage = 20;

  const getFollowingCompanies = async () => {
    const apiUrl = () => {
      if (type === "followers") {
        return `follow/followers/${userId}?page=${page}&perPage=${perPage}&search=${searchVal}`;
      }
      if (type == "donation") {
        return `donation?page=${page}&perPage=${perPage}&eventId=${eventId}&search=${searchVal}`;
      }
      return `follow/following/${userId}?role=volunteer&page=${page}&perPage=${perPage}&search=${searchVal}`;
    };

    setIsFollowingNgoLoading(true);
    try {
      const { data } = await ApiManager("get", apiUrl());
      console.log("🚀 ~ getFollowingCompanies ~ apiUrl():", apiUrl())
      const newItems = data?.response?.details?.items || [];
      setTotalPages(data?.response?.details?.meta?.totalPages || 1);
      setApiData(
        page === 1 ? newItems : [...(apiData || {}), ...(newItems || {})]
      );
    } catch (error) {
      console.log("🚀 ~ getFollowingCompanies ~ error:", error);
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
    getFollowingCompanies();
  }, [page, searchVal]);

  useEffect(() => {
    if (searchVal) {
      setApiData([]);
      setPage(1);
    }
  }, [searchVal]);

  const handleLoadMore = () => {
    if ((apiData?.length >= perPage) && (page < totalPages)) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <Container>
      <HeaderWithTitle
        label={
          type == "followers"
            ? "Followers Volunteers"
            : type == "donation"
              ? "Donations Volunteers"
              : "Following Volunteers"
        }
      />
      {type != "donation" && type != "followers" && (
        <View style={{ marginBottom: sizer.moderateVerticalScale(12) }}>
          <SearchField
            value={searchVal}
            setValue={setSearchVal}
            setLoading={setTypingLoading}
            setData={setApiData}
          />
        </View>
      )}

      <FlatList
        data={apiData}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFollowingNgoLoading && apiData?.length && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        contentContainerStyle={{ flex: apiData?.length ? 0 : 1 }}
        initialNumToRender={perPage}
        ListEmptyComponent={
          typingLoading || isFollowingNgoLoading ? (
            <ListSkeleton />
          ) : (
            <EmptyState message={"No Volunteers Found"} />
          )
        }
        getItemLayout={(_, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
      />
    </Container>
  );
};

export default ViewAllVolunteers;
