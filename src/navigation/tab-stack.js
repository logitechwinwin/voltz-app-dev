import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  CampaignProfile,
  Community,
  Companies,
  CompanyProfile,
  Deals,
  DealsDetail,
  Events,
  NGOProfile,
  Today,
  VolunteerProfile,
  Notifications,
  VolunteerProfileEdit,
  CharityProfile,
  ViewAllCharity,
  ViewAllCampaigns,
  ViewAllNgos,
  ViewAllPartners,
  ViewAllVolunteers,
  CommunityDetail,
  ViewAllProfileEvents,
} from "../screens";
import { NavigationTransition } from "../services";
import { Messages } from "../assets";

const Stack = createStackNavigator();

export function TodayStack() {
  return (
    <Stack.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="NGOProfile" component={NGOProfile} />
      <Stack.Screen name="CampaignProfile" component={CampaignProfile} />
      <Stack.Screen name="CharityProfile" component={CharityProfile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="VolunteerProfile" component={VolunteerProfile} />
      <Stack.Screen name="ViewAllCharity" component={ViewAllCharity} />
      <Stack.Screen name="ViewAllCampaigns" component={ViewAllCampaigns} />
      <Stack.Screen name="ViewAllNgos" component={ViewAllNgos} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="ViewAllPartners" component={ViewAllPartners} />
      <Stack.Screen name="ViewAllVolunteers" component={ViewAllVolunteers} />
      <Stack.Screen name="ViewAllCommunity" component={Community} />
      <Stack.Screen name="ViewAllCompanies" component={Companies} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetail} />
    </Stack.Navigator>
  );
}

export function EventsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="CampaignProfile" component={CampaignProfile} />
      <Stack.Screen name="CharityProfile" component={CharityProfile} />
      <Stack.Screen name="ViewAllCampaigns" component={ViewAllCampaigns} />
      <Stack.Screen name="ViewAllCharity" component={ViewAllCharity} />
    </Stack.Navigator>
  );
}

export function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName="Community"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetail} />
      <Stack.Screen name="VolunteerProfile" component={VolunteerProfile} />
    </Stack.Navigator>
  );
}

export function DealsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Deals"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen name="Deals" component={Deals} />
      <Stack.Screen name="DealsDetail" component={DealsDetail} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
    </Stack.Navigator>
  );
}

export function MyProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen
        name="MyProfile"
        component={VolunteerProfile}
        initialParams={{ profileType: "own" }}
      />
      <Stack.Screen name="ViewAllCampaigns" component={ViewAllCampaigns} />
      <Stack.Screen name="ViewAllVolunteers" component={ViewAllVolunteers} />
      <Stack.Screen name="CampaignProfile" component={CampaignProfile} />
      <Stack.Screen name="VolunteerProfile" component={VolunteerProfile} />
      <Stack.Screen name="ViewAllCommunity" component={Community} />
      <Stack.Screen name="ViewAllPartners" component={ViewAllPartners} />
      <Stack.Screen name="ViewAllNgos" component={ViewAllNgos} />
      <Stack.Screen name="NGOProfile" component={NGOProfile} />
      <Stack.Screen name="ViewAllCompanies" component={Companies} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
      <Stack.Screen name="ViewAllCharity" component={ViewAllCharity} />
      <Stack.Screen name="CharityProfile" component={CharityProfile} />

      <Stack.Screen
        name="VolunteerProfileEdit"
        component={VolunteerProfileEdit}
      />
      <Stack.Screen name="Deals" component={Deals} />
      <Stack.Screen name="DealsDetail" component={DealsDetail} />
      <Stack.Screen
        name="ViewAllProfileEvents"
        component={ViewAllProfileEvents}
      />
    </Stack.Navigator>
  );
}
