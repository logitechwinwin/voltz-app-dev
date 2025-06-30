import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";

import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import {
  FilterNgosBottomSheet,
  HeaderWithTitle,
  SearchField,
} from "../../components";
import { sizer } from "../../helpers";
import { baseOpacity } from "../../globals";
import { ChevronRightBold } from "../../assets";
import { useFetchNgoData } from "../../hooks";
import { ListSkeleton } from "../../components/skeleton-loaders";
import { openToast } from "../../store/reducer";
import ApiManager from "../../helpers/api-manager";

const ViewAllNgos = ({ route }) => {
  const { followingNgos = false, userId } = route?.params ?? {};

  const [isVisible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [typingLoading, setTypingLoading] = useState(false);
  const [isFollowingNgoLoading, setIsFollowingNgoLoading] = useState(followingNgos);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    SDGs: "",
  });
  const [filterData, setFilterData] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const perPage = 20;

  const { ngoData, isLoading } = useFetchNgoData({
    shouldFetch: !followingNgos,
    query: `page=${page}&perPage=${perPage}&search=${searchVal}${filterData}`,
    loader: false,
  });

  const getFollowingNgos = async () => {
    setIsFollowingNgoLoading(true);
    try {
      const { data } = await ApiManager(
        "get",
        `follow/following/${userId}?role=ngo&page=${page}&perPage=${perPage}&search=${searchVal}`
      );
      const newItems = data?.response?.details?.ngo || [];
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
    if (followingNgos) {
      getFollowingNgos();
    }
  }, [page, searchVal]);

  useEffect(() => {
    if (!followingNgos && ngoData) {
      setData(
        page === 1 ? ngoData?.items : [...data, ...(ngoData?.items || [])]
      );
    }
  }, [ngoData]);

  useEffect(() => {
    if (searchVal) {
      setData([]);
      setPage(1);
    }
  }, [searchVal]);

  useEffect(() => {
    if (!ngoData?.length && page > 1) {
      setData((prevData) => [...prevData, ...(ngoData?.items || [])]);
    } else {
      setData(ngoData?.items);
    }
  }, [ngoData]);


  const handleLoadMore = () => {
    if (data?.length >= perPage && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const convertToQueryString = (formData) => {
    const queryParams = [];

    if (formData.SDGs && Array.isArray(formData.SDGs)) {
      const sdgString = formData.SDGs.map((sdg) => `sdgs[]=${sdg}`).join("&");
      queryParams.push(sdgString);
    }

    if (formData.location) {
      queryParams.push(`location=${encodeURIComponent(formData.location)}`);
    }

    return queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
  };

  const handleSearch = (data) => {
    const queryString = convertToQueryString(data);
    setFilterData(queryString);
    setVisible(false);
  };

  const onClear = () => {
    setFilterData("");
    // setData([]);
    setVisible(false);
  };

  const RenderItem = React.memo(({ item }) => (
    <TouchableOpacity
      activeOpacity={baseOpacity}
      onPress={() => navigation.push("NGOProfile", { id: item?.id })}
    >
      <Flex
        flexStyle={{
          marginTop: sizer.moderateVerticalScale(15),
        }}
        jusContent="space-between"
        algItems="center"
      >
        <Flex flexStyle={{ alignItems: "center" }}>
          <Avatar.Image source={{ uri: item?.profileImage }} />
          <View
            style={{
              marginLeft: sizer.moderateScale(15),
              width: "76%",
            }}
          >
            <Typography text={item.name} semiBold numberOfLines={1} />
            <Typography
              text={item?.about || item?.description}
              color="#757575"
              size={12}
              numberOfLines={2}
            />
          </View>
        </Flex>

        <ChevronRightBold />
      </Flex>
    </TouchableOpacity>
  ));

  return (
    <Container>
      <HeaderWithTitle label={followingNgos ? "Following NGOs" : "NGOs"} />
      <SearchField
        rightIcon
        onIconPress={() => setVisible(true)}
        value={searchVal}
        setValue={setSearchVal}
        setLoading={setTypingLoading}
        setData={setData}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={50}
      >

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item, i) => i.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            (isLoading || isFollowingNgoLoading) && data?.length && page > 1 ? (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : null
          }
          contentContainerStyle={{ flex: data?.length ? 0 : 1 }}
          initialNumToRender={perPage}
          ListEmptyComponent={
            isLoading || typingLoading || isFollowingNgoLoading ? (
              <ListSkeleton />
            ) : (
              <EmptyState message={"No NGO Found"} />
            )
          }
          getItemLayout={(_, index) => ({
            length: 70,
            offset: 70 * index,
            index,
          })}
        />
      </KeyboardAvoidingView>
      <FilterNgosBottomSheet
        isVisible={isVisible}
        setVisible={setVisible}
        onSearch={handleSearch}
        onClear={onClear}
        formData={formData}
        setFormData={setFormData}
      />
    </Container>
  );
};

export default ViewAllNgos;
