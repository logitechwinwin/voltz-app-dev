import { Flex, Typography } from "../../atom-components";
import { COLORS } from "../../globals";
import {
  CalendarDate,
  DealPointIcon,
  Dollar,
  EventsDark,
  FollowerGoal,
  ProfileChartIcon,
  UsersThreeDark,
} from "../../assets";
import { limitNumber } from "../../utils/limit-number";
import { Tooltip } from "react-native-paper";
import { sizer } from "../../helpers";

const ProfileHeaderStatus = ({ profile, goalAchieved, volunteerProfile }) => {
  return (
    <Flex mt={16} algItems="center" jusContent={volunteerProfile ? 'space-between' : 'flex-start'} gap={15}>
      <Tooltip
        title="Voltz Earned"
        enterTouchDelay={0}
        leaveTouchDelay={1000}
      >
        <Flex gap={3} algItems="center" extraStyles={{ paddingBottom: sizer.moderateVerticalScale(5) }}>
          <DealPointIcon />
          <Typography
            size={14}
            text={limitNumber(goalAchieved?.voltzEarned) || 0}
            color={COLORS.blackV2}
          />
        </Flex>
      </Tooltip>
      {volunteerProfile &&
        <>
          <Tooltip
            title="Participated Events"
            enterTouchDelay={0}
            leaveTouchDelay={1000}
          >
            <Flex gap={3} algItems="center" extraStyles={{ paddingBottom: sizer.moderateVerticalScale(5) }}>
              <CalendarDate />
              <Typography
                size={14}
                text={goalAchieved?.totalEventsParticipated || "0"}
                color={COLORS.blackV2}
              />
            </Flex>
          </Tooltip>
          <Tooltip
            title="Following"
            enterTouchDelay={0}
            leaveTouchDelay={1000}
          >
            <Flex gap={3} algItems="center" extraStyles={{ paddingBottom: sizer.moderateVerticalScale(5) }}>
              <FollowerGoal />
              <Typography
                size={14}
                text={goalAchieved?.followingCount || "0"}
                color={COLORS.blackV2}
              />
            </Flex>
          </Tooltip>
        </>
      }
      <Tooltip
        title="Followers"
        enterTouchDelay={0}
        leaveTouchDelay={1000}
      >
        <Flex gap={3} algItems="center" extraStyles={{ paddingBottom: sizer.moderateVerticalScale(5) }}>
          <UsersThreeDark />
          <Typography
            size={14}
            text={goalAchieved?.followersCount || "0"}
            color={COLORS.blackV2}
          />
        </Flex>
      </Tooltip>
      <Tooltip
        title="SDGS"
        enterTouchDelay={0}
        leaveTouchDelay={1000}
      >
        <Flex gap={3} algItems="center" extraStyles={{ paddingBottom: sizer.moderateVerticalScale(5) }}>
          <ProfileChartIcon />
          <Typography
            size={14}
            text={goalAchieved?.sdgs?.length || 0}
            color={COLORS.blackV2}
          />
          <Typography size={14} text="| 17" color="#C6C6C6" bold />
        </Flex>
      </Tooltip>
      {
        volunteerProfile &&
        <Tooltip
          title="Amount Donated"
          enterTouchDelay={0}
          leaveTouchDelay={1000}
        >
          <Flex gap={3} algItems="center" extraStyles={{ paddingBottom: sizer.moderateVerticalScale(5) }}>
            <Dollar />
            <Typography
              size={14}
              text={goalAchieved?.donatedAmount ?? "0"}
              color={COLORS.blackV2}
            />
          </Flex>
        </Tooltip>
      }
    </Flex>
  );
};

export default ProfileHeaderStatus;
