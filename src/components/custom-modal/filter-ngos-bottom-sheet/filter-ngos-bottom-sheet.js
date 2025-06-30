import React, { useState, useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import moment from "moment";

import {
  CustomBottomSheet,
  InputField,
  MultiSelectComponent,
  PrimaryButton,
} from "../..";
import { Flex, Typography } from "../../../atom-components";
import { COLORS } from "../../../globals";
import { FilterLocationIcon, SdgsFilterEvent } from "../../../assets";
import { sizer } from "../../../helpers";
import { openToast, toggleLoader } from "../../../store/reducer";
import ApiManager from "../../../helpers/api-manager";

export default function FilterNgosBottomSheet({
  isVisible,
  setVisible,
  onSearch,
  onClear,
  formData,
  setFormData,
}) {
  const [sdgData, setSdgData] = useState([]);
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();

  const { location, SDGs } = formData;

  const showSDGs = async () => {
    dispatch(toggleLoader(true));
    try {
      const { data } = await ApiManager("get", "sdgs");
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
      <Typography text="Filter Ngos" size={32} bold color={COLORS.blackV2} />
      <Typography
        text={"Search Ngos"}
        size={20}
        medium
        color={COLORS.text}
        mB={5}
      />

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

      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
          marginTop: sizer.moderateVerticalScale(20),
        }}
        onPress={() => {
          onClear();
          setFormData({
            location: "",
            dateAndTime: moment().format("YYYY-MM-DD"),
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
    </CustomBottomSheet>
  );
}
