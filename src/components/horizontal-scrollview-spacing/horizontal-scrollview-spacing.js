import { ScrollView, StyleSheet } from "react-native";

import { CONSTANTS } from "../../globals";
import { sizer } from "../../helpers";

const HorizontalScrollviewSpacing = ({ children }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
      }}
      contentContainerStyle={{
        paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
      }}
    >
      {children}
    </ScrollView>
  );
};

export default HorizontalScrollviewSpacing;

const styles = StyleSheet.create({});
