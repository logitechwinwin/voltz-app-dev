import { FlatList, ScrollView, View, RefreshControl } from "react-native";

import { Container, EmptyState, Flex } from "../../atom-components";
import {
  Header,
  HorizontalScrollviewSpacing,
  Stories,
  SuggestedCharityCard,
  WalletModal,
} from "../../components";
import { SuggestedNgoCard, ViewAll } from "./shared";
import { COLORS, CONSTANTS } from "../../globals";
import {
  useCheckLoginStatus,
  useFetchEventsData,
  useFetchNgoData,
  useFollowUnfollow,
} from "../../hooks";
import { sizer } from "../../helpers";
import { useCallback, useEffect, useState } from "react";
import {
  CampaignCardSkeleton,
  CharityCardSkeleton,
  NgoCardSkeleton,
} from "../../components/skeleton-loaders";
import { useIsFocused } from "@react-navigation/native";
import CampaignStatus from "../../atom-components/campaign-status";
import { useDispatch, useSelector } from "react-redux";
import { openToast } from "../../store/reducer";

const Today = ({ navigation }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { followUnfollow } = useFollowUnfollow();
  const isFocused = useIsFocused();
  const { user } = useSelector((state) => state.storeReducer);
  const { checkLoginStatus } = useCheckLoginStatus();
  const {
    ngoData,
    setNgoData,
    isLoading: ngoLoading,
    refetch: refetchNgoData,
  } = useFetchNgoData({
    shouldFetch: true,
    query: "page=1&perPage=6&exceedFollowed=true",
    byInterest: true,
    loader: false,
    isFocused: isFocused,
  });
  const {
    eventsData: charityData,
    isLoading: charityLoading,
    refetch: refetchCharityData,
  } = useFetchEventsData({
    shouldFetch: true,
    query: `page=1&perPage=5&excludeExpired=true&excludeUpcoming=true&activationStatus=active&excludeDonationComplete=true`,
    type: "charity",
    byInterest: true,
    loader: false,
    isFocused: isFocused,
  });
  const {
    eventsData: campaignData,
    isLoading: campaignLoading,
    refetch: refetchCampaignData,
  } = useFetchEventsData({
    shouldFetch: true,
    query: `page=1&perPage=5&excludeExpired=true&exceedAlreadyRegistered=false&activationStatus=active`,
    type: "campaign",
    byInterest: true,
    loader: false,
    isFocused: isFocused,
  });

  const handleFollow = async (id, action) => {
    try {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
      const success = await followUnfollow(id, action);
      if (success) {
        setNgoData((prev) => ({
          ...prev,
          items: prev.items.map((obj) =>
            obj.id === id ? { ...obj, followed: action === "follow" } : obj
          ),
        }));
      }
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error);
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
    }
  };

  const filteredCharityData =
    charityData?.items?.filter((item) => {
      const campaignStatus = CampaignStatus(item);
      const isExpired = campaignStatus?.status === "Expired";
      const isDonationRequiredEnd = item?.donationRequired
        ? item?.donationReceived >= item?.donationRequired
        : false;

      return !(isExpired || isDonationRequiredEnd);
    }) || [];

  const renderItem =
    (navigateTo) =>
    ({ item }) => {
      return (
        <SuggestedCharityCard
          data={item}
          handlePress={() => navigateTo(item.id)}
          setDonationSuccess={setDonationSuccess}
          small={false}
        />
      );
    };

  const onRefresh = useCallback(() => {
    refetchCharityData(true);
    refetchCampaignData(true);
    refetchNgoData(true);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (donationSuccess) {
      refetchCharityData();
      refetchCampaignData();
      setDonationSuccess(false);
    }
  }, [donationSuccess]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: COLORS.white }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
        />
      }
    >
      <Container pB={16} pH={0}>
        <View style={{ paddingHorizontal: sizer.moderateScale(16) }}>
          <Header walletIcon setShowWallet={setShowWallet} />
          {checkLoginStatus(false) && <Stories />}

          <ViewAll
            label="Suggested NGOs"
            fontBold
            onPress={() => {
              navigation.navigate("ViewAllNgos");
            }}
          />
          <HorizontalScrollviewSpacing>
            <Flex gap={30}>
              {ngoLoading && !ngoData?.items?.length ? (
                <NgoCardSkeleton />
              ) : (
                ngoData?.items?.map((item, i) => (
                  <SuggestedNgoCard
                    key={i}
                    item={item}
                    handleFollowUnFollow={handleFollow}
                    isLoading={loadingStates[item.id]}
                  />
                ))
              )}
            </Flex>
          </HorizontalScrollviewSpacing>
          {!ngoData?.items?.length && !ngoLoading && (
            <EmptyState message="No suggested ngo found" />
          )}

          <ViewAll
            label="Recommended Fundraising"
            color={COLORS.text}
            leftIcon
            onPress={() => {
              navigation.navigate("ViewAllCharity");
            }}
            showViewAll={!!filteredCharityData?.length}
          />
        </View>

        <FlatList
          data={filteredCharityData || []}
          renderItem={renderItem((id) =>
            navigation.navigate("CharityProfile", { id })
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: (filteredCharityData || [])?.length ? 0 : 1,
            paddingHorizontal: sizer.moderateScale(16),
          }}
          ListEmptyComponent={
            charityLoading ? (
              <CharityCardSkeleton />
            ) : (
              <EmptyState message="No data found" />
            )
          }
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />
        <View style={{ paddingHorizontal: sizer.moderateScale(16) }}>
          <ViewAll
            label="Recommended Events"
            color={COLORS.text}
            leftIcon
            onPress={() => {
              navigation.navigate("ViewAllCampaigns");
            }}
            showViewAll={!!campaignData?.items?.length}
          />
        </View>
        <FlatList
          data={campaignData?.items || []}
          renderItem={renderItem((id) =>
            navigation.navigate("CampaignProfile", { id, source: 'today' })
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: (campaignData?.items || [])?.length ? 0 : 1,
            paddingHorizontal: sizer.moderateScale(16),
          }}
          ListEmptyComponent={
            campaignLoading ? (
              <CampaignCardSkeleton />
            ) : (
              <EmptyState message="No Events found" />
            )
          }
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />
      </Container>
      <WalletModal isVisible={showWallet} setVisible={setShowWallet} />
    </ScrollView>
  );
};

export default Today;
