import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { sizer } from "../../helpers";

const NgoCardSkeleton = () => {
  return [1, 2, 3, 4, 5, 6].map((_, index) => (
    <SkeletonPlaceholder borderRadius={4} key={index}>
      <View style={styles.ngoCardContainer}>
        <View style={styles.ngoCardImageContainer}>
          <View style={styles.ngoProfileImage} />
          <View style={styles.ngoCardTitle} />
        </View>
        <View style={styles.ngoCardButton} />
      </View>
    </SkeletonPlaceholder>
  ));
};

const CharityCardSkeleton = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {[1, 2].map((_, index) => (
        <SkeletonPlaceholder borderRadius={4} key={index}>
          <View style={styles.charityCardContainer}>
            <View style={styles.charityCardImage} />
            <View style={styles.charityCardTitleContainer}>
              <View style={styles.charityCardTitle} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </ScrollView>
  );
};

const CampaignCardSkeleton = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {[1, 2].map((_, index) => (
        <SkeletonPlaceholder borderRadius={4} key={index}>
          <View style={styles.campaignCardContainer}>
            <View style={styles.campaignCardImage} />
            <View style={styles.campaignCardButtonContainer}>
              <View style={styles.campaignCardButton} />
              <View style={styles.campaignCardButton} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </ScrollView>
  );
};

export { NgoCardSkeleton, CharityCardSkeleton, CampaignCardSkeleton };

const styles = StyleSheet.create({
  ngoCardContainer: {
    width: sizer.moderateScale(99),
    height: sizer.moderateVerticalScale(127),
    marginVertical: sizer.moderateVerticalScale(16),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ngoCardImageContainer: {
    alignItems: "center",
    marginRight: 25,
  },
  ngoProfileImage: {
    width: sizer.moderateScale(44),
    height: sizer.moderateScale(44),
    borderRadius: 100,
  },
  ngoCardTitle: {
    width: sizer.moderateScale(60),
    height: sizer.moderateScale(14),
    borderRadius: 4,
    marginTop: sizer.moderateVerticalScale(10),
  },
  ngoCardButton: {
    width: sizer.moderateScale(80),
    height: sizer.moderateScale(30),
    borderRadius: 15,
  },
  charityCardContainer: {
    paddingHorizontal: sizer.moderateScale(7),
    width: sizer.moderateScale(300),
  },
  charityCardImage: {
    height: sizer.moderateVerticalScale(270),
    marginTop: 12,
    borderRadius: 10,
  },
  charityCardTitleContainer: {
    marginTop: 12,
  },
  charityCardTitle: {
    width: "100%",
    height: sizer.moderateScale(40),
    borderRadius: 30,
  },
  campaignCardContainer: {
    paddingHorizontal: sizer.moderateScale(7),
    width: sizer.moderateScale(300),
  },
  campaignCardImage: {
    height: sizer.moderateVerticalScale(270),
    marginTop: 12,
    borderRadius: 10,
  },
  campaignCardButtonContainer: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  campaignCardButton: {
    width: "50%",
    height: sizer.moderateScale(40),
    borderRadius: 30,
  },
});
