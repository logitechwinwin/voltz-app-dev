import { FlatList, StyleSheet, View } from "react-native";
import { CompanyDetailHeader, Header } from "../../components";
import { Container, EmptyState } from "../../atom-components";
import { COLORS } from "../../globals";
import DealsCard from "../deals/shared/deals-card";
import { openToast, toggleLoader } from "../../store/reducer";
import ApiManager from "../../helpers/api-manager";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchDealsData, useFollowUnfollow } from "../../hooks";
import { CardSkeleton } from "../../components/skeleton-loaders";
import format from "pretty-format";

const CompanyProfile = ({ navigation, route }) => {
  const { id } = route?.params ?? {};
  const [companyData, setCompanyData] = useState({});
  const [follow, setFollow] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState({});
  const dispatch = useDispatch();
  const { followUnfollow, isLoading } = useFollowUnfollow();
  const { dealsData: suggestedDealsData, isLoading: suggestedDealsLoading } =
    useFetchDealsData({
      shouldFetch: true,
      query: `companyId=${id}&activationStatus=active&onGoing=true`,
      loader: true,
      loaderBackgroundWhite: true,
    });

  const handleGetCompany = async () => {
    dispatch(toggleLoader({ loader: true, background: "white" }));
    try {
      let { data } = await ApiManager("get", `company/${id}`);
      setCompanyData(data?.response?.details);
      setFollow(data?.response?.details?.isFollowed);
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(openToast({ message: error?.response?.data?.message }));
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
      navigation.goBack();
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {
    getGoalAcheived(id);
  }, []);

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
    handleGetCompany();
  }, [id]);
  return (
    <Container bgColor={COLORS.whiteV2} pT={13} pH={0}>
      <Header back pH={16} />
      <FlatList
        data={suggestedDealsData?.items || []}
        renderItem={({ item }) => {
          return <DealsCard item={item} mH={14} />;
        }}
        ListHeaderComponent={
          <View>
            <CompanyDetailHeader
              companyData={companyData}
              follow={follow}
              isLoading={isLoading}
              handleFollow={handleFollow}
              goalAchieved={goalAchieved}
              id={id}
            />
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: suggestedDealsData?.items?.length ? 0 : 1,
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          suggestedDealsLoading ? (
            <CardSkeleton />
          ) : (
            <EmptyState
              message="No Suggested Deals Found"
              width={150}
              height={150}
            />
          )
        }
        // windowSize={9}
        getItemLayout={(data, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
      />
    </Container>
  );
};

export default CompanyProfile;

const styles = StyleSheet.create({});
