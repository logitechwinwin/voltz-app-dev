import { Linking, Platform, StyleSheet, View } from "react-native";
import ModalWrapper from "../custom-modal/modal-wrapper/modal-wrapper";
import { Flex, Typography } from "../../atom-components";
import { Button } from "react-native-paper";
import { sizer } from "../../helpers";
import { COLORS } from "../../globals";

const PermissionModal = ({
    setPermissionModal,
    permissionModal,
    campaignData,
}) => {
    const navigateToSetting = () => Linking.openSettings()
    const navigationDetails = Platform.OS === 'ios' ?
        `Tap Settings, and turn Location on.` :
        `Tap Settings > Permissions, and turn Location on.`

    return (
        <ModalWrapper isVisible={permissionModal} setVisible={setPermissionModal}>
            <View style={styles.modalContainer}>
                <Typography size={22} semiBold>Allow Location Permission</Typography>
                <Flex
                    jusContent={'space-between'}
                    direction={'column'}
                    extraStyles={{ flex: 1 }}
                    mt={12}
                    gap={5}
                >
                    <Typography
                        size={16}
                        LineHeight={25}
                        medium
                    >
                        {`To Check ${campaignData?.checkIn ? 'Out' : 'In'} allow Voltz access to your location.${navigationDetails}`}
                    </Typography>
                    <Button
                        style={styles.button}
                        textColor={COLORS.secondary}
                        labelStyle={styles.buttonLabel}
                        onPress={navigateToSetting}
                    >
                        Settings
                    </Button>
                </Flex>
            </View>
        </ModalWrapper>
    )
}

export default PermissionModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: sizer.moderateScale(200),
        padding: sizer.moderateScale(20)
    },
    buttonLabel: {
        fontSize: 18,
    },
    button: {
        marginTop: "auto",
        marginLeft: 'auto'
    }
})