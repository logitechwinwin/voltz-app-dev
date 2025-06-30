import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ModalWrapper from "../modal-wrapper/modal-wrapper";
import { COLORS } from "../../../globals";
import { Typography } from "../../../atom-components";
import { sizer } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { openToast, toggleLoader } from "../../../store/reducer";
import axios from "axios";
import ApiManager from "../../../helpers/api-manager";

const CardDetailModal = ({
  isVisible,
  setVisible = () => { },
  paymentApiUrl,
  setDonationSuccess = () => { },
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { user } = useSelector((state) => state.storeReducer);
  const dispatch = useDispatch();

  const handleCardNumberChange = (text) => {
    const formatted = text
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (text) => {
    const formatted = text.replace(/^(\d{2})(\d{1,2})/, "$1/$2");
    setExpiryDate(formatted);
  };

  const handlePaymentVerification = async () => {
    const lastId = paymentApiUrl.substring(paymentApiUrl.lastIndexOf("/") + 1);
    try {
      let { data } = await ApiManager(
        "patch",
        `donation/verify/${user?.details?.id}?token-id=${lastId}`
      );
      dispatch(openToast({ type: "success", message: data?.message }));
      setDonationSuccess(true);
    } catch (error) {
      console.log(
        "🚀 ~ handlePaymentVerification ~ error:",
        error?.response?.data
      );
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleSubmit = async () => {
    const _fd = new FormData();
    _fd.append("billing-cc-number", cardNumber.replace(/ /g, ""));
    _fd.append("billing-cc-exp", expiryDate.replace(/[\/]/g, ""));
    _fd.append("billing-cvv", cvv);
    setVisible(false);
    dispatch(toggleLoader(true));
    try {
      await axios.post(paymentApiUrl, _fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      handlePaymentVerification();
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error?.response?.data);
      dispatch(openToast({ message: error?.response?.data?.message }));
      dispatch(toggleLoader(false));
    }
  };

  const validateFields = () => {
    if (
      cardNumber?.length >= 19 &&
      expiryDate?.length >= 5 &&
      cvv?.length >= 3
    ) {
      return true;
    }
    return false;
  };

  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible}>
      <View style={styles.modalContent}>
        <Typography size={18} bold textAlign="center" mB={15}>
          Enter Card Details
        </Typography>

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          maxLength={19}
          placeholderTextColor={COLORS.text}
        />

        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={handleExpiryDateChange}
          maxLength={5}
          placeholderTextColor={COLORS.text}
        />

        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
          maxLength={3}
          placeholderTextColor={COLORS.text}
        />

        <TouchableOpacity
          disabled={!validateFields()}
          style={[
            styles.button,
            {
              backgroundColor: validateFields() ? COLORS.primary : COLORS.grey,
            },
          ]}
          onPress={handleSubmit}
        >
          <Typography style={styles.buttonText}>Submit</Typography>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};

export default CardDetailModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: sizer.moderateVerticalScale(15),
    paddingVertical: sizer.moderateVerticalScale(40),
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: sizer.moderateVerticalScale(20),
    color: COLORS.black,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
