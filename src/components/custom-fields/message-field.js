import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

import { SendIcon } from "../../assets";
import { sizer } from "../../helpers";
import { COLORS, baseOpacity } from "../../globals";
import { Flex } from "../../atom-components";
import { ActivityIndicator, Chip } from "react-native-paper";
import { useState } from "react";

const MessageField = ({
  messageSendHandler,
  messageText,
  setMessageText,
  sendLoading,
  participant,
  comment = false,
  placeholder = "Type your message here.",
}) => {
  const isInActive = participant?.activationStatus === 'inactive'

  const [inputHeight, setInputHeight] = useState(
    sizer.moderateVerticalScale(44)
  );

  const disabledBtn = () => {
    if (sendLoading || !(messageText || "")?.trim()) {
      return true;
    }
    return false;
  };

  return (
    <>

      {isInActive && divider()}
      <Flex
        gap={10}
        pt={10}
        pb={25}
        flexStyle={styles.main}
        extraStyles={
          comment && {
            backgroundColor: COLORS.white,
            paddingTop: sizer.moderateVerticalScale(16),
            paddingBottom: sizer.moderateVerticalScale(16),
          }
        }
      >

        <View style={[styles.container, { height: inputHeight }]}>
          {/* <SendDocument /> */}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={COLORS.text}
            style={[styles.input, { height: inputHeight }]}
            value={messageText}
            editable={!isInActive}
            multiline
            onContentSizeChange={(e) => {
              const newHeight =
                e.nativeEvent.contentSize.height +
                sizer.moderateVerticalScale(35);
              if (newHeight <= sizer.moderateVerticalScale(155)) {
                setInputHeight(newHeight);
              }
            }}
            onChangeText={(value) => {
              setMessageText(value);
            }}
          />
          {/* <EmojiIcon /> */}
        </View>
        <View style={styles.sendBtnContainer}>
          <TouchableOpacity
            activeOpacity={baseOpacity}
            style={[
              styles.sendBtn,
              { backgroundColor: disabledBtn() ? COLORS.greyV3 : COLORS.primary },
            ]}
            disabled={disabledBtn()}
            onPress={() => {
              messageSendHandler();
              // setMessageText("");
              if (!messageText) setInputHeight(sizer.moderateVerticalScale(44));
            }}
          >
            {sendLoading ? (
              <ActivityIndicator color={COLORS.white} size={20} />
            ) : (
              <SendIcon />
            )}
          </TouchableOpacity>
        </View>
      </Flex>
    </>
  );
};

export default MessageField;

const divider = () => {
  return (
    <View style={styles.divider}>
      <View style={styles.line} />
      <View>
        <Chip
          textStyle={{ color: COLORS.white }}
          style={{ backgroundColor: COLORS.dangerV1 }}
        >
          Inactive by admin
        </Chip>
      </View>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.lightblueV1,
    marginHorizontal: sizer.moderateScale(-15),
    paddingHorizontal: sizer.moderateScale(16),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#8E8E931F",
    borderRadius: sizer.fontScale(10),
    // paddingHorizontal: sizer.moderateScale(16),
    // height: sizer.moderateVerticalScale(43),
  },
  divider: {
    flexDirection: 'row',
    paddingTop: 29,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    backgroundColor: COLORS.whiteV2
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.greyV11,
  },
  input: {
    flex: 1,
    marginHorizontal: sizer.moderateScale(13),
    color: COLORS.black,
    // textAlignVertical: "top",
  },
  sendBtn: {
    width: sizer.moderateScale(48),
    height: sizer.moderateVerticalScale(47),
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
