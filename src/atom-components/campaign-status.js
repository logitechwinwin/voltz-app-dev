import moment from "moment";
import { COLORS } from "../globals";

export default function CampaignStatus (campaign) {
    let startDate = moment(campaign?.startDate);
    let endDate = moment(campaign?.endDate);

    let status = "";
    let color = COLORS.dangerV3;
    let now = moment();

    let expired = endDate.isBefore(now);
    let upcoming = startDate.isAfter(now);
    let ongoing = startDate.isSameOrBefore(now) && endDate.isAfter(now);

    if (expired) {
      status = "Expired";
      color = COLORS.dangerV3;
    } else if (upcoming) {
      status = "Upcoming";
      color = COLORS.blue1;
    } else if (ongoing) {
      status = "Ongoing";
      color = COLORS.green1;
    }
    return { status, color  }
    
  };

