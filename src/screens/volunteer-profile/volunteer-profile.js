import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Container, Flex, Typography } from "../../atom-components";
import {
  COLORS,
  CONSTANTS,
  baseOpacity,
  placeholder_cover_img,
  placeholder_profile_img,
} from "../../globals";
import {
  About,
  Events,
  Followers,
  Following,
  Header,
  OutlineButton,
  ProfileHeader,
  ProfileHeaderStatus,
  ReanimatedTabs,
  SavedDeals,
  Target,
} from "../../components";
import {
  ProfileLoactionIcon,
  ProfileMessageIcon,
  ShareIconV2,
} from "../../assets";
import { sizer } from "../../helpers";
import { openToast, setUserFollow, toggleLoader } from "../../store/reducer";
import format from "pretty-format";
import ApiManager from "../../helpers/api-manager";
import { useEffect, useState } from "react";
import { useCheckLoginStatus, useFollowUnfollow } from "../../hooks";
import { ActivityIndicator } from "react-native-paper";
import { onShareLink } from "../../utils";
import { TabActions } from "@react-navigation/native";

const VolunteerProfile = ({ navigation, route }) => {
  const [publicProfile, setPublicProfile] = useState(null);
  const [goalAchieved, setGoalAchieved] = useState({});
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.storeReducer);
  const { followUnfollow, isLoading } = useFollowUnfollow();
  const { checkLoginStatus } = useCheckLoginStatus();
  const { details: profile } = user ?? {};
  const { id = profile?.id } = route?.params ?? {};

  const isMyProfile = id == profile?.id;
  const profileData = isMyProfile ? profile : publicProfile;

  const getPublicVolunteer = async (id) => {
    dispatch(toggleLoader({ loader: true, background: "white" }));
    try {
      const { data } = await ApiManager("get", `users/${id}`);
      setPublicProfile(data?.response?.details);
      setFollow(data?.response?.details?.isFollowed);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
      navigation.goBack();
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const getGoalAcheived = async (id) => {
    dispatch(toggleLoader({ loader: true, background: "white" }));
    try {
      const { data } = await ApiManager("get", `users/${id}/goals-achieved`);
      setGoalAchieved(data?.response?.details);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
      // navigation.goBack();
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleFollow = async (id, action) => {
    try {
      const success = await followUnfollow(id, action);
      if (success) {
        setFollow(action == "follow");
      }
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error);
    }
  };

  useEffect(() => {
    if (!isMyProfile && id) {
      getPublicVolunteer(id);
    }
  }, []);

  useEffect(() => {
    if (profileData?.id) {
      getGoalAcheived(profileData?.id);
    }
  }, [profileData?.id]);

  const TABS = [
    {
      label: "About",
      Component: (props) => (
        <About
          isMyProfile={isMyProfile}
          profileData={profileData}
          userId={profileData?.id}
          {...props}
        />
      ),
    },
    {
      label: "Campaigns",
      Component: (props) => <Events userId={profileData?.id} {...props} />,
    },
    {
      label: "Targets",
      Component: (props) => (
        <Target isMyProfile={isMyProfile} userId={profileData?.id} {...props} />
      ),
    },
    {
      label: "Followers",
      Component: (props) => <Followers userId={profileData?.id} {...props} />,
    },
    {
      label: "Following",
      Component: (props) => <Following userId={profileData?.id} {...props} />,
    },
    {
      label: "Saved Deals",
      Component: (props) => <SavedDeals userId={profileData?.id} {...props} />,
    },
  ];

  if (!isMyProfile && !publicProfile) {
    return (
      <Container bgColor={COLORS.whiteV2} pH={0} style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Container>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header back rightIcon={isMyProfile} pH={16} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
      >
        <Container bgColor={COLORS.whiteV2} pH={0}>
          <View
            style={{
              paddingHorizontal: sizer.moderateScale(
                CONSTANTS.containerPaddingX
              ),
            }}
          >
            <ProfileHeader
              profileImg={{
                uri: profileData?.profileImage || placeholder_profile_img,
              }}
              coverImg={{
                uri: profileData?.bannerImage || placeholder_cover_img,
              }}
              user={profile}
            >
              <Typography
                text={profileData?.firstName + " " + profileData?.lastName}
                bold
                size={24}
              />
              {profileData?.country && (
                <Flex mt={6} gap={6}>
                  <ProfileLoactionIcon style={{ marginTop: 2 }} />
                  <Typography
                    text={`${profileData?.country}, ${profileData?.state}, ${profileData?.city}`}
                    size={12}
                    color={COLORS.blackV2}
                  />
                </Flex>
              )}

              <Flex mt={8} gap={6} algItems="center">
                {isMyProfile ? (
                  <OutlineButton
                    style={styles.outlineBtn}
                    label="Edit Profile"
                    onPress={() => navigation.navigate("VolunteerProfileEdit")}
                    mt={0}
                  />
                ) : (
                  <>
                    <OutlineButton
                      style={styles.outlineBtn}
                      icon={<ProfileMessageIcon />}
                      onPress={() =>
                        navigation.navigate("ChatScreen", {
                          userId: profileData?.id,
                          name:
                            profileData.firstName + " " + profileData?.lastName,
                        })
                      }
                      mt={0}
                    />
                    <OutlineButton
                      active={follow}
                      isLoading={isLoading}
                      style={{ height: sizer.moderateVerticalScale(32) }}
                      label={follow ? "Following" : "Follow"}
                      mt={0}
                      onPress={() => {
                        handleFollow(
                          profileData?.id,
                          follow ? "un-follow" : "follow"
                        );
                      }}
                    />
                  </>
                )}
              </Flex>

              <ProfileHeaderStatus
                volunteerProfile={true}
                profile={profileData}
                goalAchieved={goalAchieved}
              />
            </ProfileHeader>
          </View>
          <ReanimatedTabs TABS={TABS} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VolunteerProfile;

const styles = StyleSheet.create({
  outlineBtn: { height: sizer.moderateVerticalScale(32) },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    // flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.whiteV2,
  },
});
