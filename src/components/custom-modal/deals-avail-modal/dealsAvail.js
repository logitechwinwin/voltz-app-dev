import { StyleSheet, View } from "react-native";

import { Flex, Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { ModalWrapper, OutlineButton } from "../../index";
import { DealsAvailSucess } from "../../../assets";

const DealsAvail = ({ isVisible, setVisible }) => {
  return (
    <ModalWrapper
      mH={65}
      isVisible={isVisible}
      setVisible={setVisible}
      pH={26}
      pT={21}
      pB={23}
    >
      <Typography text="Your request has been sent to the company" bold textAlign="center"/>
      <View style={styles.imageView}>
        <DealsAvailSucess />
      </View>

      <Flex mt={5}>
        <OutlineButton label="OK" onPress={() => setVisible(false)} />
      </Flex>
    </ModalWrapper>
  );
};

export default DealsAvail;

const styles = StyleSheet.create({
  imageView: {
    marginTop: sizer.moderateVerticalScale(12),
    alignItems: "center",
  },
});
