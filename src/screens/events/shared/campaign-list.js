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

import {
  CampaignNoIcon,
  ChevronRightBold,
  EmptyCampaign,
} from "../../../assets";
import { EmptyState, Flex, Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { sizer } from "../../../helpers";
import { ListSkeleton } from "../../../components/skeleton-loaders";
import CampaignStatus from "../../../atom-components/campaign-status";
import { formatNumber } from "../../../utils";

const CampaignList = ({
  campaignData,
  onEndReached = () => {},
  perPage,
  loading,
  page,
  typingLoading,
}) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const campaignStatus = CampaignStatus(item);
    return (
      <TouchableOpacity
        activeOpacity={baseOpacity}
        onPress={() => navigation.navigate("CampaignProfile", { id: item?.id, source: 'campaigns' })}
      >
        <Flex
          flexStyle={{ marginTop: sizer.moderateVerticalScale(15) }}
          algItems="center"
          jusContent="space-between"
        >
          <Flex flexStyle={{ alignItems: "center" }}>
            <Avatar.Image source={{ uri: item.bannerImage }} />
            <View style={{ marginLeft: sizer.moderateScale(15), width: "56%" }}>
              <Typography text={item.title} numberOfLines={1} semiBold />
              <Typography
                color={campaignStatus?.color}
                semiBold
                size={14}
                mT={3}
              >
                {campaignStatus?.status}
              </Typography>
            </View>
          </Flex>

          <Flex algItems="center" flexStyle={styles.rightIcons}>
            <Flex flexStyle={styles.rightChip} algItems="center" gap={4}>
              <Typography text={formatNumber(item.voltzPerHour)} />
              <CampaignNoIcon />
            </Flex>
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
        data={campaignData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: campaignData?.length ? 0 : 1,
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          loading || typingLoading ? (
            <ListSkeleton />
          ) : (
            <EmptyState message={"No Events Found"} />
          )
        }
        ListFooterComponent={
          (loading || typingLoading) && campaignData?.length && page > 1 ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
        onEndReached={() => onEndReached()}
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

export default CampaignList;

const styles = StyleSheet.create({
  rightChip: {
    width: sizer.moderateScale(68),
    height: sizer.moderateVerticalScale(42),
    backgroundColor: "#F2F2F7CC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: sizer.moderateScale(22),
  },
  rightIcons: {
    position: "absolute",
    right: 0,
  },
});
