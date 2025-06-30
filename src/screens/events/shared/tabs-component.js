import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";
import { Flex, Typography } from "../../../atom-components";
import { EmptyCampaign } from "../../../assets";
import DATA from "../data";

const TabsComponent = ({ TABS, activeStep, setActiveStep }) => {
  return (
    <>
      {!DATA.length ? (
        <View style={styles.emptyContainer}>
          <EmptyCampaign />
          <Typography text="No Campaigns Found" bold mT={29} />
        </View>
      ) : (
        <>
          <Flex flexStyle={styles.main}>
            {TABS.map((item, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={1}
                style={[
                  styles.tab,
                  i == 0 ? styles.tabLeft : styles.tabRight,
                  activeStep === i && {
                    backgroundColor: COLORS.secondary,
                    borderWidth: 0,
                  },
                ]}
                onPress={() => setActiveStep(i)}
              >
                <Typography
                  text={item.title}
                  color={activeStep === i ? COLORS.white : COLORS.secondary}
                  size={12}
                  semiBold
                />
              </TouchableOpacity>
            ))}
          </Flex>
          {TABS[activeStep].Component()}
        </>
      )}
    </>
  );
};

export default TabsComponent;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(205),
    height: sizer.moderateVerticalScale(33),
    alignSelf: "center",
    marginTop: sizer.moderateVerticalScale(18),
  },
  tab: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  tabLeft: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  tabRight: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
