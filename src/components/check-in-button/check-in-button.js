import { useEffect, useState } from "react";
import { Platform } from "react-native";
import OutlineButton from "../custom-buttons/outline-button/outline-button";
import ModalWrapper from "../custom-modal/modal-wrapper/modal-wrapper";
import PermissionModal from "../permission-modal/permission-modal";
import { isWithinRadius } from "../../utils/check-location";
import GetLocation from "react-native-get-location";
import ApiManager from "../../helpers/api-manager";
import { useDispatch } from "react-redux";
import { openToast } from "../../store/reducer";
import { Button } from "react-native-paper";
import { COLORS } from "../../globals";

const CheckInButton = ({
    style,
    campaignData,
    setCampaignData,
    eventId,
}) => {
    const [permissionModal, setPermissionModal] = useState(false)
    const [campaignLocation, setCampaignLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const location = campaignData?.location && JSON.parse(campaignData?.location)
        const [long, lat] = location?.coordinates || []
        setCampaignLocation({
            // longitude: long,
            // latitude: lat,
            longitude: -122.0214535,
            latitude: 37.33007961,
            radius: campaignData?.radius
        })
    }, [campaignData])

    const handleCheckLocation = () => {
        console.log('handleCheckLocation button pressed');
        console.log('Testing location services...');
        
        // For simulator testing - use hardcoded location
        const isSimulator = __DEV__ && Platform.OS === 'ios';
        
        if (isSimulator) {
            console.log('🖥️ Running on iOS Simulator - using test location');
            const testLocation = {
                latitude: 37.33007961,
                longitude: -122.0214535
            };
            console.log('✅ Using test location:', testLocation);
            handleCheckIn(testLocation.longitude, testLocation.latitude);
            return;
        }
        
        // Test if location services are available
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log('✅ Location obtained successfully:', location);
                console.log('mylocation: ', location);
                console.log('campaignLocation: ', campaignLocation);
                const isWithin = isWithinRadius(
                    campaignLocation?.latitude,
                    campaignLocation?.longitude,
                    location?.latitude,
                    location?.longitude,
                    campaignLocation?.radius
                )
                return { isWithin, location }
            }).then(({ isWithin, location }) => {
                console.log('isWithin: ', isWithin);
                console.log('location: ', location);
                handleCheckIn(location?.longitude, location.latitude)

                // if (isWithin) {
                //     handleCheckIn(location?.longitude, location.latitude)
                // } else {
                //     dispatch(openToast({
                //         type: 'error',
                //         message: 'You are out of location'
                //     }))
                // }
            })
            .catch(error => {
                console.log('❌ Location error details:', {
                    code: error.code,
                    message: error.message,
                    fullError: error
                });
                const { code, message } = error;
                
                if (code === 'UNAUTHORIZED') {
                    setPermissionModal(true)
                } else if (code === 'LOCATION_NOT_AVAILABLE' || message?.includes('Location not available')) {
                    dispatch(openToast({
                        type: 'error',
                        message: 'Please enable location services in your device settings'
                    }))
                } else if (code === 'AUTHORIZATION_DENIED' || message?.includes('Authorization denied')) {
                    dispatch(openToast({
                        type: 'error',
                        message: 'Location permission denied. Please allow location access in settings'
                    }))
                } else {
                    dispatch(openToast({
                        type: 'error',
                        message: 'Unable to get your location. Please check your location settings'
                    }))
                }
            })
    }


    const handleCheckIn = async (long, lat) => {
        setLoading(true)
        console.log('handleCheckIn button pressed');
        try {
            const { data } = await ApiManager('post', `volunteer-requests/${campaignData?.checkIn ? 'check-out' : 'check-in'}`, {
                eventId,
                longitude: long,
                latitude: lat,
            })
            
            // Update campaign data with the backend response
            const updatedCampaignData = {
                ...campaignData,
                checkIn: !campaignData?.checkIn,
                checkInAt: data?.response?.details?.checkInAt,
                checkOutAt: data?.response?.details?.checkOutAt,
            };
            
            setCampaignData(updatedCampaignData)
            console.log('updatedCampaignData: ', data?.message);
            dispatch(openToast({ type: 'success', message: data?.message }))
        } catch (error) {
            dispatch(openToast({ message: error?.response?.data?.message }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                style={[style, { backgroundColor: loading ? COLORS.grey : COLORS.primary }]}
                loading={loading}
                labelStyle={{ fontSize: 18, fontWeight: '600' }}
                textColor={COLORS.whiteV1}
                disabled={loading}
                onPress={handleCheckLocation}

            >
                {`${loading ? `Checking` : `Check`} ${campaignData?.checkIn ? "Out" : "In"}`}
            </Button>
            <PermissionModal
                campaignData={campaignData}
                setPermissionModal={setPermissionModal}
                permissionModal={permissionModal}
            />
        </>
    )
}

export default CheckInButton;


