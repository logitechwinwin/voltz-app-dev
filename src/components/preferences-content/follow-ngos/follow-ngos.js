import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

import { styles } from "./styles";
import { GoBackBar, OutlineSelect, TopHeading } from "../../";
import { Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { CONSTANTS } from "../../../globals";
import { useFetchNgoData, useFollowUnfollow } from "../../../hooks";

export default function PreferencesFollowNGOS({ handlePrev, active }) {
  const [loadingStates, setLoadingStates] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const { ngoData, setNgoData } = useFetchNgoData({
    shouldFetch: shouldFetch,
    query: "page=1&perPage=4",
    byInterest: true,
  });
  const { followUnfollow } = useFollowUnfollow();

  const handleFollow = async (id, action) => {
    try {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
      const success = await followUnfollow(id, action);
      if (success) {
        const updatedNgoData = {
          ...ngoData,
          items: ngoData.items.map((obj) =>
            obj.id === id ? { ...obj, followed: action == "follow" } : obj
          ),
        };
        setNgoData(updatedNgoData);
      }
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error)
    }
  };

  useEffect(() => {
    if (active == 2) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [active]);

  const renderItem = ({ item }) => {
    const handleSelect = (id) => {
      if (item?.followed) {
        handleFollow(id, "unfollow");
      } else {
        handleFollow(id, "follow");
      }
    };
    return (
      <View style={styles.cardContainer}>
        <View>
          <Image source={{ uri: item?.bannerImage }} style={styles.coverImg} />
          <Image
            source={{ uri: item?.profileImage }}
            style={styles.profileImg}
          />
        </View>
        <View style={styles.bodyView}>
          <Typography text={item?.name} {...styles.cardTitle} />
          <OutlineSelect
            item={item}
            activeText="Followed"
            inActiveText="Follow"
            onSelect={handleSelect}
            isSelected={item?.followed}
            isLoading={loadingStates[item.id]}
          />
        </View>
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
          title="Connect with NGOs."
          subTitle="Connect with NGOs to volunteer together."
          mB={16}
        />
        <FlatList
          data={ngoData?.items}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(item, i) => i.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );
}
