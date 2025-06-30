import React from "react";
import { Provider } from "react-redux";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import "react-native-gesture-handler";

import store from "./src/store/store";
import { COLORS } from "./src/globals";
import { RootNavigation } from "./src/navigation";
import { ModalProvider } from "./src/contexts";

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    ...COLORS,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ModalProvider>
            <RootNavigation />
        </ModalProvider>
      </PaperProvider>
    </Provider>
  );
}
