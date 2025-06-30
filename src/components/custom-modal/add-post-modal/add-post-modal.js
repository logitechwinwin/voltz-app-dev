import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { InputField, PrimaryButton } from "../..";
import { sizer } from "../../../helpers";

const AddPostModal = ({
  visible,
  setVisible = () => { },
  handleChange = () => { },
  handleSave = () => { },
  formData = {},
  formError = {},
  isUpdate,
}) => {

  return (
    <ModalWrapper isVisible={visible} setVisible={setVisible}>
      <InputField
        label="Post"
        value={formData?.content}
        handleChange={(e) => handleChange(e, "content")}
        error={formError?.content}
        mT={20}
        contextMenuHidden={true}
        multiline
        numberOfLines={4}
      />
      <PrimaryButton
        label="Done"
        onPress={() => handleSave(isUpdate && "patch")}
        mt={8}
        mb={16}
      />
    </ModalWrapper>
  );
};

export default AddPostModal;

const styles = StyleSheet.create({});
