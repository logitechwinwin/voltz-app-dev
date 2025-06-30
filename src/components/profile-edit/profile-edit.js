import { Image, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { baseOpacity, placeholder_cover_img, placeholder_profile_img } from "../../globals";
import { CameraIcon } from "../../assets";
import { styles } from "./styles";

const ProfileEdit = ({ bannerImage, profileImage, setImage, user }) => {
  const options = {
    mediaType: "photo",
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
  };

  const setImageHandler = (imageName) => {
    launchImageLibrary(options, (res) => {
      if (res.assets) {
        setImage(res.assets[0].uri, imageName);
      }
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={baseOpacity}
        onPress={() => {
          setImageHandler("bannerImage");
        }}
      >
        <Image
          source={{
            uri: bannerImage
              ? bannerImage
              : placeholder_cover_img,
          }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <CameraIcon />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container2}
        activeOpacity={baseOpacity}
        onPress={() => {
          setImageHandler("profileImage");
        }}
      >
        <Image
          source={{
            uri: profileImage
              ? profileImage
              : placeholder_profile_img,
          }}
          style={[styles.image, { borderRadius: 100 }]}
        />
        <View
          style={[
            styles.overlay,
            { borderRadius: 100, backgroundColor: "rgba(0, 0, 0, 0.4)" },
          ]}
        >
          <CameraIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEdit;
