import { memo, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

import { ViewAll } from "../../../screens/today/shared";
import FilterButtons from "../../../screens/deals/shared/filter-buttons";
import HorizontalScrollviewSpacing from "../../horizontal-scrollview-spacing/horizontal-scrollview-spacing";
import DealsCard from "../../../screens/deals/shared/deals-card";
import { useFetchDealsData } from "../../../hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CardSkeleton } from "../../skeleton-loaders";
import { EmptyState, Flex, Typography } from "../../../atom-components";
import ApiManager from "../../../helpers/api-manager";
import { sizer } from "../../../helpers";
import { SuggestedCharityCard } from "../../index";
import { CONSTANTS } from "../../../globals";

const SavedDeals = ({ activeTab, userId }) => {

  const [categories, setCategories] = useState([]);
  const [currentCatagory, setCurrentCatagory] = useState("");
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const categoryId = currentCatagory === undefined ? "" : currentCatagory;
  const categoryQuery = categoryId.length
    ? categoryId.map((id) => `&category[]=${id}`).join("")
    : [];

  const {
    dealsData,
    isLoading,
    refetch: setDealsData,
  } = useFetchDealsData({
    shouldFetch: activeTab == 5,
    query: `page=1&perPage=5&onGoing=true&savedDeals=true&${categoryQuery}`,
    loader: false,
    isFocused: isFocused,
  });

  const getCatagories = async () => {
    try {
      const { data } = await ApiManager("get", "category");
      setCategories((prevCategories) => [
        ...[{ label: "All" }],
        ...data?.response?.details,
      ]);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
    }
  };

  const handleCategoryChange = (categoryId) => {
    setDealsData([]);
    setCurrentCatagory(categoryId);
  };

  useEffect(() => {
    activeTab == 5 && getCatagories();
  }, [activeTab]);

  return (
    <ScrollView >
      <View style={{ paddingHorizontal: sizer.moderateScale(14) }}>
        <ViewAll
          label="Saved Deals"
          fontBold
          mt={10}
          mb={-10}
          onPress={() =>
            navigation.navigate("Deals", {
              savedDeals: true,
              heading: "Saved Deals",
            })
          }
        />
      </View>
      <View>
        <HorizontalScrollviewSpacing>
          <FilterButtons
            categories={categories}
            currentCatagory={currentCatagory}
            setCurrentCatagory={handleCategoryChange}
          />
        </HorizontalScrollviewSpacing>
      </View>
      <View style={{ paddingHorizontal: sizer.moderateScale(14) }}>
        {isLoading && !dealsData?.items?.length ? (
          <CardSkeleton />
        ) : (
          dealsData?.items?.map((item, index) => (
            <DealsCard key={index} item={item} />
          ))
        )}

        {!dealsData?.items?.length && !isLoading && (
          <EmptyState message="No Deals Found" />
        )}
      </View>
    </ScrollView>
  );
};

export default memo(SavedDeals);
