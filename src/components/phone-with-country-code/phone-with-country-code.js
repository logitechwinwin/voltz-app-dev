import { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import PhoneInput from "react-native-phone-input";

import { sizer, validatePhone } from "../../helpers";
import { COLORS } from "../../globals";
import { Typography } from "../../atom-components";

const phoneNumberExample = ({
  phoneNumber,
  setPhoneNumber,
  phoneNumberRef,
  error
}) => {
  const [phoneCountryCode, setPhoneCountryCode] = useState("AW");
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);

  const handleCountrySelect = (country) => {
    setPhoneCountryCode(country.cca2);
    const newPhoneNumber = `+${country.callingCode[0]}`;
    setPhoneNumber(newPhoneNumber);
    if (phoneNumberRef?.current) {
      phoneNumberRef?.current?.selectCountry(country.cca2.toLowerCase());
      phoneNumberRef?.current?.setValue(newPhoneNumber);
    }
    setShowPhoneCountryPicker(false);
  };

  return (
    <View style={{ marginVertical: 5 }}>
      <PhoneInput
        ref={phoneNumberRef}
        style={styles.input}
        initialValue={phoneNumber}
        initialCountry={phoneCountryCode.toLowerCase()}
        onPressFlag={() => setShowPhoneCountryPicker(true)}
        onChangePhoneNumber={(text) => {
          setPhoneNumber(text);
        }}
        placeholder="Enter a phone number"
        textStyle={{
          color: COLORS.black,
        }}
      />

      <CountryPicker
        countryCode={phoneCountryCode}
        visible={showPhoneCountryPicker}
        onSelect={handleCountrySelect}
        onClose={() => setShowPhoneCountryPicker(false)}
        withFlagButton={false}
        withFilter
      />
      {phoneNumber !== "" && (
        <Typography color={COLORS.dangerV1} size={12}>
          {error || validatePhone(phoneNumberRef?.current?.state?.value)}
        </Typography>
      )}
    </View>
  );
};

export default phoneNumberExample;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: sizer.moderateScale(0.5),
    borderBottomColor: COLORS.borderV1,
    paddingBottom: sizer.moderateVerticalScale(16),
    marginTop: sizer.moderateVerticalScale(10),
    marginBottom: sizer.moderateVerticalScale(5),
  },
});
