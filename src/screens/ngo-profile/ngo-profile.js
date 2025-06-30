import { ScrollView, StyleSheet, View } from "react-native";
import {
  FollowingCard,
  Header,
  HorizontalScrollviewSpacing,
  LikeAndShare,
  NGOProfileBottomSheet,
  OutlineButton,
  ProfileHeader,
  ProfileHeaderStatus,
  ProfilePartnerAvatars,
  SuggestedCharityCard,
} from "../../components";
import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import { sizer } from "../../helpers";
import {
  COLORS,
  CONSTANTS,
  placeholder_cover_img,
  placeholder_profile_img,
} from "../../globals";
import {
  ProfileCalendarIcon,
  ProfileLoactionIcon,
  ProfileMessageIcon,
  VerticalEllipsis,
} from "../../assets";
import { ViewAll } from "../today/shared";
import { useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { openToast, toggleLoader } from "../../store/reducer";
import {
  useCheckLoginStatus,
  useFetchEventsData,
  useFetchNgoData,
  useFollowUnfollow,
} from "../../hooks";
import format from "pretty-format";
import moment from "moment";
import { useEffect, useState } from "react";
import ApiManager from "../../helpers/api-manager";
import { onShareLink, resetToFirstScreen } from "../../utils";

export default function NGOProfile({ route }) {
  const { id } = route.params ?? {};
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [communityData, setCommunityData] = useState([]);
  const [goalAchieved, setGoalAchieved] = useState({});

  const getGoalAcheived = async (id) => {
    dispatch(toggleLoader({ loader: true, background: "white" }));
    try {
      const { data } = await ApiManager("get", `users/${id}/goals-achieved`);
      setGoalAchieved(data?.response?.details);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
      navigation.goBack();
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {
    getGoalAcheived(id);
  }, []);

  const { checkLoginStatus } = useCheckLoginStatus();
  const isFocused = useIsFocused();
  const { followUnfollow, isLoading } = useFollowUnfollow();
  const { ngoData, setNgoData } = useFetchNgoData({
    shouldFetch: true,
    id: id,
    loader: true,
    loaderBackgroundWhite: true,
  });
  const { eventsData: charityData } = useFetchEventsData({
    shouldFetch: true,
    query: `ngoId=${id}&page=1&perPage=6&&excludeUpcoming=true&excludeDonationComplete=true&excludeExpired=true&exceedAlreadyRegistered=false&activationStatus=active`,
    type: "charity",
    byInterest: false,
    loaderBackgroundWhite: true,
    isFocused: isFocused,
  });
  const { eventsData: campaignData } = useFetchEventsData({
    shouldFetch: true,
    query: `ngoId=${id}&page=1&perPage=6&excludeExpired=true&exceedAlreadyRegistered=false&activationStatus=active`,
    type: "campaign",
    byInterest: false,
    loaderBackgroundWhite: true,
    isFocused: isFocused,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGetCommunities = async () => {
    setLoading(true);
    try {
      let { data } = await ApiManager(
        "get",
        `community?page=1&perPage=5&userId=${id}&myCommunities=true`
      );
      setCommunityData(data?.response?.details);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (id, action) => {
    if (checkLoginStatus()) {
      const success = await followUnfollow(id, action);
      if (success) {
        const updatedNgoData = {
          ...ngoData,
          followed: action === "follow",
        };
        setNgoData(updatedNgoData);
      }
    }
  };

  useEffect(() => {
    handleGetCommunities();
  }, []);

  return (
    <>
      <Header back pH={16} />
      <ScrollView>
        <Container bgColor={COLORS.whiteV2}>
          <ProfileHeader
            coverImg={{ uri: ngoData?.bannerImage || placeholder_cover_img }}
            profileImg={{
              uri: ngoData?.profileImage || placeholder_profile_img,
            }}
          >
            <Typography
              text={ngoData?.name}
              size={24}
              bold
              color={COLORS.blackV2}
            />
            <Flex algItems="center" jusContent="space-between">
              <View style={{ width: "80%" }}>
                {/* <Flex
                  mt={6}
                  gap={2}
                  flexStyle={{ width: "100%" }}
                  algItems={"center"}
                >
                  <ProfileCalendarIcon />
                  <Typography
                    text={`${moment(ngoData?.startDate).format(
                      "MMMM D, YYYY"
                    )} | ${moment(ngoData?.startDate).format(
                      "HH:mm"
                    )} – ${moment(ngoData?.endDate).format("HH:mm")}`}
                    size={12}
                    color={COLORS.blackV2}
                  />
                </Flex> */}

                <Flex
                  mt={6}
                  gap={6}
                  flexStyle={{ width: "100%" }}
                >
                  <ProfileLoactionIcon style={{ marginTop: 2 }} />
                  <Typography
                    text={`${ngoData?.country}, ${ngoData?.city}, ${ngoData?.state}`}
                    size={12}
                    color={COLORS.blackV2}
                    numberOfLines={2}
                  />
                </Flex>
              </View>
              <LikeAndShare
                sharePress={() =>
                  onShareLink({
                    page: "ngo",
                    id: id,
                    message: "Check out this NGO in voltz",
                  })
                }
              />
            </Flex>

            <Flex gap={8}>
              <OutlineButton
                style={{ height: sizer.moderateVerticalScale(31) }}
                icon={<ProfileMessageIcon />}
                label="Message"
                onPress={() => {
                  checkLoginStatus() &&
                    navigation.navigate("ChatScreen", {
                      userId: ngoData?.id,
                      name: ngoData?.name,
                    });
                }}
              />
              {!ngoData?.followed && (
                <OutlineButton
                  style={{ height: sizer.moderateVerticalScale(31) }}
                  label="Follow"
                  onPress={() => {
                    handleFollow(ngoData?.id, "follow");
                  }}
                  isLoading={isLoading}
                />
              )}
              {ngoData?.followed && (
                <OutlineButton
                  style={{
                    height: sizer.moderateVerticalScale(31),
                    flex: 0.12,
                  }}
                  label={<VerticalEllipsis />}
                  onPress={() => {
                    checkLoginStatus() && setVisible(true);
                  }}
                />
              )}
            </Flex>

            <ProfileHeaderStatus goalAchieved={goalAchieved} />
          </ProfileHeader>

          {ngoData?.about && <Typography text="About" mT={22} semiBold size={18} color="#3C3F43" />}
          <Typography
            text={ngoData?.about}
            ellipsizeMode
            numberOfLines={10}
            size={12}
            color="#27272E99"
            LineHeight={18}
          />

          {/* <ViewAll
            label="Partners"
            mt={10}
            fontBold
            onPress={() => {
              navigation.navigate("ViewAllPartners");
            }}
          />
          <ProfilePartnerAvatars mt={15} /> */}

          {!!charityData?.items?.length && (
            <>
              <ViewAll
                label="Charities"
                mt={10}
                fontBold
                onPress={() => {
                  navigation.navigate("ViewAllCharity", { ngoId: id });
                }}
              />
              <HorizontalScrollviewSpacing>
                <Flex gap={8}>
                  {charityData?.items?.map((obj, i) => (
                    <SuggestedCharityCard
                      data={obj}
                      key={i}
                      handlePress={() => {
                        navigation.navigate("CharityProfile", { id: obj?.id });
                      }}
                    />
                  ))}
                </Flex>
              </HorizontalScrollviewSpacing>
            </>
          )}

          {!!campaignData?.items?.length && (
            <>
              <ViewAll
                label="Campaigns"
                mt={10}
                fontBold
                onPress={() => {
                  navigation.navigate("ViewAllCampaigns", { ngoId: id });
                }}
              />
              <HorizontalScrollviewSpacing>
                <Flex gap={8}>
                  {campaignData?.items?.map((obj, i) => (
                    <SuggestedCharityCard
                      data={obj}
                      key={i}
                      handlePress={() => {
                        navigation.navigate("CampaignProfile", { id: obj?.id });
                      }}
                    />
                  ))}
                </Flex>
              </HorizontalScrollviewSpacing>
            </>
          )}
          <ViewAll
            label="Communities by this NGO"
            mt={20}
            fontBold
            style={styles.background}
            onPress={() => navigation.navigate('Community', { userId: id })}
          />
          {!communityData.length && !loading && (
            <EmptyState message="No Community Found" />
          )}
          <HorizontalScrollviewSpacing>
            <Flex gap={8} mb={47}>
              {communityData?.map((item, itemIndex) => (
                <FollowingCard
                  item={item}
                  key={itemIndex}
                  navigationRoute={"CommunityDetails"}
                  join
                />
              ))}
            </Flex>
          </HorizontalScrollviewSpacing>

          <NGOProfileBottomSheet
            isVisible={isVisible}
            setVisible={setVisible}
            onPress={handleFollow}
            ngoData={ngoData}
          />
        </Container>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginHorizontal: -CONSTANTS.containerPaddingX,
    height: sizer.moderateVerticalScale(395),
    marginTop: sizer.moderateVerticalScale(16),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
});
