import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationTransition } from "../services";
import TabNavigator from "./tab-navigator";
import {
  Setting,
  ChangeEmail,
  ChangePhoneNo,
  ProfileOtpVerification,
  ChangePassword,
  ChatScreen,
  VolunteersTerms,
  LogMyHours,
  PreferencesSelection,
  Login,
  OtpVerification,
  LoginWithEmail,
  ForgotPassword,
  ResetPassword,
  CreateAccount,
} from "../screens";

const Stack = createNativeStackNavigator();

export default function AppStack({ preferenceScreen }) {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
      >
      {/* app screens */}
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen
        name="PreferencesSelection"
        component={PreferencesSelection}
      />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
      <Stack.Screen name="ChangePhoneNo" component={ChangePhoneNo} />
      <Stack.Screen
        name="ProfileOtpVerification"
        component={ProfileOtpVerification}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="VolunteersTerms" component={VolunteersTerms} />
      <Stack.Screen name="LogMyHours" component={LogMyHours} />
      
      {/* auth screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />

    </Stack.Navigator>
  );
}
