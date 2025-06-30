import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

import { styles } from "./styles";
import { Typography } from "../../../atom-components";
import {
  CardDetailModal,
  DonationModal,
  GoBackBar,
  OutlineSelect,
  TopHeading,
} from "../..";
import { COLORS, CONSTANTS } from "../../../globals";
import { sizer } from "../../../helpers";
import { useFetchEventsData } from "../../../hooks";
import { useIsFocused } from "@react-navigation/native";

export default function PreferencesCharity({ handlePrev, active }) {
  const [isVisible, setVisible] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [paymentApiUrl, setPaymentApiUrl] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [index, setIndex] = useState(0);
  const { eventsData: charityData } = useFetchEventsData({
    shouldFetch: shouldFetch,
    query: "page=1&perPage=3&excludeExpired=true&exceedAlreadyRegistered=false",
    type: "charity",
    byInterest: true,
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && active == 1) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [isFocused, active]);

  const renderItem = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.body}>
        <View>
          <Typography text={item?.title} {...styles.title} />
          <Typography text={item?.description} {...styles.subTitle} />
        </View>
        <OutlineSelect
          item={item}
          onSelect={() => {
            setIndex(index),
            setVisible(true);
          }}
          activeText="Followed"
          inActiveText="Donate"
        />
      </View>
      <Image source={{ uri: item?.bannerImage }} style={styles.cardImg} />
    </View>
  );

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
          title="We have charities for you."
          subTitle="Follow your favorite charities to find out how you can support them."
          mB={16}
        />
        <Typography text="Suggested" semiBold color={COLORS.text} mB={9} />
        <FlatList
          data={charityData?.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <DonationModal
        isVisible={isVisible}
        setVisible={setVisible}
        setCardModal={setCardModal}
        setPaymentApiUrl={setPaymentApiUrl}
        data={(charityData?.items || [])[index]}
      />
      <CardDetailModal
        isVisible={cardModal}
        setVisible={setCardModal}
        paymentApiUrl={paymentApiUrl}
      />
    </View>
  );
}
