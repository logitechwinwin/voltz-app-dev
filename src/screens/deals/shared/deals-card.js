import { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Flex, Typography } from "../../../atom-components";
import { ConfirmAvail, OutlineButton } from "../../../components";
import { DealPointIcon } from "../../../assets";
import { baseOpacity, COLORS, placeholder_cover_img } from "../../../globals";
import { styles } from "./styles";
import DealsAvail from "../../../components/custom-modal/deals-avail-modal/dealsAvail";
import { login, openToast, toggleLoader } from "../../../store/reducer";
import { useDispatch } from "react-redux";
import ApiManager from "../../../helpers/api-manager";
import format from "pretty-format";
import { formatNumber } from "../../../utils";
import { sizer } from "../../../helpers";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useCheckLoginStatus } from "../../../hooks";

const DealsCard = ({ item, saved = false, mH = 2 }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const { checkLoginStatus } = useCheckLoginStatus();


  const getUser = async () => {
    try {
      let { data } = await ApiManager("get", "auth/me");
      dispatch(login(data?.response));
    } catch (error) {
      console.log("🚀 ~ getUser ~ error:", error)
    }
  }

  const handleDealAvail = async (id) => {
    setConfirm(false);
    dispatch(toggleLoader(true));
    try {
      await ApiManager("post", `deal/avail`, {
        dealId: id,
      });
      setVisible(true);
      getUser()
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

  const handleSave = async (id, isSaved) => {
    setIsSaving(true);
    try {
      await ApiManager("post", `deal/save/${id}`);
      item.isSaved = !isSaved;
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={baseOpacity}
      onPress={() => {
        navigation.navigate("DealsDetail", {
          id: item?.id,
          companyId: item?.user?.id,
        });
      }}
      style={[
        styles.main,
        { marginHorizontal: sizer.moderateVerticalScale(mH) },
      ]}
    >
      <View>
        <Image
          source={{ uri: item?.bannerImage || placeholder_cover_img }}
          style={styles.img}
        />
        <Image
          source={{ uri: item?.user?.profileImage || placeholder_cover_img }}
          style={styles.coverImg}
        />
        <View style={styles.discountView}>
          <Typography
            text={`${item?.discountAmount}${item?.discountType === "percentage" ? "%" : " $"
              } Off`}
            size={12}
            bold
            color={COLORS.secondary}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexShrink: 1 }}>
            <Typography text={item?.dealName} {...styles.title} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Typography text={formatNumber(item?.voltzRequired)} bold />
            <DealPointIcon />
          </View>
        </View>

        <Flex mt={saved ? 9 : 16} gap={8} algItems="center">
          <OutlineButton
            label="Redeem"
            style={styles.btnStyle}
            mt={0}
            onPress={() => {
              checkLoginStatus() && setConfirm(true);
            }}
          />
          {!saved && (
            <TouchableOpacity
              onPress={() =>
                checkLoginStatus() && handleSave(item?.id, item?.isSaved)
              }
              activeOpacity={baseOpacity}
            >
              <AntIcon
                name={item?.isSaved ? "heart" : "hearto"}
                size={sizer.moderateScale(25)}
                color={item?.isSaved ? COLORS.dangerV1 : "#757575"}
              />
            </TouchableOpacity>
          )}
          <DealsAvail isVisible={visible} setVisible={setVisible} />
          <ConfirmAvail
            isVisible={confirm}
            setVisible={setConfirm}
            handleDealAvail={() =>
              checkLoginStatus() && handleDealAvail(item?.id)
            }
          />
        </Flex>
      </View>
    </TouchableOpacity>
  );
};

export default DealsCard;
