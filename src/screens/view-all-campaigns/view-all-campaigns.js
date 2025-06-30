import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import { HeaderWithTitle, SearchField } from "../../components";
import { sizer } from "../../helpers";
import { baseOpacity } from "../../globals";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { ChevronRightBold } from "../../assets";
import { useFetchEventsData } from "../../hooks";
import { ListSkeleton } from "../../components/skeleton-loaders";
import CampaignStatus from "../../atom-components/campaign-status";

const ViewAllCampaigns = ({ route }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [typingLoading, setTypingLoading] = useState(false);
  const navigation = useNavigation();
  const perPage = 20;
  const { ngoId } = route?.params ?? {};
  let path = `page=${page}&perPage=${perPage}&search=${searchVal}&excludeExpired=true&activationStatus=active`;
  if (ngoId) path += `&ngoId=${ngoId}`;
  const { eventsData: campaignData, isLoading } = useFetchEventsData({
    shouldFetch: true,
    query: path,
    loader: false,
    type: "campaign",
  });

  useEffect(() => {
    setData(
      searchVal
        ? campaignData?.items
        : // : [...data, ...(campaignData?.items || [])]
          [...(campaignData?.items || [])]
    );
  }, [campaignData]);

  useEffect(() => {
    if (searchVal) {
      setData([]);
      setPage(1);
    }
  }, [searchVal]);

  const handleLoadMore = () => {
    if (data?.length >= perPage && campaignData?.meta?.totalPages !== page) {
      setPage((prev) => prev + 1);
    }
  };
  const renderItem = ({ item }) => {
    const campaignStatus = CampaignStatus(item);

    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => {
          navigation.navigate("CampaignProfile", { id: item?.id });
        }}
      >
        <Flex
          flexStyle={{ marginTop: sizer.moderateVerticalScale(15) }}
          algItems="center"
          jusContent="space-between"
        >
          <Flex flexStyle={{ alignItems: "center" }}>
            <Avatar.Image source={{ uri: item?.bannerImage }} />
            <View style={{ marginLeft: sizer.moderateScale(15), width: "70%" }}>
              <Typography text={item.title} semiBold numberOfLines={1} />
              <Typography
                color={campaignStatus?.color}
                semiBold
                size={14}
                mT={3}
              >
                {campaignStatus?.status}
              </Typography>
            </View>
          </Flex>

          <Flex
            algItems="center"
            flexStyle={{
              position: "absolute",
              right: 0,
            }}
          >
            <ChevronRightBold />
          </Flex>
        </Flex>
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <HeaderWithTitle label="Events" />
      <View style={{ marginBottom: sizer.moderateVerticalScale(12) }}>
        <SearchField
          value={searchVal}
          setValue={setSearchVal}
          setLoading={setTypingLoading}
          setData={setData}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && data?.length && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        contentContainerStyle={{ flex: data?.length ? 0 : 1 }}
        initialNumToRender={perPage}
        ListEmptyComponent={
          isLoading || typingLoading ? (
            <ListSkeleton />
          ) : (
            <EmptyState message={"No Campaign Found"} />
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

const styles = StyleSheet.create({
  emptyData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ViewAllCampaigns;
