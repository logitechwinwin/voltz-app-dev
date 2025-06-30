import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Container, Flex, Typography } from "../../atom-components";
import {
  Header,
  InputField,
  OutlineButton,
  ProfileEdit,
  SDGs,
} from "../../components";
import { COLORS } from "../../globals";
import { login, openToast, toggleLoader } from "../../store/reducer";
import { sizer, validateEmptyField, validateName } from "../../helpers";
import ApiManager from "../../helpers/api-manager";

const VolunteerProfileEdit = () => {
  const { user } = useSelector((state) => state.storeReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { details: profile } = user;

  const [showSdgs, setShowSdgs] = useState([]);
  const [formError, setFormError] = useState({});

  const [formData, setFormData] = useState({
    profileImage: profile?.profileImage || null,
    bannerImage: profile?.bannerImage || null,
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    state: profile?.state || "",
    city: profile?.city || "",
    country: profile?.country || "",
    about: profile?.about || "",
    streetAddress: profile?.streetAddress || "",
    facebookUrl: profile?.facebookUrl || "",
    linkedinUrl: profile?.linkedinUrl || "",
    twitterUrl: profile?.twitterUrl || "",
    youtubeUrl: profile?.twitterUrl || "",
    sdgs: [],
    phoneNumber: profile?.phoneNumber || "",
    email: profile?.email || "",
  });


  const handleChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e }));
    if (formError[name]) {
      setFormError((prevFormErr) => ({
        ...prevFormErr,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let obj = {};
    obj.firstName = validateName(
      formData.firstName,
      "The First Name field is required"
    );
    obj.lastName = validateName(
      formData.lastName,
      "The Last Name field is required"
    );
    obj.state = validateEmptyField(formData.state, "State");
    obj.city = validateEmptyField(formData.city, "City");
    obj.country = validateEmptyField(formData.country, "Country");
    // obj.country = validateEmptyField(formData.about, "About");
    obj.streetAddress = validateEmptyField(
      formData.streetAddress,
      "Street Address"
    );

    if (!Object.values(obj).every((value) => value === "")) {
      setFormError(obj);
      return true;
    }
    return false;
  };

  const handleSave = async () => {
    if (validate()) return;

    const updatedSelectedIds = formData?.sdgs
      .filter((obj) => obj.isSelected)
      .map((obj) => obj.id);

    dispatch(toggleLoader(true));
    let _fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (
        (key === "profileImage" || key === "bannerImage") &&
        !!formData[key]
      ) {
        _fd.append(key, {
          uri: formData[key],
          type: "image/jpeg",
          name: key === "profileImage" ? "profileImage.jpg" : "bannerImage.jpg",
        });
      } else if (key === "sdgs") {
        updatedSelectedIds.forEach((id, index) => {
          _fd.append(`sdgs[${index}]`, id);
        });
      } else if (formData[key] !== "" && formData[key] !== null) {
        _fd.append(key, formData[key]);
      }
    });

    try {
      let { data } = await ApiManager("patch", "users", _fd, {
        "content-type": "multipart/form-data",
      });
      dispatch(login(data?.response));
      dispatch(openToast({ type: "success", message: data?.message }));
      navigation.navigate("VolunteerProfile", { profileType: "own" });
    } catch (error) {
      console.log("🚀 ~ handleSave ~ error:", error?.response?.data?.details)
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

  const showSDGs = async () => {
    dispatch(toggleLoader(true));
    try {
      const { data } = await ApiManager("get", "sdgs?perPage=17");
      const sdgsWithSelection = data?.response?.details.map((sdg) => {
        return {
          ...sdg,
          isSelected: profile?.sdgs.some((userSdg) => userSdg.id === sdg.id),
        };
      });

      setShowSdgs(sdgsWithSelection);
      setFormData((prev) => ({
        ...prev,
        sdgs: sdgsWithSelection,
      }));
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

  useEffect(() => {
    showSDGs();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 60}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Container>
          <InputField
            mT={35}
            label="First Name"
            value={formData.firstName}
            error={formError?.firstName}
            handleChange={(e) => handleChange(e, 'firstName')}
          />
          <InputField
            label="Last Name"
            value={formData.lastName}
            error={formError?.lastName}
            handleChange={(e) => handleChange(e, 'lastName')}
          />
          <InputField
            label="Phone Number"
            value={formData.phoneNumber}
            editable={false}
          />
          <InputField
            label="Email"
            value={formData.email}
            editable={false}
          />
          <InputField
            label="State"
            value={formData.state}
            error={formError?.state}
            handleChange={(e) => handleChange(e, 'state')}
          />
          <InputField
            label="City"
            value={formData.city}
            error={formError?.city}
            handleChange={(e) => handleChange(e, 'city')}
          />
          <InputField
            label="Country"
            value={formData.country}
            error={formError?.country}
            handleChange={(e) => handleChange(e, 'country')}
          />
          <InputField
            label="Street Address"
            value={formData.streetAddress}
            error={formError?.streetAddress}
            handleChange={(e) => handleChange(e, 'streetAddress')}
          />
          <InputField
            label="About"
            value={formData.about}
            error={formError?.about}
            multiline
            handleChange={(e) => handleChange(e, 'about')}
          />
          <Typography text="SDGs" bold color={COLORS.greyV6} mT={24} />
          <SDGs sdgs={formData?.sdgs} setSdgs={handleChange} />

          <Typography text="Social Links" bold color={COLORS.greyV6} mT={40} />
          <InputField
            mT={5}
            label="Facebook"
            value={formData.facebookUrl}
            error={formError.facebookUrl}
            handleChange={(e) => handleChange(e, 'facebookUrl')}
          />
          <InputField
            label="Linkedin"
            value={formData.linkedinUrl}
            error={formError.linkedinUrl}
            handleChange={(e) => handleChange(e, 'linkedinUrl')}
          />
          <InputField
            label="Twitter"
            value={formData.twitterUrl}
            error={formError.twitterUrl}
            handleChange={(e) => handleChange(e, 'twitterUrl')}
          />
          <InputField
            label="YouTube"
            value={formData.youtubeUrl}
            error={formError.youtubeUrl}
            handleChange={(e) => handleChange(e, 'youtubeUrl')}
          />

          <Flex gap={9} mb={40}>
            {/* <OutlineButton label="Cancel" /> */}
            <OutlineButton label="Save" onPress={handleSave} />
          </Flex>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

export default VolunteerProfileEdit;
