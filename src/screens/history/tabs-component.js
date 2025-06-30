import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { sizer } from "../../helpers";
import { COLORS } from "../../globals";
import { Flex } from "../../atom-components";
import { SuggestedCharityCard } from "../../components";

const TabsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const TABS = [
    { title: "Joined", Component: <SuggestedCharityCard campaigns /> },
    { title: "Donated", Component: <SuggestedCharityCard campaigns /> },
  ];

  return (
    <>
      <Flex flexStyle={styles.main}>
        {TABS.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={1}
              style={[
                styles.tab,
                activeStep == i && { backgroundColor: COLORS.secondary },
              ]}
              onPress={() => {
                setActiveStep(i);
              }}
            >
              <Text
                style={
                  activeStep == i
                    ? { color: "white" }
                    : { color: COLORS.secondary }
                }
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Flex>
      {TABS[activeStep].Component}
    </>
  );
};

export default TabsComponent;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(205),
    height: sizer.moderateVerticalScale(33),
    borderWidth: 2,
    borderColor: COLORS.secondary,
    alignSelf: "center",
    marginTop: 18,
    borderRadius: 25,
    overflow: "hidden",
  },

  tab: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
