import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

import { Container, EmptyState } from "../../atom-components";
import {
  HeaderWithTitle,
  HorizontalScrollviewSpacing,
  SearchField,
} from "../../components";
import { sizer } from "../../helpers";
import { CONSTANTS } from "../../globals";
import { useFetchDealsData } from "../../hooks";
import { openToast } from "../../store/reducer";
import { CardSkeleton } from "../../components/skeleton-loaders";
import DealsCard from "./shared/deals-card";
import ApiManager from "../../helpers/api-manager";
import FilterButtons from "./shared/filter-buttons";
import format from "pretty-format";

export default function Deals({ route }) {
  const { savedDeals, heading } = route.params || {};
  const [currentCatagory, setCurrentCatagory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);
  const [typingLoading, setTypingLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false)
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.storeReducer);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const categoryId = currentCatagory === undefined ? "" : currentCatagory;
  const perPage = 20;

  const categoryQuery = categoryId.length
    && categoryId !== 'Saved Deals' && categoryId !== 'All'
    ? categoryId.map((id) => `&category[]=${id}`).join("")
    : [];

  const { dealsData, isLoading } = useFetchDealsData({
    shouldFetch: shouldFetch,
    query: `page=${page}&perPage=${perPage}&onGoing=true&savedDeals=${savedDeals || isSaved || false
      }&${categoryQuery}&search=${searchVal}&activationStatus=active`,
    loader: false,
    isFocused: isFocused,
  });

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'Saved Deals') {
      setIsSaved(true)
      setShouldFetch(true);
    }
    if (categoryId === 'All') {
      setIsSaved(false)
      setShouldFetch(true);
    }
    if (JSON.stringify(categoryId) === JSON.stringify(currentCatagory)) return;
    setData([]);
    setPage(1);
    setCurrentCatagory(categoryId);
    setShouldFetch(true);
  };

  const getCatagories = async () => {
    try {
      const { data } = await ApiManager("get", "category");
      setCategories((prevCategories) => [
        ...[{ label: "All" }, (user ? { label: 'Saved Deals' } : {})],
        ...data?.response?.details,
      ]);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  };

  const handleLoadMore = () => {
    if (data?.length >= perPage && dealsData?.meta?.totalPages > page) {
      setPage((prev) => prev + 1);
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    getCatagories();
  }, [user]);

  useEffect(() => {
    if (dealsData?.items?.length > 0) {
      // const newItems = dealsData.items.filter(
      //   (item) => !data.some((existingItem) => existingItem.id === item.id)
      // );
      // setData((prevData) => [...prevData, ...newItems]);
      setData(dealsData?.items);
    }
  }, [dealsData]);

  useEffect(() => {
    if (searchVal) {
      setData([]);
      setPage(1);
      setShouldFetch(true);
    }
  }, [searchVal]);

  return (
    <Container>
      <HeaderWithTitle label={heading || "Deals"} />
      <SearchField
        value={searchVal}
        setValue={setSearchVal}
        setShouldFetch={setShouldFetch}
        setLoading={setTypingLoading}
        setData={setData}
      />

      <View style={{ height: sizer.moderateVerticalScale(80) }}>
        <HorizontalScrollviewSpacing>
          <FilterButtons
            categories={categories}
            currentCatagory={currentCatagory}
            setCurrentCatagory={handleCategoryChange}
          />
        </HorizontalScrollviewSpacing>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data || []}
            renderItem={({ item }) => <DealsCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: dealsData?.items?.length ? 0 : 1,
              paddingBottom: 20,
            }}
            ListFooterComponent={
              isLoading && data?.length && page > 1 ? (
                <ActivityIndicator style={{ marginVertical: 20 }} />
              ) : null
            }
            ListEmptyComponent={
              isLoading || typingLoading ? (
                <CardSkeleton />
              ) : (
                <EmptyState message={"No Deals Found"} />
              )
            }
            onEndReached={handleLoadMore}
            initialNumToRender={perPage}
            maxToRenderPerBatch={perPage}
            windowSize={perPage}
            getItemLayout={(data, index) => ({
              length: 70,
              offset: 70 * index,
              index,
            })}
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
