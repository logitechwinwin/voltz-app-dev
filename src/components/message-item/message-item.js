import React, { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

import { Flex, Typography } from "../../atom-components";
import { sizer } from "../../helpers";
import { COLORS, CONSTANTS } from "../../globals";
import { Text } from "react-native-paper";

const MessageItem = React.memo(({ item }) => {
  const [textShow, setTextShown] = useState(false)
  const [numOfLines, setNumOfLines] = useState(20)
  const { user } = useSelector((state) => state.storeReducer);
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;


  const handleLinkPress = (url) => {
    Linking.openURL(url)
      .catch((err) => console.error('Failed to open URL', err));
  };
  const renderMessage = (messageText) => {
    const parts = messageText.split(urlRegex); // Split the message based on URLs
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // If part is a URL, make it clickable
        return (
          <Pressable onPress={() => handleLinkPress(part)}>
            <Typography
              size={13}
              style={{
                color: COLORS.link,
                textDecorationLine: 'underline'
              }}
              LineHeight={18}
              numberOfLines={numOfLines}
              endIcon={showMoreOrLess(textShow, setTextShown)}
              ellipsizeMode
              color={
                item.senderId == user?.details?.id ? COLORS.white : COLORS.black
              }
            >
              {part}
            </Typography>
          </Pressable>
        );
      } else {
        return (
          <Typography
            text={part}
            size={13}
            LineHeight={18}
            numberOfLines={numOfLines}
            endIcon={showMoreOrLess(textShow, setTextShown)}
            ellipsizeMode
            color={
              item.senderId == user?.details?.id ? COLORS.white : COLORS.black
            }
          />
        )
      }
    });
  };

  const formatDate = (dateString) => {
    const date = moment(dateString);

    if (date.isSame(moment(), "day")) {
      return `Today, ${date.format("hh:mm a")}`;
    } else {
      return date.format("MMM DD, hh:mm a");
    }
  };

  useEffect(() => {
    setNumOfLines(textShow ? undefined : 20)
  }, [textShow])

  return (
    <View
      style={{
        alignItems:
          item.senderId == user?.details?.id ? "flex-end" : "flex-start",
        marginTop: sizer.moderateVerticalScale(10),
      }}
    >
      <View style={styles.cont}>
        <View
          style={[
            styles.main,
            {
              backgroundColor:
                item.senderId == user?.details?.id
                  ? COLORS.primary
                  : COLORS.greyV4,
            },
          ]}
        >
          {renderMessage(item?.content)}

        </View>
      </View>

      <Flex algItems="center" gap={3} mt={5} jusContent="space-between">
        <Typography
          text={formatDate(item.createdAt)}
          size={10}
          color={COLORS.greyV3}
        />
        {item.senderId == user?.details?.id && (
          <Icon
            name="checkmark-done"
            size={sizer.fontScale(14)}
            color={item?.status === "read" ? COLORS.blue1 : COLORS.greyV3}
          />
        )}
      </Flex>
    </View>
  );
});

export default MessageItem;

const showMoreOrLess = (textShow, setTextShown) => {
  return (
    <Text
      onPress={() => setTextShown(!textShow)}
    >
      <Typography
        color={COLORS.blue1}
      >
        {textShow ? '...show less' : '...show more'}
      </Typography>
    </Text>
  )
}

const styles = StyleSheet.create({
  cont: {
    overflow: "hidden",
    marginRight: sizer.moderateScale(-CONSTANTS.containerPaddingX),
    paddingRight: sizer.moderateScale(CONSTANTS.containerPaddingX),
    marginLeft: sizer.moderateScale(-CONSTANTS.containerPaddingX),
    paddingLeft: sizer.moderateScale(CONSTANTS.containerPaddingX),
    marginTop: 3,
  },
  main: {
    maxWidth: "80%",
    paddingTop: sizer.moderateVerticalScale(14),
    paddingBottom: sizer.moderateVerticalScale(17),
    backgroundColor: "#EBEBEB",
    paddingHorizontal: sizer.moderateScale(16),
    justifyContent: "center",
    borderRadius: 6,
  },
});
