import { Modal } from "react-native";
import React from "react";

import { useModal } from "../../../contexts";

export default function GlobalModal() {
  const { isVisible, hideModal, modalContent } = useModal();
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={hideModal}
    >
      {modalContent}
    </Modal>
  );
}
