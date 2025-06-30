import React, { useRef, useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "../../../atom-components";
import { PrimaryButton, SliderContent, Steps } from "../../../components";
import { data } from "./data";
import { setOnboard } from "../../../store/reducer";

export default function Slider() {
  const [active, setActive] = useState(0);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const scrollToIndex = () => {
    console.log("Current action index: ", active);
    const offset = (active + 1) * width;
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
    setActive(offset);
    console.log("updated action index: ", active, "offset: ", offset);

  };

  const handleScroll = (event) => {
    const { nativeEvent } = event;
    const scrollPosition = nativeEvent.contentOffset.x;
    const currentIndex = scrollPosition / nativeEvent.layoutMeasurement.width;
    if (Number.isInteger(currentIndex)) {
      setActive(currentIndex);
    }
  };

  const setOnboardTrue = () => {
    dispatch(setOnboard(false));
    AsyncStorage.setItem("@onboard", "true");
    console.log("action index: ", active);

  };

  const handleNext = () => {
    if (active < 2) {
      scrollToIndex();
    } else if (active == 2) {
      setOnboardTrue();
    }
  };

  return (
    <Container pH={0}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <SliderContent key={index} item={{ ...item, index }} width={width} />
        ))}
      </ScrollView>
      <Container flex={0} pH={33} light>
        <Steps active={active} />
        <PrimaryButton
          label={active == 2 ? "Let's go!" : "Next"}
          onPress={handleNext}
          mt={24}
          mb={50}
        />
      </Container>
    </Container>
  );
}
