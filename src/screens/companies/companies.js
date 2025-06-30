import { FlatList, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import { ChevronRightBold } from "../../assets";
import { HeaderWithTitle, SearchField } from "../../components";
import { sizer } from "../../helpers";
import { baseOpacity, placeholder_profile_img } from "../../globals";
import DATA from "./data";
import { useEffect, useState } from "react";
import ApiManager from "../../helpers/api-manager";
import { useDispatch } from "react-redux";
import { openToast } from "../../store/reducer";
import { ListSkeleton } from "../../components/skeleton-loaders";

const Companies = ({ route }) => {
  const { userId } = route?.params ?? {};
  const [isFollowingNgoLoading, setIsFollowingNgoLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [typingLoading, setTypingLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const perPage = 20;

  const getFollowingCompanies = async () => {
    setIsFollowingNgoLoading(true);
    try {
      const { data } = await ApiManager(
        "get",
        `follow/following/${userId}?role=company&page=${page}&perPage=${perPage}&search=${searchVal}`
      );
      const newItems = data?.response?.details?.company || [];
      setTotalPages(data?.response?.details?.meta?.totalPages || 1);
      setData(page === 1 ? newItems : [...data, ...newItems]);
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
    getFollowingCompanies();
  }, [page, searchVal]);

  useEffect(() => {
    if (searchVal) {
      setData([]);
      setPage(1);
    }
  }, [searchVal]);

  const handleLoadMore = () => {
    if (data?.length >= perPage && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => {
          navigation.navigate("CompanyProfile", { id: item?.id });
        }}
      >
        <Flex
          flexStyle={{ marginTop: sizer.moderateVerticalScale(15) }}
          jusContent="space-between"
          algItems="center"
        >
          <Flex flexStyle={{ alignItems: "center" }}>
            <Avatar.Image source={{ uri: item?.profileImage || placeholder_profile_img }} />
            <View style={{ marginLeft: sizer.moderateScale(15), width: "80%" }}>
              <Typography text={item.name} semiBold numberOfLines={1} />
              <Typography
                text={item?.about || item?.description}
                color="#757575"
                size={12}
                numberOfLines={2}
              />
            </View>
          </Flex>
          <View
            style={{
              position: "absolute",
              right: 0,
            }}
          >
            <ChevronRightBold />
          </View>
        </Flex>
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <HeaderWithTitle label="Following Companies" />

      <SearchField
        value={searchVal}
        setValue={setSearchVal}
        setLoading={setTypingLoading}
        setData={setData}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFollowingNgoLoading && data?.length && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        contentContainerStyle={{ flex: data?.length ? 0 : 1 }}
        initialNumToRender={perPage}
        ListEmptyComponent={
          typingLoading || isFollowingNgoLoading ? (
            <ListSkeleton />
          ) : (
            <EmptyState message={"No Company Found"} />
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

export default Companies;
