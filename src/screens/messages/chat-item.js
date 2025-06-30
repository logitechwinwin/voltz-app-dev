import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

import { Flex, Typography } from "../../atom-components";
import { COLORS, baseOpacity, placeholder_profile_img } from "../../globals";
import { sizer } from "../../helpers";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import moment from "moment";

const ChatItem = ({ item, socket }) => {
  const { user: CurrentUser } = useSelector((state) => state.storeReducer);
  const navigation = useNavigation();
  // const { socket } = useSocket();

  const participant = useMemo(() => {
    return item?.participants?.find(
      (user) => user?.user?.id !== CurrentUser?.details?.id
    )?.user;
  }, [item, CurrentUser]);

  const isVolunteer = participant?.role === 'volunteer'

  const formatDate = (dateString) => {
    const date = moment(dateString);

    if (date.isSame(moment(), "day")) {
      return `Today, ${date.format("hh:mm a")}`;
    } else {
      return date.format("MMM DD, hh:mm a");
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={baseOpacity}
      style={styles.main}
      onPress={() => {
        if (socket) {
          socket.emit("onChatJoin", { chatId: item?.id });
          socket.emit("onMessageMarkAsRead", { chatId: item?.id });
        }
        navigation.navigate("ChatScreen", {
          chatId: item?.id,
          userId: participant?.id,
          participant: participant,
        });

        socket.off("onMessage");
      }}
    >
      <Flex gap={12} algItems="center">
        <Avatar.Image
          style={{ backgroundColor: "white" }}
          source={{ uri: participant?.profileImage || placeholder_profile_img }}
        />
        <Flex jusContent="space-between" flexStyle={{ flex: 1 }}>
          <View style={{ width: "68%" }}>
            <Typography
              text={
                isVolunteer ?
                  participant?.firstName + " " + participant?.lastName :
                  participant?.name
                  || "user"
              }
              semiBold
              numberOfLines={1}
            />
            <Typography
              text={item?.lastMessageSent?.content}
              numberOfLines={2}
              size={11}
            />
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Typography
              text={formatDate(item?.lastMessageSentAt)}
              size={10}
              color={COLORS.greyV3}
              numberOfLines={1}
              mB={2}
            />

            {Number(item?.unreadCount) !== 0 && (
              <View style={styles.numberOfMessages}>
                <Typography
                  text={item?.unreadCount > 9 ? "9+" : item?.unreadCount}
                  size={12}
                  medium
                  color={COLORS.white}
                />
              </View>
            )}
          </View>
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  main: {
    marginBottom: sizer.moderateVerticalScale(22),
    paddingHorizontal: sizer.moderateScale(16),
  },
  numberOfMessages: {
    width: sizer.moderateScale(21),
    height: sizer.moderateScale(21),
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
