import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { Typography } from "../../atom-components";
import { sizer } from "../../helpers";

const { width } = Dimensions.get("window");

const CustomToast = ({ toast, close = () => { } }) => {
  const { type, message } = toast;

  const color = {
    success: "#bcf7cc",
    info: "#bcc9f7",
    error: "#f7bcbc",
    warning: "#f7d6bc",
  };

  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(-50, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });

    setTimeout(
      () => {
        translateY.value = withTiming(150, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
        close();
      },
      message?.length > 50 ? 2000 : 1000
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <View
        style={[
          styles.sideBar,
          {
            backgroundColor:
              type === "success"
                ? color.success
                : type === "info"
                  ? color.info
                  : type === "warning"
                    ? color.warning
                    : color.error,
          },
        ]}
      ></View>
      <View
        style={[
          styles.circle,
          {
            backgroundColor:
              type === "success"
                ? color.success
                : type === "info"
                  ? color.info
                  : type === "warning"
                    ? color.warning
                    : color.error,
          },
        ]}
      >
        <Image
          source={
            type === "success"
              ? require("../../assets/images/toast-icon/success.png")
              : type === "info"
                ? require("../../assets/images/toast-icon/info.png")
                : type === "warning"
                  ? require("../../assets/images/toast-icon/warning.png")
                  : require("../../assets/images/toast-icon/error.png")
          }
          style={styles.toastIcon}
        />
      </View>
      <Typography textAlign="center" mL={10} size={15} mB={2} medium style={{ width: '80%' }}>
        {message || "Something went wrong"}
      </Typography>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    width: width - sizer.moderateScale(20),
    minHeight: 70,
    alignItems: "center",
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    zIndex: 1000,
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: sizer.moderateScale(10),
  },
  sideBar: {
    width: 5,
    height: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  circle: {
    width: 30,
    minHeight: 30,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  toastIcon: {
    width: 16,
    height: 16,
  },
});

export default CustomToast;
