import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";

import { Container, EmptyState } from "../../atom-components";
import {
  COLORS,
  CONSTANTS,
} from "../../globals";
import { sizer } from "../../helpers";
import {
  ConfirmAvail,
  DealsDetailHeader,
  Header,
} from "../../components";
import { useFetchDealsData } from "../../hooks";
import DealsCard from "../deals/shared/deals-card";
import DealsAvail from "../../components/custom-modal/deals-avail-modal/dealsAvail";
import { CardSkeleton } from "../../components/skeleton-loaders";
import ApiManager from "../../helpers/api-manager";
import { openToast, toggleLoader } from "../../store/reducer";
import { useDispatch } from "react-redux";
import format from "pretty-format";

const DealsDetail = ({ navigation, route }) => {
  const { id, companyId } = route.params;
  const [isVisible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  const { dealsData: dealData } = useFetchDealsData({
    shouldFetch: true,
    id: id,
    loader: true,
    loaderBackgroundWhite: true,
  });

  const { dealsData: suggestedDealsData, isLoading: suggestedDealsLoading } =
    useFetchDealsData({
      shouldFetch: !!dealData?.user?.id,
      query: `companyId=${companyId || dealData?.user?.id}&activationStatus=active&excludeDealId=${id}&onGoing=true`,
      loader: true,
      loaderBackgroundWhite: true,
    });



  const handleDealAvail = async (id) => {
    setConfirm(false);
    dispatch(toggleLoader(true));
    try {
      await ApiManager("post", `deal/avail`, {
        dealId: id,
      });
      setVisible(true);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleSave = async (id, isSaved) => {
    try {
      await ApiManager("post", `deal/save/${id}`);
      setSaved(!isSaved);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
    }
  };

  useEffect(() => {
    setSaved(dealData?.isSaved);
  }, [dealData]);

  return (
    <Container bgColor={COLORS.whiteV2} pH={0}>
      <Header back pH={14} />

      <FlatList
        data={
          suggestedDealsData?.items?.filter(
            (item) => item?.id != dealData?.id
          ) ||
          []
        }
        renderItem={({ item }) => {
          return <DealsCard item={item} mH={14} />;
        }}
        ListHeaderComponent={
          <DealsDetailHeader
            dealData={dealData}
            setConfirm={setConfirm}
            suggestedDealsData={suggestedDealsData}
            handleSave={handleSave}
            saved={saved}
            companyId={companyId}
            id={id}
          />
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

      <DealsAvail isVisible={isVisible} setVisible={setVisible} />
      <ConfirmAvail
        isVisible={confirm}
        setVisible={setConfirm}
        handleDealAvail={() => handleDealAvail(dealData?.id)}
      />
    </Container>
  );
};

export default DealsDetail;

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
    marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
    paddingBottom: sizer.moderateVerticalScale(16),
    borderBottomLeftRadius: sizer.fontScale(16),
    borderBottomRightRadius: sizer.fontScale(16),
    overflow: "hidden",
  },
  coverImg: { height: sizer.moderateVerticalScale(158), width: "100%" },

  discountView: {
    position: "absolute",
    top: sizer.moderateVerticalScale(20),
    left: sizer.moderateScale(20),
    width: sizer.moderateScale(65),
    height: sizer.moderateVerticalScale(24),
    backgroundColor: COLORS.white,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
