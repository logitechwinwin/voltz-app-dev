import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Slider, Welcome } from "../screens";
import { NavigationTransition } from "../services";

const Stack = createNativeStackNavigator();

export default function OnboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="OnboardSlider" component={Slider} />
    </Stack.Navigator>
  );
}
