import { View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { memo, useEffect, useState } from "react";

import { ViewAll } from "../../../screens/today/shared";
import { FollowingCard, HorizontalFlatlist } from "../../index";
import { openToast } from "../../../store/reducer";
import ApiManager from "../../../helpers/api-manager";
import { ActivityIndicator } from "react-native-paper";
import { sizer } from "../../../helpers";
import { useFollowUnfollow } from "../../../hooks";
import format from "pretty-format";

const Following = ({ userId, activeTab }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { followUnfollow } = useFollowUnfollow();
  const [loadingStates, setLoadingStates] = useState({});
  const handleShowFollowing = async () => {
    setLoading(true);
    try {
      const { data } = await ApiManager(
        "get",
        `follow/following/${userId}?page=1&perPage=99999999999`
      );

      const updatedData = {
        ...data?.response?.details,
        ngo: (data?.response?.details?.ngo || []).map((ngoItem) => ({
          ...ngoItem,
          followed: true,
        })),
        company: (data?.response?.details?.company || []).map(
          (companyItem) => ({
            ...companyItem,
            followed: true,
          })
        ),
        volunteer: (data?.response?.details?.volunteer || []).map(
          (volunteerItem) => ({
            ...volunteerItem,
            followed: true,
          })
        ),
      };

      setData(updatedData);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (id, action) => {
    console.log("hih");

    try {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
      const success = await followUnfollow(id, action);
      console.log("🚀 ~ handleFollow ~ success:", success);

      if (success) {
        const updatedData = {
          ...data,
          ngo: data.ngo.map((obj) =>
            obj.id === id ? { ...obj, followed: action === "follow" } : obj
          ),
          company: data.company.map((obj) =>
            obj.id === id ? { ...obj, followed: action === "follow" } : obj
          ),
          volunteer: data.volunteer.map((obj) =>
            obj.id === id ? { ...obj, followed: action === "follow" } : obj
          ),
        };
        setData(updatedData);
      }

      setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error);
    }
  };

  useEffect(() => {
    (isFocused || activeTab == 4) && handleShowFollowing();
  }, [isFocused, activeTab == 4]);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: sizer.moderateVerticalScale(60),
        }}
      >
        <ActivityIndicator size={sizer.fontScale(36)} />
      </View>
    );
  }

  return (
    <View>
      <ViewAll
        label="NGOs"
        fontBold
        mt={24}
        showViewAll={data?.ngo?.length >= 1 ? true : false}
        onPress={() => {
          navigation.navigate("ViewAllNgos", {
            followingNgos: true,
            userId: userId,
          });
        }}
      />
      <HorizontalFlatlist
        contentContainerStyle={{
          flex: data?.ngo?.length ? 0 : 1,
        }}
        data={(data?.ngo || []).slice(0, 5)}
        emptyText="No NGO Found"
        renderItem={({ item }) => (
          <FollowingCard
            handleFollowUnFollow={handleFollow}
            isLoading={loadingStates[item.id]}
            navigationRoute="NGOProfile"
            item={item}
            ngo
          />
        )}
      />

      <ViewAll
        label="Companies"
        fontBold
        mt={24}
        onPress={() => {
          navigation.navigate("ViewAllCompanies", { userId: userId });
        }}
        showViewAll={data?.company?.length >= 1 ? true : false}
      />

      <HorizontalFlatlist
        contentContainerStyle={{
          flex: data?.company?.length ? 0 : 1,
          marginTop: 12,
        }}
        data={(data?.company || []).slice(0, 5)}
        renderItem={({ item }) => (
          <FollowingCard
            handleFollowUnFollow={handleFollow}
            isLoading={loadingStates[item.id]}
            navigationRoute="CompanyProfile"
            item={item}
            community
          />
        )}
        emptyText="No Company Found"
      />

      <ViewAll
        label="Volunteers"
        fontBold
        mt={24}
        onPress={() => {
          navigation.navigate("ViewAllVolunteers", { userId: userId });
        }}
        showViewAll={data?.volunteer?.length >= 1 ? true : false}
      />

      <HorizontalFlatlist
        contentContainerStyle={{
          flex: data?.volunteer?.length ? 0 : 1,
          marginTop: 12,
        }}
        data={(data?.volunteer || []).slice(0, 5)}
        renderItem={({ item }) => (
          <FollowingCard
            handleFollowUnFollow={handleFollow}
            isLoading={loadingStates[item.id]}
            navigationRoute="VolunteerProfile"
            item={item}
          />
        )}
        emptyText="No Volunteer Found"
      />
    </View>
  );
};

export default memo(Following);
