import {
  SettingDeleteIcon,
  SettingDevDocIcon,
  SettingEmailIcon,
  SettingPasswordIcon,
  SettingPhoneIcon,
  SettingPrivacyIcon,
  SettingSignoutIcon,
  SettingSupportIcon,
  SettingTermsIcon,
} from "../../assets";
import { renderSvg } from "../../utils";

export const accountData = [
  // {
  //   label: "Change Email",
  //   icon: renderSvg(SettingEmailIcon, 20, 16),
  //   goTo: "ChangeEmail",
  // },
  // {
  //   label: "Change Phone number",
  //   icon: renderSvg(SettingPhoneIcon, 14, 22),
  //   goTo: "ChangePhoneNo",
  // },
  {
    label: "Change Password",
    icon: renderSvg(SettingPasswordIcon, 21, 21),
    goTo: "ChangePassword",
  },
];

export const documentationData = [
  { label: "Support Center", icon: renderSvg(SettingSupportIcon, 20, 20) },
  // { label: "Developer Docs", icon: renderSvg(SettingDevDocIcon, 19, 19) },
  {
    label: "Terms of use",
    icon: renderSvg(SettingTermsIcon, 18, 20),
    goTo: "VolunteersTerms",
  },
  { label: "Privacy policy", icon: renderSvg(SettingPrivacyIcon, 24, 16) },
  { label: "Delete account", icon: renderSvg(SettingDeleteIcon, 18, 20) },
  { label: "Sign out", icon: renderSvg(SettingSignoutIcon, 18, 18) },
];
