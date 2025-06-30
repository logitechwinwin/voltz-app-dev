import { Image, StyleSheet, View } from "react-native";

import {
  COLORS,
  CONSTANTS,
  placeholder_cover_img,
  placeholder_profile_img,
} from "../../globals";
import { sizer } from "../../helpers";

const ProfileHeader = ({ coverImg, isInActive, profileImg, children, user, pH = 0 }) => {
  return (
    <View style={[styles.main, { paddingHorizontal: sizer.moderateScale(pH) }]}>
      <View>
        <Image
          source={coverImg ? coverImg : { uri: placeholder_cover_img }}
          style={styles.coverImg}
        />
        {isInActive && <Image
          source={require('../../assets/images/banned-image/banned-image.png')}
          style={styles.bannedImg}
        />}
        {profileImg && (
          <View style={styles.profileImgView}>
            <Image
              source={
                profileImg ? profileImg : { uri: placeholder_profile_img }
              }
              style={styles.profileImg}
            />
          </View>
        )}
      </View>

      <View
        style={[
          {
            marginHorizontal: sizer.moderateScale(16),
          },
          profileImg && { paddingTop: sizer.moderateVerticalScale(28) },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginHorizontal: -CONSTANTS.containerPaddingX,
    borderBottomLeftRadius: sizer.moderateScale(16),
    borderBottomRightRadius: sizer.moderateScale(16),
    paddingBottom: sizer.moderateVerticalScale(22),
    overflow: "hidden",
    marginBottom: 10,
  },
  coverImg: {
    width: "100%",
    height: sizer.moderateVerticalScale(158),
  },
  bannedImg: {
    position: 'absolute',
    width: "100%",
    height: sizer.moderateVerticalScale(158),
  },
  profileImgView: {
    borderRadius: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    justifyContent: "center",
    position: "absolute",
    bottom: sizer.moderateVerticalScale(-16),
    left: sizer.moderateScale(16),
    backgroundColor: COLORS.white,
    padding: sizer.moderateScale(3),
  },
  profileImg: {
    height: sizer.moderateScale(90),
    width: sizer.moderateScale(90),
    borderRadius: 50,
  },
});

const Images = [
  require("../../assets/images/profile-coverImg.png"),
  require("../../assets/images/profile-image.png"),
];
