import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Typography } from "../../../atom-components";
import { Confirmation, OutlineSelect } from "../../../components";
import { sizer } from "../../../helpers";
import { baseOpacity, COLORS, placeholder_profile_img } from "../../../globals";
import { useCheckLoginStatus } from "../../../hooks";

const SuggestedNgoCard = ({
  item,
  handleFollowUnFollow = () => { },
  isLoading,
}) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const { checkLoginStatus } = useCheckLoginStatus();

  const handleSelect = (id) => {
    if (item?.followed && checkLoginStatus()) {
      setVisible(true);
    } else if (checkLoginStatus()) {
      handleFollowUnFollow(id, "follow");
    }
  };

  return (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={baseOpacity}
      onPress={() => navigation.navigate("NGOProfile", { id: item?.id })}
    >
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: sizer.moderateScale(13),
        }}
      >
        <Image
          source={{ uri: item?.profileImage || placeholder_profile_img }}
          style={styles.profileImg}
        />
        <Typography
          text={item?.name}
          numberOfLines={2}
          semiBold
          size={12}
          mT={5}
          textAlign="center"
        />
      </View>

      <OutlineSelect
        inActiveText="Follow"
        item={item}
        activeText="Followed"
        onSelect={handleSelect}
        isSelected={item?.followed}
        isLoading={isLoading}
      />

      {item?.followed && (
        <Confirmation
          isVisible={isVisible}
          setVisible={setVisible}
          onPress={() => {
            handleFollowUnFollow(item?.id, "unfollow");
          }}
          leftLabel="Yes! unfollow"
          leave="Ngo"
          action="unfollow"
        />
      )}
    </TouchableOpacity>
  );
};

export default SuggestedNgoCard;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(99),
    height: sizer.moderateVerticalScale(127),
    marginVertical: sizer.moderateVerticalScale(16),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileImg: {
    backgroundColor: COLORS.secondary,
    width: sizer.moderateScale(44),
    height: sizer.moderateScale(44),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderColor: COLORS.primary,
    marginBottom: sizer.moderateVerticalScale(5),
  },
});
