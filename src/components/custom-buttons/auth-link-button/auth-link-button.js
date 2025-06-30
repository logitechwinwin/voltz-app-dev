import React from "react";
import { TouchableOpacity } from "react-native";

import { Flex, Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";

export default function AuthLinkButton({
  text = "",
  btnText = "",
  mT = 0,
  mB = 0,
  onPress = () => { },
  jusContent = "",
  btnDisable = false,
  timerValue = ""
}) {
  return (
    <Flex mt={mT} mb={mB} jusContent={jusContent}>
      <Typography size={14} color={COLORS.textV1}>{`${text} `}</Typography>
      <Flex gap={10}>
        <TouchableOpacity
          activeOpacity={baseOpacity}
          onPress={onPress}
          disabled={btnDisable}
        >
          <Typography
            size={14}
            color={btnDisable ? COLORS.greyV10 : COLORS.secondary}
          >
            {btnText}
          </Typography>
        </TouchableOpacity>
        {timerValue !== "" && <Typography text={timerValue} size={14} bold />}
      </Flex>
    </Flex>
  );
}
