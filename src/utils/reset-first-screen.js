import { CommonActions } from "@react-navigation/native";

export const resetToFirstScreen = (navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Home" }],
    })
  );
};
