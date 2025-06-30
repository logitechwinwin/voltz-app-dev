import React, { useRef, useState } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { GoBackBar, PrimaryButton, Steps } from "../../../components";
import { Container } from "../../../atom-components";
import { ChevronRightIcon } from "../../../assets";
import { data } from "./data";
import { login, setPreferenceScreen } from "../../../store/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export default function PreferencesSelection() {
  const [active, setActive] = useState(0);

  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.storeReducer);

  const handleScroll = (event) => {
    const { nativeEvent } = event;
    const scrollPosition = nativeEvent.contentOffset.x;
    const currentIndex = scrollPosition / nativeEvent.layoutMeasurement.width;
    if (Number.isInteger(currentIndex)) {
      setActive(currentIndex);
    }
  };

  const scrollToIndex = () => {
    const offset = (active + 1) * width;
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
  };

  const setPreference = async () => {
    dispatch(setPreferenceScreen(false));
    await AsyncStorage.setItem("preferenceScreen", "true")
    dispatch(login())
    if (isLogged) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }
  };

  const handleNext = () => {
    if (active < data.length - 1) {
      scrollToIndex();
      setActive((prevActive) => prevActive + 1);
    } else if (active == data.length - 1) {
      setPreference();
    }
  };

  const handlePrev = () => {
    if (active > 0) {
      const offset = (active - 1) * width;
      scrollViewRef.current?.scrollTo({ x: offset, animated: true });
      setActive((prevActive) => prevActive - 1);
    }
  };
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {data.map(({ Content }, index) => (
          <Container light key={index} style={{ width: width }}>
            <Content handlePrev={handlePrev} active={active} />
          </Container>
        ))}
      </ScrollView>
      <View style={styles.stepView}>
        <PrimaryButton
          label="Next"
          iconRight={<ChevronRightIcon />}
          iconGap={15}
          btnStyle={styles.nextBtn}
          onPress={handleNext}
        />
        <View style={styles.steps}>
          <Steps active={active} points={data.length} />
        </View>
      </View>
    </>
  );
}
