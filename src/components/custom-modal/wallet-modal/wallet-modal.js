import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { Flex, Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { VoltzIconSmall } from "../../../assets";
import { useSelector } from "react-redux";
import { limitNumber } from "../../../utils/limit-number";

const WalletModal = ({ isVisible, setVisible = () => { } }) => {
  const { user } = useSelector((state) => state.storeReducer);
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible}>
      <View style={styles.container}>
        <Typography textAlign="center" bold size={19} mB={10}>
          Your Available Voltz
        </Typography>
        <Flex algItems={"center"}>
          <VoltzIconSmall
            width={sizer.moderateScale(80)}
            height={sizer.moderateVerticalScale(80)}
          />
          <Typography medium size={40} mT={10}>
            {limitNumber(user?.details?.wallet?.balance) || 0}
          </Typography>
        </Flex>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizer.moderateVerticalScale(20),
    paddingHorizontal: sizer.moderateScale(7),
    alignItems: "center",
  },
});
