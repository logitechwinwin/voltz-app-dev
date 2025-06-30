import {
  TodayTabbarIcon,
  EventsTabbarIcon,
  CommunityTabbarIcon,
  DealsTabbarIcon,
  MyProfileTabbarIcon,
} from "../assets";

import {
  CommunityStack,
  DealsStack,
  EventsStack,
  MyProfileStack,
  TodayStack,
} from "./tab-stack";

export const tabData = [
  {
    screenName: "TodayScreen",
    label: "Today",
    stack: TodayStack,
    TabIcon: TodayTabbarIcon,
    iconWidth: 27,
    iconHeight: 20,
    fill: true,
  },
  {
    screenName: "EventsScreen",
    label: "Campaigns",
    stack: EventsStack,
    TabIcon: EventsTabbarIcon,
    iconWidth: 27,
    iconHeight: 21,
    fill: true,
  },
  {
    screenName: "CommunityScreen",
    label: "Community",
    stack: CommunityStack,
    TabIcon: CommunityTabbarIcon,
    iconWidth: 24,
    iconHeight: 24,
    fill: true,
  },
  {
    screenName: "DealsScreen",
    label: "Deals",
    stack: DealsStack,
    TabIcon: DealsTabbarIcon,
    iconWidth: 24,
    iconHeight: 24,
    stroke: true,
  },
  {
    screenName: "MyProfileScreen",
    label: "My Profile",
    stack: MyProfileStack,
    TabIcon: MyProfileTabbarIcon,
    iconWidth: 17,
    iconHeight: 22,
    stroke: true,
  },
];
