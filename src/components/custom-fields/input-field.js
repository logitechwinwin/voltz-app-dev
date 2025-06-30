import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useCallback,
} from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";

import { sizer, fontFamily } from "../../helpers";
import { COLORS, baseOpacity } from "../../globals";
import { EyeCloseIcon, EyeOpenIcon } from "../../assets";

const InputField = forwardRef(
  (
    {
      label = "Custom Field",
      error = "",
      handleChange = () => { },
      mT = 0,
      mB = 16,
      editable = true,
      value = "",
      maxLength,
      password = false,
      numPad = false,
      rightIcon = false,
      outerContStyle = {},
      textInputHeight = 150,
      contextMenuHidden = false,
      multiline = false,
      ...props
    },
    ref
  ) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [inputHeight, setInputHeight] = useState(
      sizer.deviceHeight > 850 ? 46 : 50
    );

    const defaultRef = useRef(null);
    const InputRef = ref || defaultRef;
    const animatedValue = useSharedValue(0);
    const shakeAnimation = useSharedValue(0);

    const labelActiveSize = sizer.fontScale(12);
    const labelInactiveSize = sizer.fontScale(17);
    const labelActiveColor = COLORS.textV1;
    const labelInactiveColor = COLORS.text;
    const labelInactivePosition = sizer.moderateVerticalScale(
      sizer.deviceHeight > 800 ? 13 : 10
    );
    const animatedLabelStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              animatedValue.value,
              [0, 1],
              [labelInactivePosition, 0]
            ),
          },
        ],
        fontSize: interpolate(
          animatedValue.value,
          [0, 1],
          [labelInactiveSize, labelActiveSize]
        ),
        color: interpolateColor(
          animatedValue.value,
          [0, 1],
          [labelInactiveColor, labelActiveColor]
        ),
      };
    });

    const viewStyles = useAnimatedStyle(() => {
      const borderBottomColor = error
        ? COLORS.dangerV1
        : interpolateColor(
          animatedValue.value,
          [0, 1],
          [COLORS.borderV1, COLORS.secondary]
        );
      return {
        borderBottomColor,
      };
    });

    const onFocus = useCallback(() => {
      animatedValue.value = withTiming(1, { duration: 300 });
    }, []);

    const onBlur = useCallback(() => {
      if (!value) {
        animatedValue.value = withTiming(0, { duration: 300 });
      }
    }, [value]);

    const onInputFocus = useCallback(() => {
      if (InputRef.current) {
        InputRef.current.focus();
      }
    }, [InputRef]);

    //------- Error Message Shake Animation --------//
    const startShake = useCallback(() => {
      shakeAnimation.value = withSequence(
        withTiming(1, { duration: 350 }),
        withTiming(-1, { duration: 350 }),
        withTiming(0, { duration: 350 })
      );
    }, []);

    const translateX = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: interpolate(shakeAnimation.value, [-1, 1], [-10, 10]) },
        ],
      };
    });



    const handleLayout = () => {
      if (InputRef.current && value) {
        InputRef.current.measure((x, y, width, height) => {
          if (width < textInputHeight) {
            setInputHeight(sizer.moderateScale(width))
          } else {
            setInputHeight(sizer.moderateScale(textInputHeight))
          }
        })
      }
    }



    useEffect(() => {
      !!error && startShake();
    }, [error]);
    //------- End --------//

    useEffect(() => {
      !!value && onFocus();
    }, [value]);

    return (
      <View
        style={[
          {
            marginTop: sizer.moderateVerticalScale(mT),
            marginBottom: sizer.moderateVerticalScale(mB),
          },
          outerContStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.container,
            viewStyles,
            multiline && { height: inputHeight },
          ]}
        >
          <Animated.Text
            // style={{color:'red'}}
            onPress={onInputFocus}
            style={[styles.animatedLabel, animatedLabelStyle]}
          >
            {label}
          </Animated.Text>
          <TextInput
            ref={InputRef}
            onChangeText={handleChange}
            value={value}
            style={[styles.textStyle, { height: inputHeight }]}
            onBlur={onBlur}
            onFocus={onFocus}
            cursorColor={COLORS.text}
            editable={editable}
            maxLength={maxLength && maxLength}
            secureTextEntry={password && secureTextEntry}
            keyboardType={numPad ? "numeric" : "default"}
            contextMenuHidden={contextMenuHidden}
            multiline={multiline}
            onLayout={handleLayout}
            onContentSizeChange={(e) => {
              multiline &&
                e.nativeEvent.contentSize.height < textInputHeight &&
                setInputHeight(e.nativeEvent.contentSize.height + 20);
            }}
            {...props}
          />
          {!!rightIcon ? (
            <View style={styles.rightIcon}>{rightIcon}</View>
          ) : (
            password && (
              <TouchableOpacity
                activeOpacity={baseOpacity}
                onPress={() => setSecureTextEntry((e) => !e)}
                style={styles.eyeBtn}
                hitSlop={styles.eyeHitSlop}
              >
                {secureTextEntry ? <EyeCloseIcon /> : <EyeOpenIcon />}
              </TouchableOpacity>
            )
          )}
        </Animated.View>
        {error && <ErrorMsg text={error} animation={translateX} />}
      </View>
    );
  }
);

const ErrorMsg = React.memo(({ text, animation }) => {
  return (
    <Animated.Text style={[animation, styles.errorText]}>{text}</Animated.Text>
  );
});

const styles = StyleSheet.create({
  container: {
    height: sizer.moderateVerticalScale(sizer.deviceHeight > 850 ? 46 : 50),
    borderBottomWidth: 1,
  },
  textStyle: {
    fontSize: sizer.fontScale(17),
    color: COLORS.text,
    ...fontFamily.regular(),
    padding: 0,
    flex: 1,
    paddingBottom: sizer.moderateVerticalScale(5),
    paddingRight: sizer.moderateScale(35),
  },
  errorText: {
    fontSize: sizer.fontScale(12),
    color: COLORS.dangerV1,
    ...fontFamily.regular(),
    marginTop: sizer.moderateVerticalScale(4),
  },
  animatedLabel: {
    ...fontFamily.regular(),
    zIndex: 99,
  },
  eyeBtn: {
    position: "absolute",
    bottom: sizer.moderateVerticalScale(7),
    alignSelf: "flex-end",
    zIndex: 99,
  },
  eyeHitSlop: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 10,
  },
  rightIcon: {
    position: "absolute",
    bottom: 0,
    top: 0,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  multilineStyle: {
    height: sizer.moderateVerticalScale(80),
    textAlignVertical: "top",
  },
});

export default React.memo(InputField);
