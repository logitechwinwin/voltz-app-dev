import sizer from "./sizer";
import fontFamily from "./font-family";
import CheckInternet from "./check-internet";
import errorsSetter from "./errors-setter";
import {
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  validateLocationId,
  validateName,
  validatePhone,
  validateEmptyField,
} from "./validator";
import { addDeviceToken, removeDeviceToken } from "./device-token-apis";

export {
  sizer,
  fontFamily,
  CheckInternet,
  errorsSetter,
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  validateLocationId,
  validateName,
  validatePhone,
  validateEmptyField,
  addDeviceToken,
  removeDeviceToken,
};
