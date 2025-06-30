import * as React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Typography } from "../atom-components";
import { sizer } from "../helpers";
import { COLORS } from "../globals";
import { tabData } from "./data";
import { useCheckLoginStatus } from "../hooks";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  const { checkLoginStatus } = useCheckLoginStatus();
  const screenOptions = {
    tabBarLabelPosition: "below-icon",
    tabBarPressColor: "transparent",
    tabBarIndicatorStyle: {
      display: "none",
    },
    swipeEnabled: false,
  };

  return (
    <Tab.Navigator tabBarPosition="bottom" screenOptions={screenOptions}>
      {tabData.map((data, index) => (
        <Tab.Screen
          key={index}
          name={data?.screenName}
          component={data?.stack}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <View
                  style={{
                    width: sizer.moderateScale(100),
                    zIndex: 99,
                  }}
                >
                  <Typography
                    size={12}
                    color={focused ? COLORS.secondary : COLORS.textV3}
                    textAlign="center"
                  >
                    {data?.label}
                  </Typography>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => {
              const iconColor = () => {
                if (data?.stroke) {
                  return { stroke: focused ? COLORS.secondary : COLORS.greyV1 };
                }
                if (data?.fill) {
                  return { fill: focused ? COLORS.secondary : COLORS.greyV1 };
                }
                return {};
              };
              return (
                <View style={{ alignItems: "center" }}>
                  <data.TabIcon
                    width={sizer.moderateScale(data?.iconWidth)}
                    height={sizer.moderateVerticalScale(data?.iconHeight)}
                    {...iconColor()}
                  />
                </View>
              );
            },
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (event) => {
              if (
                route?.name == "MyProfileScreen" &&
                !checkLoginStatus(false)
              ) {
                event.preventDefault();
                navigation.navigate("Login");
              }
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}
