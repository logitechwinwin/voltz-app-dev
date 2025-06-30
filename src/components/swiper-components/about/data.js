import {
  VoltzIconSmall,
  VoltzIconSmallBlack,
  VoltzIconSmallYellow,
} from "../../../assets";

const MyVoltz = [
  {
    label: "Earned",
    value: 300,
    percentageChange: "+6.4%",
    changeDirection: "up",
    Icon: <VoltzIconSmall />,
  },
  {
    label: "Spent",
    value: 200,
    percentageChange: "-2.4%",
    changeDirection: "down",
    Icon: <VoltzIconSmallBlack />,
  },
  {
    label: "Available",
    value: 300,
    percentageChange: "+6.4%",
    changeDirection: "up",
    Icon: <VoltzIconSmallYellow />,
  },
];

const History = [
  {
    id:1,
    date: "Friday, March 29, 2024",
    name: "Charity - Beach Cleanup Crew",
    number: +5,
  },
  {
    id:2,
    date: "Friday, March 29, 2024",
    name: "Charity - Beach Cleanup Crew",
    number: +5,
  },
  {
    id:3,
    date: "Friday, March 29, 2024",
    name: "Charity - Beach Cleanup Crew",
    number: +5,
  },
];

export { MyVoltz, History };
