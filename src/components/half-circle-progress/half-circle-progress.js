import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { sizer } from "../../helpers";
import { COLORS } from "../../globals";
import { Flex, Typography } from "../../atom-components";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const HalfCircleProgress = ({
  progress = 0,
  size = 280,
  strokeWidth,
}) => {
  const progressSize = sizer.moderateScale(size);
  const radius = (progressSize - strokeWidth) / 2;
  const circumference = Math.PI * radius;

  const animatedProgress = useSharedValue(progress);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value / 100);
    return {
      strokeDashoffset,
    };
  });

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  return (
    <View
      style={{
        width: progressSize,
        height: progressSize / 2,
      }}
    >
      <Svg
        width={progressSize}
        height={progressSize / 2}
        viewBox={`0 0 ${progressSize} ${progressSize / 2}`}
      >
        <Path
          d={`M${strokeWidth / 2},${radius + strokeWidth / 2}
      a${radius},${radius} 0 1,1 ${progressSize - strokeWidth},0`}
          stroke={COLORS.grey}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedPath
          d={`M${strokeWidth / 2},${radius + strokeWidth / 2}
            a${radius},${radius} 0 1,1 ${progressSize - strokeWidth},0`}
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference}`}
          animatedProps={animatedProps}
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          zIndex: 99,
          alignSelf: "center",
          bottom: sizer.moderateScale(10),
        }}
      >
        <Flex algItems="center" gap={4}>
          <Typography text={progress} size={48} color={COLORS.blackV2} bold />
          <Typography text="%" size={24} color={COLORS.secondary} />
        </Flex>
      </View>
    </View>
  );
};

export default HalfCircleProgress;
