import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, View } from "react-native";

import { styles } from "./styles";
import { CategorySelect, PieChart } from "../";
import { SDGsData } from "./data";
import { EmptyState, Flex, Typography } from "../../atom-components";
import { COLORS } from "../../globals";
import ApiManager from "../../helpers/api-manager";
import { useDispatch } from "react-redux";
import { openToast } from "../../store/reducer";
import format from "pretty-format";

export default function ImpactPortfolio({ userId }) {
  const [selectCategory, setSelectCategory] = useState("1M");
  const [sdgSates, setSdgSates] = useState([]);
  const dispatch = useDispatch();

  const handleGetSdg = async (duration) => {
    try {
      const { data } = await ApiManager(
        "get",
        `users/sdgsStats?userId=${userId}&duration=${duration == "ALL" ? "all" : duration
        }`
      );
      setSdgSates(data?.response?.details?.sdgStats);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  };

  useEffect(() => {
    if (userId) handleGetSdg(selectCategory);
  }, [selectCategory, userId]);

  function getPieChartData() {
    return sdgSates.map((item, index) => {
      return {
        key: index,
        value: item.percentage,
        svg: { fill: item?.sdg?.color },
      };
    });
  }

  const renderItem = ({ item }) => {
    const ProgressBar = () => {
      const animatedProgress = useRef(new Animated.Value(0)).current;
      const currentValue = item.percentage;

      useEffect(() => {
        Animated.timing(animatedProgress, {
          toValue: currentValue,
          duration: 800,
          useNativeDriver: false,
        }).start();
      }, [currentValue, animatedProgress]);

      const progressBarWidth = animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp",
      });

      return (
        <Animated.View
          style={{
            width: progressBarWidth,
            backgroundColor: item?.sdg?.color,
            height: "100%",
          }}
        />
      );
    };

    return (
      <View style={styles.progressCard}>
        <Flex
          jusContent="space-between"
          algItems="flex-end"
          mb={10}
          flexWrap={"wrap"}
        >
          <Typography
            text={item?.sdg?.label}
            size={14}
            bold
            color={COLORS.blackV2}
          />
          <Typography
            text={`${item?.percentage}%`}
            size={20}
            color={COLORS.blackV2}
          />
        </Flex>
        <View style={styles.progressBar}>
          <ProgressBar />
        </View>
      </View>
    );
  };

  return (
    <View>
      <Typography {...styles.topHeading} />
      <View style={styles.chartView}>
        <PieChart data={getPieChartData()} innerRadius="85%" />
        <View style={styles.chartCenterText}>
          <Typography
            text={sdgSates?.length}
            size={60}
            bold
            color={COLORS.textV4}
            mB={-12}
          />
          <Typography text="SDGs" size={24} color="#888888" />
        </View>
      </View>

      {!!sdgSates?.length && (
        <CategorySelect
          mT={24}
          mB={24}
          pH={10}
          select={selectCategory}
          onSelect={setSelectCategory}
        />
      )}
      {!sdgSates?.length && <EmptyState message={"No Sgds Found"} />}
      <FlatList
        data={sdgSates}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
