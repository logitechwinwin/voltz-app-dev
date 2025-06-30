import { TransitionPresets } from "@react-navigation/stack";

const NavigationTransition = () => {
  return {
    // gestureEnabled: true,
    gestureDirection: "horizontal",
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default NavigationTransition;
