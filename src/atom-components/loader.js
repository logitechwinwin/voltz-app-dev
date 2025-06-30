import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { sizer } from "../helpers";

const Loader = ({ backgroundColor }) => {
  const imageUrl = require("../assets/images/splash-screen.gif");
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            backgroundColor == "white"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 255, 255, 0.5)",
        },
      ]}
    >
      <ActivityIndicator size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Loader;
