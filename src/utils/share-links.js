import Share from "react-native-share";
import { linkObj } from "../globals";

export const onShareLink = async ({
  id = 0,
  page = "",
  message = "",
  title = "",
}) => {
  try {
    const shareOptions = {
      title: title,
      message: message,
      url: linkObj[page] + id,
    };

    const result = await Share.open(shareOptions);
    if (result.success) {
      console.log("Success", "Profile link shared successfully");
    }
  } catch (error) {
    console.log("Error sharing:", error);
    console.log("Error", "There was an issue sharing the profile link");
  }
};
