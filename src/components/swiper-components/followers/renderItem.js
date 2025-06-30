import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { Flex, Typography } from "../../../atom-components";
import { ChevronRightBold } from "../../../assets";
import { COLORS, baseOpacity, placeholder_profile_img } from "../../../globals";
import { sizer } from "../../../helpers";

const RenderItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={baseOpacity}
      onPress={() => {
        navigation.push("VolunteerProfile", {
          id: item?.user?.id || item?.id,
        });
      }}
    >
      <Flex
        gap={8}
        flexStyle={{ marginBottom: sizer.moderateVerticalScale(27) }}
        algItems="center"
        jusContent="space-between"
      >
        <Flex flexStyle={{ alignItems: "center" }} gap={8}>
          {false && (
            <LinearGradient
              colors={[COLORS.green, COLORS.primary]}
              start={{ x: 1, y: 0.01 }}
              style={styles.linearGradient}
            >
              <View style={styles.imageView}>
                <Avatar.Image
                  source={{
                    uri:
                      item?.profileImage ||
                      item?.user?.profileImage ||
                      placeholder_profile_img,
                  }}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
            </LinearGradient>
          )}
          {true && (
            <Avatar.Image
              source={{
                uri:
                  item?.profileImage ||
                  item?.user?.profileImage ||
                  placeholder_profile_img,
              }}
              style={{ backgroundColor: "transparent" }}
            />
          )}
          <View style={{ width: "75%" }}>
            <Typography
              text={
                (item?.firstName || item?.user?.firstName) +
                " " +
                (item?.lastName || item?.user?.lastName)
              }
              semiBold
              numberOfLines={1}
            />
            <Typography
              text={item?.about || item?.user?.about}
              color={COLORS.greyV6}
              size={12}
              numberOfLines={2}
            />
          </View>
        </Flex>

        <View
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <ChevronRightBold />
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  linearGradient: {
    padding: sizer.moderateScale(2),
    backgroundColor: "pink",
    borderRadius: 50,
  },
  imageView: {
    padding: sizer.moderateScale(1),
    backgroundColor: "white",
    borderRadius: 50,
  },
});
