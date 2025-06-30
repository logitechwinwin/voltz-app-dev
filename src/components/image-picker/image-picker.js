import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraIcon } from "../../assets";
import { Typography } from "../../atom-components";
import { fontFamily, sizer } from "../../helpers";
import { baseOpacity, COLORS } from "../../globals";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { useCallback, useEffect } from "react";

const ImagePicker = ({
    label,
    onPress = () => { },
    image,
    error,
}) => {
    const shakeAnimation = useSharedValue(0);


    useEffect(() => {
        !!error && startShake();
    }, [error]);


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


    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={baseOpacity}
            onPress={onPress}
        >
            <Image
                source={{
                    uri: image,
                }}
                style={styles.image}
            />
            <View style={styles.overlay}>
                <CameraIcon />
                <Typography color={COLORS.white} size={11} mT={8}>
                    {label || "Pick Banner Image"}
                </Typography>
            </View>
            {error && <ErrorMsg text={error} animation={translateX} />}
        </TouchableOpacity>
    )
}
export default ImagePicker;

const ErrorMsg = ({ text, animation }) => {
    return (
        <Animated.Text style={[animation, styles.errorText]}>{text}</Animated.Text>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: sizer.moderateVerticalScale(158),
        marginVertical: sizer.moderateVerticalScale(20),
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    errorText: {
        fontSize: sizer.fontScale(12),
        color: COLORS.dangerV1,
        ...fontFamily.regular(),
        marginTop: sizer.moderateVerticalScale(4),
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
})