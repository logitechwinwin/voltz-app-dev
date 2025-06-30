import { StyleSheet, TouchableOpacity } from "react-native";
import {
  CustomDropdown,
  InputField,
  ModalWrapper,
  OutlineButton,
} from "../../index";
import { Flex, Typography } from "../../../atom-components";
import { CrossIcon } from "../../../assets";
import { COLORS, baseOpacity } from "../../../globals";

const AdjustTarget = ({
  isVisible,
  setVisible = () => {},
  setValue = () => {},
  value,
  handleSetGoal = () => {},
  currentMonthGoalData
}) => {
  return (
    <ModalWrapper
      isVisible={isVisible}
      setVisible={setVisible}
      pT={21}
      pH={30}
      mH={40}
    >
      <TouchableOpacity
        activeOpacity={baseOpacity}
        style={{ alignSelf: "flex-end" }}
        onPress={() => {
          setVisible(false);
        }}
      >
        <CrossIcon />
      </TouchableOpacity>
      <Typography text="Adjust my target" medium textAlign="center" mT={13} />
      <Typography
        text="Enter the hours"
        size={14}
        mT={8}
        mB={26}
        medium
        textAlign="center"
        color={COLORS.greyV10}
      />
      <InputField
        mT={5}
        label="Hours"
        value={value}
        maxLength={10}
        handleChange={(e) => setValue(e)}
        numPad
        contextMenuHidden={true}
      />
      <Flex mb={23} mt={16}>
        <OutlineButton
          disabled={!value?.toString().trim()}
          label="OK"
          onPress={() => handleSetGoal()}
        />
      </Flex>
    </ModalWrapper>
  );
};

export default AdjustTarget;

const styles = StyleSheet.create({});
