import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { sizer } from "../../helpers";

const ListSkeleton = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonPlaceholder borderRadius={4} key={index}>
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonTextContainer}>
              <View style={styles.skeletonTitle} />
              <View style={styles.skeletonSubtitle} />
            </View>
            <View style={styles.rightIcon} />
          </View>
        </SkeletonPlaceholder>
      ))}
    </ScrollView>
  );
};

export { ListSkeleton };

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  skeletonImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  skeletonTextContainer: {
    marginLeft: sizer.moderateScale(15),
  },
  skeletonTitle: {
    width: 180,
    height: 20,
  },
  skeletonSubtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 18,
  },
  rightIcon: {
    position: "absolute",
    right: 0,
    width: 30,
    height: 30,
  },
});
