import { Typography } from "../../../atom-components";
import { ViewAll } from "../../../screens/today/shared";
import { TargetChart, ImpactPortfolio } from "../../index";

const Target = ({ isMyProfile, userId }) => {
  return (
    <>
      <Typography size={18} text="Monthly Target" semiBold mT={24} />
      <TargetChart mt={20} mb={24} isMyProfile={isMyProfile} userId={userId} />
      <ImpactPortfolio userId={userId} />
    </>
  );
};

export default Target;
