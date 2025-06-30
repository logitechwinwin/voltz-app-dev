import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { ChevronRightBold, EmptyCampaign } from "../../../assets";
import { EmptyState, Flex, Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import {
  baseOpacity,
  COLORS,
  placeholder_cover_img,
  placeholder_profile_img,
} from "../../../globals";
import { ListSkeleton } from "../../../components/skeleton-loaders";

const ChairtyList = ({
  charityData,
  onEndReached = () => {},
  perPage,
  loading,
  page,
  typingLoading,
}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => navigation.navigate("CharityProfile", { id: item?.id })}
      >
        <Flex
          flexStyle={{ marginTop: sizer.moderateVerticalScale(15) }}
          algItems="center"
          jusContent="space-between"
        >
          <Flex flexStyle={{ alignItems: "center" }}>
            <Avatar.Image
              style={{ backgroundColor: COLORS.white }}
              source={{ uri: item?.bannerImage || placeholder_cover_img }}
            />
            <View style={{ marginLeft: sizer.moderateScale(15), width: "70%" }}>
              <Typography text={item.title} semiBold numberOfLines={1} />
              <Typography
                text={item.description}
                color="#757575"
                size={12}
                numberOfLines={2}
              />
            </View>
          </Flex>

          <Flex
            algItems="center"
            flexStyle={{
              position: "absolute",
              right: 0,
            }}
          >
            <ChevronRightBold />
          </Flex>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FlatList
        data={charityData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: charityData?.length ? 0 : 1,
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          loading || typingLoading ? (
            <ListSkeleton />
          ) : (
            <EmptyState message={"No data Found"} />
          )
        }
        onEndReached={() => onEndReached()}
        ListFooterComponent={
          (loading || typingLoading) && charityData?.length && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        initialNumToRender={perPage}
        maxToRenderPerBatch={perPage}
        windowSize={9}
        getItemLayout={(data, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  emptyData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChairtyList;
