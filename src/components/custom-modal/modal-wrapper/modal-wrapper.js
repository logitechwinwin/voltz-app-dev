import React from "react";
import { StyleSheet, TouchableOpacity, Modal, View, KeyboardAvoidingView, Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";

const ModalWrapper = ({
  isVisible = false,
  setVisible = () => { },
  pT = 0,
  pB = 0,
  pH = 16,
  modalBoxStyle = {},
  mH = 16,
  children,
  backPressClose = true,
}) => {
  const centeredViewStyle = {
    paddingHorizontal: sizer.moderateScale(pH),
    paddingTop: sizer.moderateVerticalScale(pT),
    paddingBottom: sizer.moderateVerticalScale(pB),
    marginHorizontal: sizer.moderateScale(mH),
  };

  const toggleModal = () => {
    backPressClose && setVisible(!isVisible);
  };

  return (
    <Modal
      avoidKeyboard
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleModal}
        >
          <BlurView style={styles.absoluteFill} blurType="light" blurAmount={1} />
          <TouchableOpacity activeOpacity={1}>
            <View style={[styles.modalView, centeredViewStyle, modalBoxStyle]}>
              {children}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    borderRadius: 10,
    marginHorizontal: sizer.moderateScale(16),
    backgroundColor: COLORS.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255,0.5)",
    opacity: 0.99,
  },
});

export default ModalWrapper;
