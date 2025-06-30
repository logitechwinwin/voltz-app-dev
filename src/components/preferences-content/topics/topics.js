import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { TopicSelect, TopHeading } from "../../";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ApiManager from "../../../helpers/api-manager";
import { openToast, toggleLoader } from "../../../store/reducer";

export default function PreferencesTopics({ active }) {
  const [selectedItems, setSelectedItems] = useState({
    topics: [],
    lifeStages: [],
    locations: [],
  });
  const [preferencesData, setPreferencesData] = useState({});
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const handleSetInterest = async () => {
    dispatch(toggleLoader(true));
    try {
      await ApiManager("post", "users/set-interests", {
        topics: selectedItems.topics,
        lifeStages: selectedItems.lifeStages,
        locations: preferencesData.locations.filter((loc) =>
          selectedItems.locations.includes(loc.city)
        ),
      });
    } catch (error) {
      dispatch(openToast({ message: error.response.data.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleSelect = (type, id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [type]: prev[type].includes(id)
        ? prev[type].filter((item) => item !== id)
        : [...prev[type], id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        dispatch(toggleLoader(true));
        try {
          const [topicRes, locationRes, lifeStageRes] = await Promise.all([
            ApiManager("get", "topics?page=1&perPage=999"),
            ApiManager("get", "ngo/top-ngo-locations"),
            ApiManager("get", "life-stage?page=1&perPage=2"),
          ]);
          setPreferencesData({
            topics: topicRes.data.response.details,
            locations: locationRes.data.response.details,
            lifeStages: lifeStageRes.data.response.details,
          });
        } catch (error) {
          dispatch(openToast({ message: error.response.data.message }));
        } finally {
          dispatch(toggleLoader(false));
        }
      }
    };
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    if (active == 1) {
      handleSetInterest();
    }
  }, [active]);

  const ItemsList = ({ heading, data, type, mT = 24 }) => (
    <>
      <Typography text={heading} semiBold mT={mT} mB={9} />
      <View style={styles.listView}>
        {data.map((item, index) => (
          <TopicSelect
            key={index}
            item={item}
            isSelected={selectedItems[type].includes(item.id || item)}
            onSelect={() => handleSelect(type, item.id || item)}
          />
        ))}
      </View>
    </>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TopHeading
        title="What are you interested in?"
        subTitle="We’ll help you discover ways to connect with the right charities and projects for you."
      />
      <ItemsList
        heading="Topics"
        data={preferencesData.topics || []}
        type="topics"
        mT={16}
      />
      <ItemsList
        heading="Life Stage"
        data={preferencesData.lifeStages || []}
        type="lifeStages"
      />
      <ItemsList
        heading="Locations"
        data={preferencesData.locations?.map((item) => item.city) || []}
        type="locations"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: sizer.moderateScale(8),
  },
});
