import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "@react-native-community/blur";

import { COLORS, CONSTANTS } from "../../../globals";
import { sizer } from "../../../helpers";

export default function CustomBottomSheet({
  isVisible = false,
  setVisible = () => { },
  modalStyle = {},
  pH = CONSTANTS.containerPaddingX,
  pV = 36,
  children,
}) {
  const toggleModal = () => {
    setVisible(!isVisible);
  };
  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard
      onSwipeComplete={toggleModal}
      swipeDirection="down"
      onBackButtonPress={toggleModal}
      customBackdrop={
        isVisible && (
          <Pressable
            onPress={toggleModal}
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0, 0, 0,0.5)" },
            ]}
          ></Pressable>
        )
      }
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={500}
    >
      <View
        style={[
          styles.modalContainer,
          modalStyle,
          {
            paddingHorizontal: sizer.moderateScale(pH),
            paddingVertical: sizer.moderateVerticalScale(pV),
          },
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  customDrop: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  modal: { justifyContent: "flex-end", margin: 0 },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
