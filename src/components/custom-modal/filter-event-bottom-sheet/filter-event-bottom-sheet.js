import React, { useState, useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";

import {
  CustomBottomSheet,
  CustomDropdown,
  DateAndTime,
  InputField,
  MultiSelectComponent,
  PrimaryButton,
} from "../..";
import { Flex, Typography } from "../../../atom-components";
import { COLORS, baseOpacity } from "../../../globals";
import {
  DateAndTimeSvg,
  FilterLocationIcon,
  SdgsFilterEvent,
} from "../../../assets";
import { sizer } from "../../../helpers";
import { openToast, toggleLoader } from "../../../store/reducer";
import { useDispatch } from "react-redux";
import ApiManager from "../../../helpers/api-manager";

export default function FilterEventBottomSheet({
  activeStep,
  isVisible,
  setVisible,
  onSearch,
  onClear,
  formData,
  setFormData,
}) {
  const [datePicker, setDatePicker] = useState(false);
  const [sdgData, setSdgData] = useState([]);
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();

  const { location, SDGs } = formData;

  const showSDGs = async () => {
    dispatch(toggleLoader(true));
    try {
      const { data } = await ApiManager("get", "sdgs?perPage=999");
      setSdgData(data?.response?.details);
    } catch (error) {
      if (error?.response?.status === 422) {
        setFormError(error?.response?.data?.details);
        dispatch(openToast({ message: error?.response?.data?.message }));
      } else {
        dispatch(openToast({ message: error?.response?.data?.message }));
      }
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleDateChange = (selectedDate) => {
    setDatePicker(false);
    handleFormData(selectedDate, "dateAndTime");
  };

  const handleFormData = useCallback((e, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e,
    }));
    if (formError[name]) {
      setFormError((prevFormErr) => ({
        ...prevFormErr,
        [name]: "",
      }));
    }
  }, []);

  useEffect(() => {
    showSDGs();
  }, []);

  return (
    <CustomBottomSheet isVisible={isVisible} setVisible={setVisible}>
      <Typography text="Filter Events" size={32} bold color={COLORS.blackV2} />
      <Typography
        text={activeStep == 0 ? "Search Events" : "Search Fundraising"}
        size={20}
        medium
        color={COLORS.text}
        mB={5}
      />

      {/* <CustomDropdown
        placeholder="SDGs"
        Data={sdgData}
        selectedValue={(selectedSdg) => {
          handleFormData(selectedSdg, "SDGs");
        }}
        value={SDGs}
        LeftIcon={<SdgsFilterEvent />}
      /> */}

      <MultiSelectComponent
        Data={sdgData}
        LeftIcon={<SdgsFilterEvent />}
        handleGetSelectedSDGs={(selectedSdg) =>
          handleFormData(selectedSdg, "SDGs")
        }
      />

      <Flex algItems="center" gap={12} mt={10}>
        <FilterLocationIcon />
        <InputField
          label="Location"
          mB={0}
          outerContStyle={{ flex: 1 }}
          value={location}
          handleChange={(e) => handleFormData(e, "location")}
          error={formError?.location}
        />
      </Flex>

      <Flex
        algItems="center"
        gap={12}
        mt={25}
        flexStyle={activeStep == 1 ? { display: "none" } : {}}
      >
        <DateAndTimeSvg />
        <TouchableOpacity
          activeOpacity={baseOpacity}
          onPress={() => {
            setDatePicker(true);
          }}
          style={styles.showDateCont}
        >
          <Typography
            text={formData?.dateAndTime || "Date"}
            size={17}
            color={COLORS.greyV7}
          />
        </TouchableOpacity>
      </Flex>

      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
          marginTop: sizer.moderateVerticalScale(20),
        }}
        onPress={() => {
          onClear();
          setFormData({
            location: "",
            // dateAndTime: moment().format("YYYY-MM-DD"),
            dateAndTime: "",
            SDGs: "",
          });
        }}
      >
        <Typography text="Clear all" size={12} color={COLORS.dangerV1} />
      </TouchableOpacity>

      <PrimaryButton
        label="Search"
        mt={19}
        onPress={() => {
          onSearch(formData);
        }}
      />
      <DateAndTime
        visible={datePicker}
        setVisible={setDatePicker}
        current={formData?.dateAndTime}
        onDateChange={handleDateChange}
      />
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({
  locationInputView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: sizer.moderateVerticalScale(20),
    gap: sizer.moderateScale(10),
  },
  showDateCont: {
    flex: 1,
    height: "100%",
    paddingBottom: sizer.moderateVerticalScale(14),
    borderBottomWidth: 1,
    borderColor: COLORS.borderV2,
  },
});
