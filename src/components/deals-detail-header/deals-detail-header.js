import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Flex, Typography } from "../../atom-components";
import { sizer } from "../../helpers";
import {
  baseOpacity,
  COLORS,
  CONSTANTS,
  placeholder_cover_img,
  placeholder_profile_img,
} from "../../globals";
import OutlineButton from "../custom-buttons/outline-button/outline-button";
import LikeAndShare from "../like-and-share/like-and-share";
import { ViewAll } from "../../screens/today/shared";
import { useNavigation } from "@react-navigation/native";
import { ShareIconV2, VoltzIconSmall } from "../../assets";
import PrimaryButton from "../custom-buttons/primary-button/primary-button";
import ProductDetail from "../custom-modal/product-delete/product-delete";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useCheckLoginStatus } from "../../hooks";
import { onShareLink } from "../../utils";

const DealsDetailHeader = ({
  dealData = {},
  suggestedDealsData = [],
  handleSave = () => { },
  setConfirm = () => { },
  saved,
  companyId,
  id,
}) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const { checkLoginStatus } = useCheckLoginStatus();
  return (
    <>
      <View style={styles.main}>
        <Image
          source={{ uri: dealData?.bannerImage || placeholder_cover_img }}
          style={styles.coverImg}
        />
        <View style={styles.discountView}>
          <Typography
            text={`${dealData?.discountAmount}${dealData?.discountType === "percentage" ? "%" : ""
              } Off`}
            size={12}
            bold
            color={COLORS.secondary}
          />
        </View>

        <View style={{ marginHorizontal: sizer.moderateScale(16) }}>
          <Flex
            mt={15}
            gap={10}
            algItems={'center'}
          >
            <Typography
              text={dealData?.dealName}
              size={24}
              bold
              color={COLORS.blackV2}
            />

            <Flex gap={8}>
              <Typography
                text={`$${dealData?.dealAmount}`}
                size={20}
                medium
                style={{ textDecorationLine: 'line-through' }}
                color={COLORS.greyV3}
              />
              <Typography
                text={`$${dealData?.dealAmountAfterDiscount}`}
                size={20}
                semiBold
                color={COLORS.blackV2}
              />
            </Flex>
          </Flex>
          <TouchableOpacity
            activeOpacity={baseOpacity}
            onPress={() =>
              navigation.navigate("CompanyProfile", { id: companyId })
            }
          >
            <Flex algItems="center" gap={8} mt={8}>
              <Image
                source={{
                  uri: dealData?.user?.profileImage || placeholder_profile_img,
                }}
                style={{
                  width: sizer.moderateScale(26),
                  height: sizer.moderateScale(26),
                  borderRadius: 50,
                }}
              />
              <Typography
                text={dealData?.user?.name}
                medium
                color={COLORS.blackV2}
              />
            </Flex>
          </TouchableOpacity>

          <Flex gap={12} mt={16} algItems="center">
            <OutlineButton
              onPress={() => checkLoginStatus() && setConfirm(true)}
              label={`Redeem for ${dealData?.voltzRequired}`}
              icon={<VoltzIconSmall />}
              mt={0}
            />

            <Flex gap={2} algItems={'center'}>
              <TouchableOpacity
                onPress={() =>
                  checkLoginStatus() && handleSave(dealData?.id, saved)
                }
                activeOpacity={baseOpacity}
              >
                <AntIcon
                  name={saved ? "heart" : "hearto"}
                  size={sizer.moderateScale(25)}
                  color={saved ? COLORS.dangerV1 : "#757575"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={baseOpacity}
                onPress={() =>
                  onShareLink({
                    page: "deal",
                    id: id,
                    message: "Check out this deal in voltz",
                  })
                }
              >
                <ShareIconV2 />
              </TouchableOpacity>
            </Flex>
          </Flex>

          <Typography
            text={'About'}
            mT={15}
            bold
            color={COLORS.blackV2}
          />
          <Typography
            text={dealData?.about}
            mT={10}
            numberOfLines={8}
            color={COLORS.blackV2}
            size={12}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: sizer.moderateScale(14) }}>
        <ViewAll
          label="Products"
          fontBold
          showViewAll={suggestedDealsData?.length > 1 ? true : false}
        />
        <FlatList
          data={dealData?.products || []}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={baseOpacity}
                onPress={() => {
                  setVisible(true);
                }}
                style={{
                  marginTop: sizer.moderateVerticalScale(1),
                  marginBottom: sizer.moderateVerticalScale(24),
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  backgroundColor: COLORS.white,
                  borderRadius: 12,
                  marginHorizontal: sizer.moderateVerticalScale(2),
                  paddingLeft: sizer.moderateVerticalScale(5),
                  paddingRight: sizer.moderateVerticalScale(8),
                  gap: sizer.moderateScale(12),
                  flexDirection: "row",
                  paddingVertical: sizer.moderateVerticalScale(7),
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={styles.productImg}
                />

                <View style={{ flex: 1 }}>
                  <Typography text={item?.name} {...styles.title} />
                  <Typography
                    text={`${item?.description}`}
                    size={12}
                    numberOfLines={4}
                    light
                  />

                  <Typography
                    text={`Price: $${item?.price}`}
                    size={14}
                    semiBold
                  />
                </View>

                <ProductDetail
                  isVisible={isVisible}
                  setVisible={setVisible}
                  data={item}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: dealData?.products?.length ? 0 : 1,
            paddingBottom: 20,
          }}
          // ListEmptyComponent={
          //   suggestedDealsLoading ? (
          //     <CardSkeleton />
          //   ) : (
          //     <EmptyState
          //       message="No Suggested Deals Found"
          //       width={150}
          //       height={150}
          //     />
          //   )
          // }
          // windowSize={9}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index,
          })}
        />
      </View>

      <View style={{ paddingHorizontal: sizer.moderateScale(14) }}>
        <ViewAll
          label="You May Like"
          fontBold
          showViewAll={suggestedDealsData?.length > 1 ? true : false}
        />
      </View>
    </>
  );
};

export default DealsDetailHeader;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
    paddingBottom: sizer.moderateVerticalScale(16),
    borderBottomLeftRadius: sizer.fontScale(16),
    borderBottomRightRadius: sizer.fontScale(16),
    overflow: "hidden",
    paddingHorizontal: sizer.moderateScale(14),
  },
  coverImg: { height: sizer.moderateVerticalScale(158), width: "100%" },
  productImg: {
    width: sizer.moderateScale(146),
    height: sizer.moderateVerticalScale(99),
    borderRadius: sizer.fontScale(8),
    objectFit: "fill",
  },
  title: {
    size: 15,
    // semiBold: true,
    bold: true,
    numberOfLines: 1,
    ellipsizeMode: true,
    mR: 10,
  },
  discountView: {
    position: "absolute",
    top: sizer.moderateVerticalScale(20),
    left: sizer.moderateScale(20),
    width: sizer.moderateScale(65),
    height: sizer.moderateVerticalScale(24),
    backgroundColor: COLORS.white,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
