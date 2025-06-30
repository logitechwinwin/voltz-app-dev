import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

import { sizer } from "../../helpers";
import { Flex, Typography } from "../../atom-components";
import {
  COLORS,
  baseOpacity,
  placeholder_cover_img,
  placeholder_profile_img,
} from "../../globals";
import GroupedAvatar from "../grouped-avatar/grouped-avatar";
import PrimaryButton from "../custom-buttons/primary-button/primary-button";
import { useNavigation } from "@react-navigation/native";
import format from "pretty-format";
import OutlineSelect from "../custom-buttons/outline-select/outline-select";
import { useState } from "react";
import Confirmation from "../custom-modal/confirmation-modal";

const FollowingCard = ({
  item,
  community,
  ngo,
  navigationRoute,
  join = false,
  handleFollowUnFollow = () => {},
  isLoading,
}) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);

  const handleSelect = (id) => {
    if (item?.followed || item?.isJoined) {
      setVisible(true);
    } else {
      handleFollowUnFollow(id, `${!join ? "follow" : "join"}`);
    }
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => {
          navigationRoute &&
            navigation.navigate(navigationRoute, { id: item?.id });
        }}
      >
        <Flex algItems="center" gap={10}>
          <Image
            source={{
              uri:
                item?.profileImage ||
                item?.bannerImage ||
                placeholder_cover_img,
            }}
            style={styles.img}
          />
          <View style={{ width: "70%" }}>
            <Typography
              text={
                item.name ||
                item?.title ||
                item?.firstName + " " + item?.lastName
              }
              numberOfLines={1}
              semiBold
              color="#27272E"
              size={13}
            />
            <Typography
              text={item?.description || item?.about}
              color="#27272E"
              size={10}
              mT={3}
              numberOfLines={1}
            />
            {/* {ngo && <Typography text="23 Events" color="#A3A3A3" size={9} />} */}
          </View>
        </Flex>
      </TouchableOpacity>
      {/* {community && (
        <Flex gap={2} mt={9}>
          <GroupedAvatar />
          <Typography
            text="Brad and 13 others joined"
            color="#969696"
            size={11}
          />
        </Flex>
      )} */}
      {/* <PrimaryButton
        mt={9}
        height={28}
        textStyle={{ fontSize: 10 }}
        label={`${!join ? "Followed" : "Joined"}`}
        icon={
          true && (
            <Icon name="check" size={sizer.fontScale(8)} color={COLORS.white} />
          )
        }
      /> */}

      {!join&&<OutlineSelect
        inActiveText="Follow"
        item={item}
        activeText="Followed"
        onSelect={handleSelect}
        isSelected={item?.followed}
        isLoading={isLoading}
        textStyle={{ fontSize: sizer.fontScale(10) }}
        btnStyles={{
          height: sizer.moderateVerticalScale(28),
          marginTop: sizer.moderateVerticalScale(9),
        }}
      />}

      {item?.followed && (
        <Confirmation
          isVisible={isVisible}
          setVisible={setVisible}
          onPress={() => {
            handleFollowUnFollow(item?.id,"unfollow");
          }}
          leftLabel="Yes! unfollow" 
          action="unfollow"
        />
      )}
    </View>
  );
};

export default FollowingCard;

const styles = StyleSheet.create({
  main: {
    width: sizer.moderateScale(257),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: sizer.fontScale(24),
    paddingHorizontal: sizer.moderateScale(13),
    paddingVertical: sizer.moderateVerticalScale(13),
    marginTop: sizer.moderateVerticalScale(14),
    marginBottom: sizer.moderateVerticalScale(1),
  },
  img: {
    width: sizer.moderateScale(60),
    height: sizer.moderateScale(60),
    border: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
});
