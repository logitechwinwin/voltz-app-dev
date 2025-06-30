//live
//const baseUrl = "https://api.voltz.global/api/v1/"; // live
const baseUrl = "http://192.168.100.85:3000/api/v1/"; // local development
const webUrl = "https://voltz.global/";

//staging
// const baseUrl = "https://staging.api.voltz.global/api/v1/";
// const webUrl = "https://staging.voltz.global/";

// const baseUrl = "https://bfb3-103-156-136-161.ngrok-free.app/api/v1/"; //ngrok
const baseApiUrl = baseUrl.substring(0, baseUrl.indexOf("/api/v1/") + 1);
const baseOpacity = 0.5;

const COLORS = {
  primary: "#00676D",
  secondary: "#06B0BA",
  black: "#000",
  blackV1: "#27272E",
  blackV2: "#3C3F43",
  white: "#ffffff",
  whiteV1: "#f2f2f7",
  whiteV2: "#FAFAFA",
  danger: "#B3261E",
  dangerV1: "#FF0000",
  dangerV2: "#FF5252",
  info: "#4C68FB",
  success: "#6DBA47",
  grey: "#DEDEDE",
  greyV1: "#3A3A3F",
  greyV2: "#6B6B6B",
  greyV3: "#9D9D9D",
  greyV4: "#EBEBEB",
  greyV5: "#717171",
  greyV6: "#757575",
  greyV7: "#7B7B80",
  greyV8: "#888888",
  greyV9: "#969696",
  greyV10: "#8593A8",
  greyV11: "#C4C4C4",
  text: "#27272E99",
  textV1: "#27272E54",
  textV2: "#27272E",
  textV3: "#71747A",
  textV4: "#424242",
  border: "#8E8E9314",
  borderV1: "#E3E3E6",
  borderV2: "#8E8E9333",
  lightblue: "#D3E2E6",
  lightblueV1: "#F8F8FB",
  darkblue: "#132F41",
  green: "#17B582",
  green1: "#4CAF50",
  blue1: "#2196F3",
  dangerV3: "#F44336",
  link: "#1E90FF",
};
const linkObj = {
  ngo: `${webUrl}search-ngo/`,
  deal: `${webUrl}deals/`,
  company: `${webUrl}company/`,
  charity: `${webUrl}fundraising/`,
  campaign: `${webUrl}events/`,
  community: `${webUrl}community/`,
};

const linking = {
  prefixes: ["https://voltz.global/"],
  config: {
    screens: {
      Home: {
        screens: {
          TodayScreen: {
            screens: {
              NGOProfile: "search-ngo/:id",
              CharityProfile: "fundraising/:id",
              CampaignProfile: "events/:id",
            },
          },
          DealsScreen: {
            screens: {
              DealsDetail: "deals/:id",
              CompanyProfile: "company/:id",
            },
          },
          CommunityScreen: {
            screens: {
              CommunityDetails: "community/:id",
            },
          },
        },
      },
    },
  },
};

const CONSTANTS = {
  containerPaddingX: 15,
};

const placeholder_profile_img =
  "https://st4.depositphotos.com/9998432/25177/v/450/depositphotos_251778046-stock-illustration-person-gray-photo-placeholder-man.jpg";

const placeholder_cover_img =
  "https://vonex.com.au/wp-content/uploads/2021/09/MicrosoftTeams-image-6-768x259.jpg";

export {
  baseOpacity,
  baseUrl,
  COLORS,
  CONSTANTS,
  baseApiUrl,
  placeholder_profile_img,
  placeholder_cover_img,
  linking,
  linkObj,
};
