import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { sizer } from "../../helpers";

const CardSkeleton = ({ height = 150 }) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonPlaceholder borderRadius={4} key={index}>
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonContentContainer}>
              <View style={styles.skeletonTopContent} />
              <View style={styles.skeletonButtonContainer}>
                <View style={styles.skeletonButton} />
                <View style={styles.skeletonButton} />
              </View>
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </ScrollView>
  );
};

export { CardSkeleton };

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  skeletonImage: {
    width: sizer.moderateScale(146),
    height: "100%",
    borderRadius: 4,
  },
  skeletonContentContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
    height: sizer.moderateVerticalScale(99),
  },
  skeletonTopContent: {
    width: "100%",
    height: 20,
    marginBottom: 10,
  },
  skeletonButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  skeletonButton: {
    width: 90,
    height: 35,
    borderRadius: 20,
  },
  marginLeft: {
    marginLeft: 10,
  },
});
