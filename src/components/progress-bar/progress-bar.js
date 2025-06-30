import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { COLORS } from "../../globals";

const ProgressBar = ({ currentIndex, activeIndex }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const isCurrentIndex = currentIndex === activeIndex;

  useEffect(() => {
    if (isCurrentIndex) {
      progressAnim.setValue(1);
      return;
    }
    if (activeIndex < currentIndex) {
      progressAnim.setValue(0);
    }
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.main} />
      <Animated.View
        style={[
          styles.activeBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: { height: 2, flex: 1, borderRadius: 20, overflow: "hidden" },
  main: {
    backgroundColor: COLORS.white,
    opacity: 0.4,
    height: "100%",
    width: "100%",
  },
  activeBar: {
    height: "100%",
    backgroundColor: COLORS.white,
    position: "absolute",
  },
});
