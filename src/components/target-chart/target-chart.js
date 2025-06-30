import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { styles } from "./styles";
import {
  AdjustTarget,
  CategorySelect,
  HalfCircleProgress,
  PrimaryButton,
} from "../";
import { Flex, Typography } from "../../atom-components";
import { COLORS } from "../../globals";
import { sizer } from "../../helpers";
import ApiManager from "../../helpers/api-manager";
import { useDispatch } from "react-redux";
import { openToast, toggleLoader } from "../../store/reducer";
import format from "pretty-format";
import { formatNumber } from "../../utils";

export default function TargetChart({ mt = 0, mb = 0, isMyProfile, userId }) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [goalSates, setGoalSates] = useState([]);
  const [currentMonthGoal, setCurrentMonthGoal] = useState([]);
  const [selectCategory, setSelectCategory] = useState("1M");
  const dispatch = useDispatch();

  const handleSetGoal = async () => {
    setVisible(false);
    // setValue("");
    dispatch(toggleLoader(true));
    try {
      const { data } = await ApiManager(
        !!currentMonthGoal?.length ? "patch" : "post",
        !!currentMonthGoal?.length ? `goal/${currentMonthGoal[0]?.id}` : `goal`,
        {
          workingHours: value,
        }
      );
      handleGetCurrentMonthGoal();
      dispatch(openToast({ type: "success", message: data?.message }));
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleGetCurrentMonthGoal = async () => {
    dispatch(toggleLoader(true));
    try {
      const { data } = await ApiManager(
        "get",
        `goal?currentMonth=true&userId=${userId}`
      );
      setCurrentMonthGoal(data?.response?.details?.items);
      if (data?.response?.details?.items?.length) {
        setValue(data?.response?.details?.items[0]?.workingHours?.toString());
      }
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleGetGoalState = async (duration) => {
    try {
      const { data } = await ApiManager(
        "get",
        `goal/stats?userId=${userId}&duration=${duration == "ALL" ? "all" : duration
        }`
      );
      setGoalSates(data?.response?.details);
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  };

  function formatDuration(duration) {
    if (duration.endsWith("M")) {
      const months = duration.slice(0, -1);
      return `${months} ${months === "1" ? "Month" : "Months"}`;
    } else if (duration.endsWith("Y")) {
      const years = duration.slice(0, -1);
      return `${years} ${years === "1" ? "Year" : "Years"}`;
    } else {
      return duration;
    }
  }

  useEffect(() => {
    if (userId) handleGetGoalState(selectCategory);
  }, [selectCategory, currentMonthGoal, userId]);

  useEffect(() => {
    if (userId) handleGetCurrentMonthGoal();
  }, [userId]);

  return (
    <View
      style={[
        styles.cardContainer,
        {
          marginTop: sizer.moderateVerticalScale(mt),
          marginBottom: sizer.moderateVerticalScale(mb),
        },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Typography
          textAlign="center"
          text={`Completed ${goalSates?.totalWorkingHours || 0} of ${goalSates?.totalHours || 0
            } volunteer hours ${formatDuration(selectCategory) == "ALL"
              ? ""
              : "for the next " + formatDuration(selectCategory)
            }`}
          {...styles.topTitle}
        />
        <HalfCircleProgress
          progress={Math.min(goalSates?.percentage || 0, 100) || 0}
          strokeWidth={10}
        />
        <Flex
          jusContent="space-between"
          mt={8}
          flexStyle={{
            width: sizer.moderateScale(300),
          }}
        >
          <HoursRange value={goalSates?.totalWorkingHours || 0} />
          <HoursRange value={goalSates?.totalHours || 0} />
        </Flex>
      </View>
      <CategorySelect select={selectCategory} onSelect={setSelectCategory} />
      {isMyProfile && (
        <PrimaryButton
          label={`${!!currentMonthGoal?.length ? "Update" : "Adjust"
            } my target`}
          height={40}
          btnStyle={styles.btn}
          textStyle={styles.btnText}
          mt={36}
          onPress={() => {
            setVisible(true);
          }}
        />
      )}

      <AdjustTarget
        isVisible={visible}
        setVisible={setVisible}
        setValue={setValue}
        value={value}
        handleSetGoal={handleSetGoal}
        currentMonthGoalData={currentMonthGoal}
      />
    </View>
  );
}

const HoursRange = ({ value = 0 }) => (
  <View style={{ flexDirection: "row" }}>
    <Typography text={formatNumber(value)} size={20} bold color={COLORS.blackV2} />
    <Typography text="H" size={20} color="#C8C8C8" />
  </View>
);
