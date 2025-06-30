import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";

import { ModalWrapper } from "../../";
import { Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";

export default function ProductDetail({ isVisible, setVisible, data }) {
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible} pT={26} pB={19}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Image source={{ uri: data?.image }} style={styles.image} />
        </View>
        <Typography mT={20} text={data?.name} bold />
        <Typography text={data?.description} />
      </ScrollView>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: sizer.moderateVerticalScale(200),
    borderRadius: sizer.fontScale(8),
    objectFit: "fill",
  },
  scrollViewContent: {
    paddingBottom: 20, // Add some bottom padding if needed
  },
});
