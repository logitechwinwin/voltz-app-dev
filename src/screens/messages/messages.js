import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { Container, EmptyState } from "../../atom-components";
import { Header, SearchField } from "../../components";
import { COLORS, CONSTANTS } from "../../globals";
import { sizer } from "../../helpers";
import { openToast } from "../../store/reducer";
import { ListSkeleton } from "../../components/skeleton-loaders";
import ChatItem from "./chat-item";
import ApiManager from "../../helpers/api-manager";
import { useSocket } from "../../contexts/socket-context";
import format from "pretty-format";

const Messages = () => {
  const [allChats, setAllChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingLoading, setTypingLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  // const [shouldFetch, setShouldFetch] = useState(true);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { socket } = useSocket();

  const getAllChats = async () => {
    setIsLoading(true);
    try {
      const { data } = await ApiManager("get", `chat?search=${searchVal}`);
      setAllChats(data?.response?.details);
    } catch (error) {
      console.log("error", error?.response?.data);
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllChats();
  }, [isFocused, searchVal]);

  const sortedData = allChats?.sort((a, b) => {
    return new Date(b?.lastMessageSentAt) - new Date(a?.lastMessageSentAt);
  });

  useEffect(() => {
    if (searchVal) {
      setAllChats([]);
      // setPage(1);
    }
  }, [searchVal]);

  useEffect(() => {
    if (socket) {
      socket.on("onMessage", (message) => {
        setAllChats((prevChats) => {
          const chatExists = prevChats.some(
            (chat) => chat.id === message.chat.id
          );

          if (chatExists) {
            return prevChats.map((chat) => {
              if (chat.id === message.chat.id) {
                return {
                  ...chat,
                  lastMessageSent: message?.chat?.lastMessageSent,
                  unreadCount: message?.chat?.unreadCount,
                  lastMessageSentAt: message?.chat?.lastMessageSentAt,
                };
              }
              return chat;
            });
          } else {
            console.log("Adding new chat:", message.chat);
            return [
              {
                id: message.chat.id,
                lastMessageSent: message.chat.lastMessageSent,
                lastMessageSentAt: message?.chat?.lastMessageSentAt,
              },
              ...prevChats,
            ];
          }
        });
      });
    } else {
      console.log("Socket is not available");
    }
  }, [socket, isFocused]);

  return (
    <Container>
      <Header back />

      <SearchField
        value={searchVal}
        setValue={setSearchVal}
        setLoading={setTypingLoading}
        setData={setAllChats}
      />
      {/* <TouchableOpacity
        activeOpacity={baseOpacity}
        style={styles.newMessageIcon}
      >
        <MessageIconFilled />
      </TouchableOpacity> */}
      <FlatList
        data={sortedData}
        renderItem={({ item }) => {
          return <ChatItem item={item} socket={socket} />;
        }}
        ListEmptyComponent={
          isLoading ? (
            <View style={{ paddingHorizontal: 14 }}>
              <ListSkeleton />
            </View>
          ) : (
            <EmptyState message={"No Chats Found"} />
          )
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: allChats?.length ? 0 : 1 }}
        style={{
          backgroundColor: COLORS.lightblueV1,
          marginTop: sizer.moderateVerticalScale(16),
          paddingTop: sizer.moderateVerticalScale(24),
          marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
          // paddingHorizontal: sizer.moderateScale(
          //   isLoading ? CONSTANTS.containerPaddingX : 0
          // ),
        }}
      />
    </Container>
  );
};

export default Messages;

const styles = StyleSheet.create({
  newMessageIcon: {
    width: sizer.moderateScale(56),
    height: sizer.moderateScale(56),
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: sizer.moderateVerticalScale(18),
    right: sizer.moderateScale(16),
    borderRadius: 50,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});
