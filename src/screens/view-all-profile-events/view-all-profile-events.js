import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import { HeaderWithTitle, SearchField } from "../../components";
import { sizer } from "../../helpers";

import RenderItem from "../../components/swiper-components/followers/renderItem";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ApiManager from "../../helpers/api-manager";
import { openToast } from "../../store/reducer";
import { ListSkeleton } from "../../components/skeleton-loaders";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { baseOpacity, COLORS } from "../../globals";
import { CampaignNoIcon, ChevronRightBold } from "../../assets";
import format from "pretty-format";
import CampaignStatus from "../../atom-components/campaign-status";
import { formatNumber } from "../../utils";

const ViewAllProfileEvents = ({ route, navigation }) => {
  const { userId, type = null } = route?.params ?? {};
  const [loader, setLoader] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [typingLoading, setTypingLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const perPage = 20;

  const getEventsData = async () => {
    const apiUrl = () => {
      if (type === "volunteeredTo") {
        return `events?page=${page}&perPage=${perPage}&search=${searchVal}&userId=${userId}&volunteeredTo=true&exceedAlreadyRegistered=false`;
      }
      if (type == "donatedTo") {
        return `events?page=${page}&perPage=${perPage}&search=${searchVal}&userId=${userId}&exceedAlreadyRegistered=false&donatedTo=true`;
      }
    };

    setLoader(true);
    try {
      const { data } = await ApiManager("get", apiUrl());
      const newItems = data?.response?.details?.items || [];
      setTotalPages(data?.response?.details?.meta?.totalPages || 1);
      setData(page === 1 ? newItems : [...data, ...newItems]);
    } catch (error) {
      console.log("🚀 ~ getEventsData ~ error:", error?.response?.data);
      dispatch(
        openToast({
          message: error.response?.data?.message,
        })
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getEventsData();
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
    const campaignStatus = CampaignStatus(item);

    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => navigation.navigate("CampaignProfile", { id: item?.id })}
      >
        <Flex
          flexStyle={{ marginTop: sizer.moderateVerticalScale(15) }}
          algItems="center"
          jusContent="space-between"
        >
          <Flex flexStyle={{ alignItems: "center" }}>
            <Avatar.Image source={{ uri: item.bannerImage }} />
            <View style={{ marginLeft: sizer.moderateScale(15), width: "56%" }}>
              <Typography text={item.title} numberOfLines={1} semiBold />
              {item?.type == "campaign" ? (
                <Typography
                  color={campaignStatus?.color}
                  semiBold
                  size={14}
                  mT={3}
                >
                  {campaignStatus?.status}
                </Typography>
              ) : (
                <Typography
                  text={item.description}
                  color={COLORS.greyV6}
                  size={12}
                  numberOfLines={2}
                />
              )}
            </View>
          </Flex>

          <Flex algItems="center" flexStyle={styles.rightIcons}>
            {item?.type == "campaign" && (
              <Flex flexStyle={styles.rightChip} algItems="center" gap={4}>
                <Typography text={formatNumber(item.voltzPerHour)} />
                <CampaignNoIcon />
              </Flex>
            )}
            <ChevronRightBold />
          </Flex>
        </Flex>
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <HeaderWithTitle
        label={type == "volunteeredTo" ? "Volunteered To" : "Donated To"}
      />
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loader && data?.length && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        contentContainerStyle={{ flex: data?.length ? 0 : 1 }}
        initialNumToRender={perPage}
        ListEmptyComponent={
          typingLoading || loader ? (
            <ListSkeleton />
          ) : (
            <EmptyState message={"No Data Found"} />
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

export default ViewAllProfileEvents;

const styles = StyleSheet.create({
  rightChip: {
    width: sizer.moderateScale(68),
    height: sizer.moderateVerticalScale(42),
    backgroundColor: "#F2F2F7CC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: sizer.moderateScale(22),
  },
  rightIcons: {
    position: "absolute",
    right: 0,
  },
});
