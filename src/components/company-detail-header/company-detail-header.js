import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ProfileHeader from "../profile-header/profile-header";
import { Flex, Typography } from "../../atom-components";
import { ProfileLoactionIcon, ShareIconV2, World } from "../../assets";
import OutlineButton from "../custom-buttons/outline-button/outline-button";
import ProfileHeaderStatus from "../profile-header-status/profile-header-status";
import { baseOpacity, COLORS } from "../../globals";
import { ViewAll } from "../../screens/today/shared";
import { useNavigation } from "@react-navigation/native";
import { sizer } from "../../helpers";
import Confirmation from "../custom-modal/confirmation-modal";
import { onShareLink } from "../../utils";

const CompanyDetailHeader = ({
  companyData = {},
  follow,
  isLoading,
  handleFollow = () => { },
  goalAchieved,
  id,
}) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  return (
    <>
      <ProfileHeader
        profileImg={{ uri: companyData?.profileImage }}
        coverImg={{ uri: companyData?.bannerImage }}
        pH={10}

      >
        <Flex direction={'column'} gap={1}>
          <Typography
            text={`${companyData?.name}`}
            color={COLORS.blackV2}
            bold
            size={24}
          />
          {companyData?.country && (
            <Flex gap={6} mt={6} extraStyles={{ marginRight: 16 }}>
              <ProfileLoactionIcon style={{ marginTop: 2 }} />
              <Typography
                text={`${companyData.country}, ${companyData.state}, ${companyData.city}`}
                size={12}
                color={COLORS.blackV2}
              />
            </Flex>
          )}

          <Flex gap={6} mt={8} algItems="center" >
            <OutlineButton
              label={follow ? "Followed" : "Follow"}
              mt={0}
              active={follow}
              isLoading={isLoading}
              onPress={() => {
                if (!follow) {
                  handleFollow(companyData?.id, "follow");
                } else {
                  setVisible(true);
                }
              }}
            />
            <TouchableOpacity
              activeOpacity={baseOpacity}
              onPress={() =>
                onShareLink({
                  page: "company",
                  id: id,
                  message: "Check out this company in voltz",
                })
              }
            >
              <ShareIconV2 />
            </TouchableOpacity>
          </Flex>

          <ProfileHeaderStatus goalAchieved={goalAchieved} />
          {companyData?.about && (
            <>
              <Typography text="About" mT={24} bold color={COLORS.blackV1} />
              <Typography
                size={12}
                mT={16}
                LineHeight={18}
                color={COLORS.text}
                text={companyData?.about}
              />
            </>
          )}
        </Flex>
      </ProfileHeader>
      <View style={{ paddingHorizontal: sizer.moderateScale(16) }}>
        <ViewAll
          label="All Deals"
          fontBold
          mt={0}
          mb={2}
          pH
          onPress={() => navigation.navigate("Deals")}
        />

        {follow && (
          <Confirmation
            isVisible={isVisible}
            setVisible={setVisible}
            onPress={() => {
              handleFollow(companyData?.id, "unfollow");
            }}
            leftLabel="Yes! unfollow"
            leave="company"
            action="unfollow"
          />
        )}
      </View>
    </>
  );
};

export default CompanyDetailHeader;

const styles = StyleSheet.create({});
