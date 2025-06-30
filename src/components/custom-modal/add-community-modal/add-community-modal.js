import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { CameraIcon } from "../../../assets";
import { Typography } from "../../../atom-components";
import { ImagePicker, InputField, PrimaryButton } from "../..";
import { fontFamily, sizer } from "../../../helpers";
import { baseOpacity, COLORS } from "../../../globals";
import { launchImageLibrary } from "react-native-image-picker";

const AddCommunityModal = ({
  visible,
  setVisible = () => { },
  loading,
  handleChange = () => { },
  handleSave = () => { },
  formData = {},
  formError = {},
}) => {

  const options = {
    mediaType: "photo",
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
  };

  const setImageHandler = (imageName) => {
    launchImageLibrary(options, (res) => {
      if (res.assets) {
        handleChange(res.assets[0].uri, imageName);
      }
    });
  };

  return (
    <ModalWrapper isVisible={visible} setVisible={setVisible} >
      <ImagePicker
        image={formData?.bannerImage}
        onPress={() => setImageHandler('bannerImage')}
        error={formError?.bannerImage}

      />
      <InputField
        label="Title"
        value={formData?.title}
        handleChange={(e) => handleChange(e, "title")}
        multiline
        textInputHeight={60}
        error={formError?.title}
        contextMenuHidden={true}
      />
      <InputField
        label="Description"
        multiline
        textInputHeight={60}
        value={formData?.description}
        handleChange={(e) => handleChange(e, "description")}
        error={formError?.description}
        contextMenuHidden={true}
      />
      <PrimaryButton loader={loading} label="Done" onPress={() => handleSave()} mt={8} mb={16} />
    </ModalWrapper>
  );
};

export default AddCommunityModal;
