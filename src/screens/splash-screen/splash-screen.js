import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { sizer } from "../../helpers";
import { COLORS } from "../../globals";

const SplashScreen = ({ status }) => {
  const [isVisible, setVisible] = useState(true);
  const imgOpacity = useSharedValue(1);
  const containerOpacity = useSharedValue(1);
  const imageUrl = require("../../assets/images/splash-screen.gif");

  const imageAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: imgOpacity.value,
    };
  });

  const containerAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  const fadeOutImg = () => {
    imgOpacity.value = withTiming(
      0,
      {
        duration: 800,
        easing: Easing.linear,
      },
      () => {
        runOnJS(fadeOutContainer)();
      }
    );
  };

  const fadeOutContainer = () => {
    containerOpacity.value = withTiming(
      0,
      {
        duration: 800,
        easing: Easing.linear,
      },
      () => {
        runOnJS(setVisible)(false);
      }
    );
  };

  useEffect(() => {
    if (!status) fadeOutImg();
  }, [status]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, containerAnimStyle]}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={imageUrl}
          style={[styles.image, imageAnimStyle]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    zIndex: 1000,
    alignItems: "center",
    ...StyleSheet.absoluteFill,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: sizer.moderateScale(200),
    height: sizer.moderateScale(200),
  },
});

export default SplashScreen;
