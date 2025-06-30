import { sizer } from "../helpers";

const renderSvg = (Image, w, h, h_scale = false) => (
  <Image
    width={sizer.moderateScale(w)}
    height={h_scale ? sizer.moderateScale(h) : sizer.moderateVerticalScale(h)}
  />
);

export default renderSvg;
