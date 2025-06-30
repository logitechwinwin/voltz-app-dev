import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import { CrossIcon } from "../../../assets";
import { sizer } from "../../../helpers";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import PrimaryButton from "../../custom-buttons/primary-button/primary-button";
import DonationModal from "../donate-modal/donation-modal";

const UrgentDontaion = ({ isVisible, setVisible, setDonationModal }) => {
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible} pH={0} pB={34}>
      <TouchableOpacity
        activeOpacity={baseOpacity}
        style={styles.cross}
        onPress={() => {
          setVisible(false);
        }}
      >
        <CrossIcon />
      </TouchableOpacity>
      <Image
        source={require("../../../assets/images/urgent-donation.png")}
        style={{ height: 196, width: "100%" }}
      />
      <View style={{ paddingHorizontal: 22 }}>
        <Typography
          text="Urgent Donation Required"
          bold
          textAlign="center"
          mT={30}
        />
        <Typography
          size={12}
          medium
          textAlign="center"
          color={COLORS.greyV6}
          mT={6}
          LineHeight={14}
          text="We’re glad to have you onboard. Here are some tips and tricks to get you up and running. We’re glad to have you onboard. Here are some tips and tricks to get you"
        />

        <PrimaryButton
          label="Donate Now"
          onPress={() => {
            setTimeout(() => {
              setDonationModal(true);
            }, 0);
            setVisible(false);
          }}
          textStyle={{ fontSize: 14, fontWeight: "600" }}
          height={32}
          mt={24}
        />
      </View>
    </ModalWrapper>
  );
};

export default UrgentDontaion;

const styles = StyleSheet.create({
  cross: {
    position: "absolute",
    top: sizer.moderateVerticalScale(17),
    right: sizer.moderateScale(19),
    zIndex: 2,
  },
});
