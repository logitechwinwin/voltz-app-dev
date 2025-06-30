import {Dimensions, PixelRatio} from 'react-native';
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 800;

const horizontalScale = size => {
  return Math.ceil((width / guidelineBaseWidth) * size);
};

const verticalScale = size => {
  return Math.ceil((height / guidelineBaseHeight) * size);
};

const moderateScale = (size, factor = 1) => {
  return Math.ceil(size + (horizontalScale(size) - size) * factor);
};

const moderateVerticalScale = (size, factor = 1) => {
  return Math.ceil(size + (verticalScale(size) - size) * factor);
};

const fontScale = size => {
  return size * PixelRatio.getFontScale();
};

export default {
  fontScale,
  moderateScale,
  moderateVerticalScale,
  horizontalScale,
  verticalScale,
  deviceHeight: height,
};
