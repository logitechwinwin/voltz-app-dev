import { Platform } from "react-native";

const extraLight = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-ExtraLight",
        fontWeight: "200",
      },
      android: {
        fontFamily: "Inter-ExtraLight",
      },
    }),
  };
};

const light = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-Light",
        fontWeight: "300",
      },
      android: {
        fontFamily: "Inter-Light",
      },
    }),
  };
};

const regular = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-Regular",
        fontWeight: "400",
      },
      android: {
        fontFamily: "Inter-Regular",
      },
    }),
  };
};

const medium = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-Medium",
        fontWeight: "500",
      },
      android: {
        fontFamily: "Inter-Medium",
      },
    }),
  };
};

const semiBold = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
      },
      android: {
        fontFamily: "Inter-SemiBold",
      },
    }),
  };
};

const bold = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-Bold",
        fontWeight: "700",
      },
      android: {
        fontFamily: "Inter-Bold",
      },
    }),
  };
};

const extraBold = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: "Inter-ExtraBold",
        fontWeight: "800",
      },
      android: {
        fontFamily: "Inter-ExtraBold",
      },
    }),
  };
};

export default {
  extraLight,
  light,
  regular,
  medium,
  semiBold,
  bold,
  extraBold,
};
