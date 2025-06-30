import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Flex } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";
import { TickIcon } from "../../../assets";

const SDGImages = () => {
  const [activeStep, setActiveStep] = useState(0);

  const DATA = [
    require("../../../assets/images/sdg-images/no-poverty.png"),
    require("../../../assets/images/sdg-images/zero-hunger.png"),
    require("../../../assets/images/sdg-images/good-health.png"),
    require("../../../assets/images/sdg-images/quality-education.png"),
    require("../../../assets/images/sdg-images/gender-equality.png"),
    require("../../../assets/images/sdg-images/clean-water.png"),
    require("../../../assets/images/sdg-images/clean-energy.png"),
    require("../../../assets/images/sdg-images/decent-work.png"),
    require("../../../assets/images/sdg-images/industry.png"),
    require("../../../assets/images/sdg-images/reduced-inequalities.png"),
    require("../../../assets/images/sdg-images/cities-and-communities.png"),
    require("../../../assets/images/sdg-images/responsible-consuption.png"),
    require("../../../assets/images/sdg-images/life-on-land.png"),
    require("../../../assets/images/sdg-images/strong-institutions.png"),
    require("../../../assets/images/sdg-images/climate-action.png"),
    require("../../../assets/images/sdg-images/life-below-water.png"),
    require("../../../assets/images/sdg-images/partners-for-goals.png"),
  ];

  return (
    <Flex
      gap={16}
      flexWrap="wrap"
      mt={21}
      jusContent="space-between"
      flexStyle={{
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      {DATA.map((imgUrl, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={baseOpacity}
          onPress={() => setActiveStep(i)}
        >
          <View
            style={[
              styles.imageView,
              activeStep === i && {
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                transform: [{ scale: 0.9 }],
              },
            ]}
          >
            <Image
              source={imgUrl}
              style={[
                styles.image,
                activeStep === i && {
                  borderRadius: 7,
                  width: "100%",
                  height: "100%",
                },
              ]}
            />
            {activeStep === i && (
              <View style={styles.tickView}>
                <TickIcon />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </Flex>
  );
};

export default SDGImages;

const styles = StyleSheet.create({
  tickView: {
    width: sizer.moderateScale(19),
    height: sizer.moderateScale(19),
    borderRadius: 100,
    position: "absolute",
    bottom: sizer.moderateVerticalScale(65),
    left: sizer.moderateScale(63),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  imageView: {
    width: sizer.moderateScale(76),
    height: sizer.moderateScale(76),
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 7,
  },
});
