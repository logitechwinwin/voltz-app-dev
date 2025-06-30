import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";

import { Container, EmptyState, Flex, Typography } from "../../atom-components";
import { HeaderWithTitle, MessageField, MessageItem } from "../../components";
import { sizer } from "../../helpers";
import { COLORS, CONSTANTS } from "../../globals";
import { openToast } from "../../store/reducer";
import { useSocket } from "../../contexts/socket-context";
import ApiManager from "../../helpers/api-manager";
import format from "pretty-format";

const ChatScreen = ({ route }) => {
  const { userId, participant, name } = route?.params ?? {};
  const [data, setData] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [stopApi, setStopApi] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [sendLoading, setSentLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(route?.params?.chatId || null);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const perPage = 50;
  const isVolunteer = participant?.role === 'volunteer'
  const getChatId = async () => {
    try {
      const { data } = await ApiManager("get", `chat/${userId}`);
      if (data?.response?.details?.id) {
        setChatId(data?.response?.details?.id);
      }
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  };

  const getUserChat = async (id = null, messageId = "") => {
    setIsLoading(true);
    try {
      if (stopApi) {
        setStopApi(false);
        const { data } = await ApiManager(
          "get",
          `chat/messages?chatId=${id || chatId
          }&limit=${perPage}&lastMessageId=${messageId}`
        );
        if (!data?.response?.details?.items?.length) {
          setHasMore(false);
        }
        setData((prev) => [...prev, ...data?.response?.details?.items]);
        setStopApi(true);
      }
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const messageSendHandler = async () => {
    setSentLoading(true);
    try {
      let { data: responseData } = await ApiManager(
        "post",
        `chat/send-message`,
        {
          content: messageText,
          recipientId: userId,
        }
      );
      const { lastMessageSent } = responseData?.response?.details?.chat;

      setData([
        {
          senderId: responseData?.response?.details?.message?.sender?.id,
          content: lastMessageSent?.content,
          createdAt: lastMessageSent?.createdAt,
        },
        ...data,
      ]);
      setMessageText('')
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setSentLoading(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      getUserChat();
    } else {
      getChatId();
    }
  }, [chatId]);

  const handleMessageRead = (message) => {
    setData((prevMessages) =>
      prevMessages.map((msg) => {
        return { ...msg, status: "read" };
      })
    );
  };

  useEffect(() => {
    if (socket) {
      socket.on("onMessage", (message) => {
        if (message?.chat?.id == chatId) {
          socket.emit("onMessageMarkAsRead", { chatId: chatId });
          setData((prevMessages) => [message?.message, ...prevMessages]);
        }
      });
      socket.on("onMessageRead", handleMessageRead);
    }

    return () => {
      if (socket) {
        console.log("listener off andar wla");
        socket.off("onMessage");
        socket.off("onMessageRead", handleMessageRead);
        socket.emit("onChatLeave", { chatId: chatId });
      }
    };
  }, [socket]);

  const timestamp = participant?.lastOnline;
  const now = moment();
  const time = moment(timestamp);
  let formattedTime = "";

  if (now.isSame(time, "day")) {
    formattedTime = `Last seen today at ${time.format("h:mm A")}`;
  } else if (now.subtract(1, "days").isSame(time, "day")) {
    formattedTime = `Last seen yesterday at ${time.format("h:mm A")}`;
  } else {
    formattedTime = `Last seen on ${time.format("MMMM D, YYYY [at] h:mm A")}`;
  }

  return (
    <Container>
      <HeaderWithTitle
        label={participant && (isVolunteer ? participant?.firstName + " " + participant?.lastName : participant?.name) || name && name || "User"}
      />
      <Flex
        flexStyle={{ flexDirection: "column" }}
        jusContent="center"
        algItems="center"
      >
        <Flex algItems="center" gap={6}>
          {participant?.isOnline && <View style={styles.activeStatusDot} />}
          <Typography
            text={participant?.isOnline ? "Online" : formattedTime}
            size={12}
            color={COLORS.blackV1}
            semiBold
          />
        </Flex>
      </Flex>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return <MessageItem item={item} participant={participant} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          inverted
          ListFooterComponent={data.length && isLoading && <ActivityIndicator />}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator size={40} style={styles.empty} />
            ) : (
              <EmptyState message={"No Data Found"} />
            )
          }
          contentContainerStyle={[
            styles.containerStyle,
            {
              flex: data?.length ? 0 : 1,
            },
          ]}
          onEndReached={() => {
            if (data.length >= perPage && hasMore) {
              getUserChat(chatId, data[data?.length - 1]?.id);
            }
          }}
          onEndReachedThreshold={0.6}
          initialNumToRender={perPage}
          maxToRenderPerBatch={perPage}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        behavior={Platform.OS === 'ios' ? "position" : "height"} >
        <MessageField
          messageText={messageText}
          participant={participant}
          rightIcon
          setMessageText={setMessageText}
          messageSendHandler={messageSendHandler}
          sendLoading={sendLoading}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  activeStatusDot: {
    width: sizer.moderateScale(5),
    height: sizer.moderateScale(5),
    backgroundColor: COLORS.green,
    borderRadius: 50,
  },
  flatListStyle: {
    flex: 1,
    backgroundColor: COLORS.lightblueV1,
    marginTop: sizer.moderateScale(10),
    marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
  },
  containerStyle: {
    paddingBottom: sizer.moderateVerticalScale(23),
    paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
  },
  empty: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});
