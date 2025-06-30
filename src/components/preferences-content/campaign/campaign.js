import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { styles } from "./styles";
import { Typography } from "../../../atom-components";
import { GoBackBar, OutlineSelect, TopHeading } from "../..";
import { COLORS, CONSTANTS } from "../../../globals";
import { sizer } from "../../../helpers";
import { useFetchEventsData, useRegisterUnRegister } from "../../../hooks";

export default function PreferencesCampaign({ handlePrev, active }) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [loadingItems, setLoadingItems] = useState({}); 
  const { eventsData: campaigns, setEventsData } = useFetchEventsData({
    shouldFetch: shouldFetch,
    query: "page=1&perPage=3&excludeExpired=true&exceedAlreadyRegistered=false",
    type: "campaign",
    byInterest: true,
  });
  const isFocused = useIsFocused();
  const { registerUnRegister, isLoading } = useRegisterUnRegister();

  const handleSelect = async (id) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    const selectedItem = campaigns?.items.find((item) => item.id === id);
    const action = selectedItem?.registered ? "un-register" : "register";
    const success = await registerUnRegister(id, action);

    if (success) {
      const updatedItems = campaigns?.items.map((item) =>
        item.id === id ? { ...item, registered: !item.registered } : item
      );
      setEventsData((prev) => ({ ...prev, items: updatedItems }));
    }
    setLoadingItems((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() => {
    if (isFocused && active == 1) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [isFocused, active]);

  const renderItem = ({ item }) => {
    const isLoading = loadingItems[item.id] || false;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.body}>
          <View>
            <Typography text={item?.title} {...styles.title} />
            <Typography text={item?.description} {...styles.subTitle} />
          </View>
          <OutlineSelect
            item={item}
            isSelected={item.registered}
            onSelect={handleSelect}
            activeText="Registered"
            inActiveText="Register"
            isLoading={isLoading}
          />
        </View>
        <Image source={{ uri: item?.bannerImage }} style={styles.cardImg} />
      </View>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
      }}
    >
      <GoBackBar handleBack={handlePrev} />
      <View
        style={{
          paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
        }}
      >
        <TopHeading
          title="We have campaigns for you."
          subTitle="Follow your favorite campaigns to find out how you can support them."
          mB={16}
        />
        <Typography text="Suggested" semiBold color={COLORS.text} mB={9} />
        <FlatList
          data={campaigns?.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
