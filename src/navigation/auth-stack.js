import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  CreateAccount,
  ForgotPassword,
  Login,
  LoginWithEmail,
  OtpVerification,
  ResetPassword,
} from "../screens";
import { NavigationTransition } from "../services";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
