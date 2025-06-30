import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { ViewAll } from "../../screens/today/shared";
import { EmptyState, Flex } from "../../atom-components";
import { HorizontalScrollviewSpacing, SuggestedCharityCard } from "../index";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ApiManager from "../../helpers/api-manager";
import { openToast } from "../../store/reducer";
import { CharityCardSkeleton } from "../skeleton-loaders";
import format from "pretty-format";

const Events = ({ userId, activeTab }) => {
  const [eventsData, setEventsData] = useState({
    volunteeredTo: [],
    donatedTo: [],
  });
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      if (isFocused || activeTab == 1) {
        setLoader(true);
        try {
          const [volunteeredTo, donatedTo] = await Promise.all([
            ApiManager(
              "get",
              `events?page=1&userId=${userId}&volunteeredTo=true&exceedAlreadyRegistered=false`
            ),
            ApiManager(
              "get",
              `events?page=1&userId=${userId}&exceedAlreadyRegistered=false&donatedTo=true`
            ),
          ]);
          setEventsData({
            volunteeredTo: volunteeredTo.data.response.details?.items,
            donatedTo: donatedTo.data.response.details?.items,
          });
        } catch (error) {
          console.log("🚀 ~ fetchData ~ error:", error?.response?.data);
          dispatch(openToast({ message: error.response.data.message }));
        } finally {
          setLoader(false);
        }
      }
    };
    fetchData();
  }, [isFocused, activeTab]);

  return (
    <>
      <ViewAll
        label="Donated to"
        fontBold
        showViewAll={eventsData?.donatedTo?.length >= 1 ? true : false}
        onPress={() => {
          navigation.navigate("ViewAllProfileEvents", {
            userId: userId,
            type: "donatedTo",
          });
        }}
      />

      <HorizontalScrollviewSpacing>
        <Flex gap={8} mb={8}>
          {loader && !eventsData?.donatedTo?.length ? (
            <CharityCardSkeleton />
          ) : (
            eventsData?.donatedTo?.slice(0, 6)?.map((obj, i) => (
              <SuggestedCharityCard
                data={obj}
                key={i}
                handlePress={() => {
                  navigation.push(
                    obj?.type == "charity"
                      ? "CharityProfile"
                      : "CampaignProfile",
                    { id: obj?.id }
                  );
                }}
              />
            ))
          )}
        </Flex>
      </HorizontalScrollviewSpacing>
      {!eventsData?.donatedTo?.length && !loader && (
        <EmptyState message="No Data Found" />
      )}

      <ViewAll
        label="Volunteered to"
        fontBold
        mt={24}
        showViewAll={eventsData?.volunteeredTo?.length >= 1 ? true : false}
        onPress={() => {
          navigation.navigate("ViewAllProfileEvents", {
            userId: userId,
            type: "volunteeredTo",
          });
        }}
      />
      <HorizontalScrollviewSpacing>
        <Flex gap={8} mb={8}>
          {loader && !eventsData?.volunteeredTo?.length ? (
            <CharityCardSkeleton />
          ) : (
            eventsData?.volunteeredTo?.slice(0, 6)?.map((obj, i) => (
              <SuggestedCharityCard
                data={obj}
                key={i}
                handlePress={() => {
                  navigation.push("CampaignProfile", { id: obj?.id });
                }}
              />
            ))
          )}
        </Flex>
      </HorizontalScrollviewSpacing>
      {!eventsData?.volunteeredTo?.length && !loader && (
        <EmptyState message="No Data Found" />
      )}
    </>
  );
};

export default Events;

const styles = StyleSheet.create({});
