import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  AppState,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useFocusEffect } from '@react-navigation/native';
import React from "react";

import { Container, Flex, Typography } from "../../atom-components";
import {
  baseOpacity,
  COLORS,
  CONSTANTS,
  linkObj,
  placeholder_cover_img,
  websiteUrl,
} from "../../globals";
import {
  CampaignProfileBottomSheet,
  CardDetailModal,
  CheckInButton,
  DonationModal,
  Header,
  HorizontalScrollviewSpacing,
  LikeAndShare,
  MessageField,
  OutlineButton,
  ProfileHeader,
  SuggestedCharityCard,
} from "../../components";
import { sizer } from "../../helpers";
import {
  DealPointIcon,
  EmptyCampaign,
  ProfileCalendarIcon,
  ProfileLoactionIcon,
  VerticalEllipsis,
} from "../../assets";
import { Menu, ProgressBar } from "react-native-paper";
import { ViewAll } from "../today/shared";
import CharityGroupedAvatar from "./shared/charity-avatr";
import {
  useCheckLoginStatus,
  useFetchEventsData,
  useRegisterUnRegister,
} from "../../hooks";
import {
  calculateDonationPercentage,
  formatNumber,
  onShareLink,
} from "../../utils";
import moment from "moment";
import CampaignStatus from "../../atom-components/campaign-status";
import { openToast } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import ApiManager from "../../helpers/api-manager";

const CampaignProfile = ({ route, navigation }) => {
  const { id, source } = route.params;
  const [isVisible, setVisible] = useState(false);
  const [donationModal, setDonationModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [paymentApiUrl, setPaymentApiUrl] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [allCommentsData, setAllCommentsData] = useState([])
  const [commentText, setCommentText] = useState('')
  const [commentSendLoader, setCommentSendLoader] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [checkInStatus, setCheckInStatus] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timerInterval, setTimerInterval] = useState(null)
  const [isTimerStarting, setIsTimerStarting] = useState(false)

  const dispatch = useDispatch();
  const { registerUnRegister, isLoading } = useRegisterUnRegister();
  const { user } = useSelector(state => state.storeReducer)
  const {
    eventsData: campaignData,
    setEventsData: setCampaignData,
    refetch: refetchCampaignData,
  } = useFetchEventsData({
    shouldFetch: true,
    id: id,
    loader: true,
    loaderBackgroundWhite: true,
  });
  const campaignStatus = CampaignStatus(campaignData);
  const isExpired = campaignStatus?.status === 'Expired'
  const isOngoing = campaignStatus?.status === 'Ongoing'
  const isInActive = campaignData?.activationStatus === 'inactive'
  const { checkLoginStatus } = useCheckLoginStatus();
  const { eventsData: SuggestedCampaignData, refetch: SuggestedCampaign } =
    useFetchEventsData({
      shouldFetch: true,
      query:
        "page=1&perPage=6&excludeExpired=true&exceedAlreadyRegistered=false&activationStatus=active",
      type: "campaign",
      byInterest: true,
      loaderBackgroundWhite: true,
    });

  const handleRegister = async (id, action) => {
    if (checkLoginStatus()) {
      const success = await registerUnRegister(id, action);
      if (success) {
        const updatedCampaignData = {
          ...campaignData,
          registered: action === "register",
        };
        setCampaignData(updatedCampaignData);
        
        // Show success message
        if (action === "register") {
          dispatch(openToast({ 
            type: 'success', 
            message: 'Successfully registered for the campaign!' 
          }));
        } else {
          dispatch(openToast({ 
            type: 'success', 
            message: 'Successfully unregistered from the campaign' 
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (donationSuccess) {
      refetchCampaignData();
      SuggestedCampaign();
      setDonationSuccess(false);
    }
  }, [donationSuccess]);

  useEffect(() => {
    getAllComments();
  }, [page])

  // Fetch latest check-in status from backend
  const fetchLatestCheckInStatus = async () => {
    try {
      // First get the volunteer request ID for this campaign
      const { data: requestData } = await ApiManager('get', `volunteer-requests?eventId=${id}`);
      
      if (requestData?.response?.details?.length > 0) {
        const volunteerRequest = requestData.response.details[0]; // Get latest request
        const volunteerRequestId = volunteerRequest.id;
        
        // Get specific check-in status
        const { data } = await ApiManager('get', `volunteer-requests/${volunteerRequestId}/status`);
        console.log('Latest check-in status:', data);
        
        if (data?.response?.details) {
          const checkInData = data.response.details;
          
          // Update campaign data with latest check-in status
          setCampaignData(prev => ({
            ...prev,
            checkIn: checkInData.checkIn,
            checkInAt: checkInData.checkInAt,
            checkOutAt: checkInData.checkOutAt,
            volunteerRequestId: volunteerRequestId,
          }));
          
          // Calculate and start timer if checked in
          if (checkInData.checkIn && !checkInData.checkOutAt) {
            const checkInTime = new Date(checkInData.checkInAt).getTime();
            const now = new Date().getTime();
            const elapsedSeconds = Math.max(0, Math.floor((now - checkInTime) / 1000));
            
            console.log('Starting timer from:', elapsedSeconds, 'seconds');
            setElapsedTime(elapsedSeconds);
            startTimer(elapsedSeconds);
          }
        }
      }
    } catch (error) {
      console.log('Error fetching check-in status:', error);
      // Don't show error toast as this is a background fetch
    }
  };

  const startTimer = (initialSeconds) => {
    console.log('🕐 Starting timer with initial seconds:', initialSeconds);
    console.log('🕐 Current timerInterval:', timerInterval);
    console.log('🕐 Current elapsedTime:', elapsedTime);
    console.log('🕐 Stack trace:', new Error().stack);
    
    // Clear any existing timer FIRST
    if (timerInterval) {
      console.log('🔄 Clearing existing timer interval:', timerInterval);
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    // Set the initial time
    setElapsedTime(initialSeconds);
    
    // Start new timer after a small delay to ensure cleanup is complete
    setTimeout(() => {
      const interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          console.log('⏱️ Timer tick:', newTime, 'at', new Date().toLocaleTimeString());
          return newTime;
        });
      }, 1000);
      setTimerInterval(interval);
      console.log('✅ Timer started with interval ID:', interval);
    }, 100);
  };

  // Fetch check-in status when component mounts
  useEffect(() => {
    if (id && checkLoginStatus(false) && source === 'campaigns') {
      fetchLatestCheckInStatus();
    }
  }, [id, source]);

  // Restart timer when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      console.log('🎯 Screen focused - checking timer state');
      
      if (source === 'campaigns' && campaignData?.checkIn && campaignData?.checkInAt && !campaignData?.checkOutAt) {
        // Calculate current elapsed time from check-in timestamp
        const checkInTime = new Date(campaignData.checkInAt).getTime();
        const now = new Date().getTime();
        const actualElapsedSeconds = Math.max(0, Math.floor((now - checkInTime) / 1000));
        
        console.log('🔄 Screen focused - restarting timer with:', actualElapsedSeconds, 'seconds');
        setElapsedTime(actualElapsedSeconds);
        startTimer(actualElapsedSeconds);
      }
    }, [campaignData?.checkIn, campaignData?.checkInAt, campaignData?.checkOutAt, source])
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Watch for campaignData changes and start timer when checked in
  useEffect(() => {
    // Only monitor campaignData changes if coming from campaigns tab
    if (source !== 'campaigns') return;
    
    console.log('🔄 campaignData changed:', {
      checkIn: campaignData?.checkIn,
      checkInAt: campaignData?.checkInAt,
      checkOutAt: campaignData?.checkOutAt
    });
    
    // Start timer if just checked in
    if (campaignData?.checkIn && campaignData?.checkInAt && !campaignData?.checkOutAt) {
      const checkInTime = new Date(campaignData.checkInAt).getTime();
      const now = new Date().getTime();
      const elapsedSeconds = Math.max(0, Math.floor((now - checkInTime) / 1000));
      
      console.log('🚀 Starting timer from campaignData change:', elapsedSeconds, 'seconds');
      setElapsedTime(elapsedSeconds);
      startTimer(elapsedSeconds);
    }
    
    // Stop timer if checked out
    if (campaignData?.checkOutAt && timerInterval) {
      console.log('🛑 Stopping timer due to check-out');
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [campaignData?.checkIn, campaignData?.checkInAt, campaignData?.checkOutAt, source]);

  // Monitor app state changes to recalculate elapsed time when app comes back to foreground
  useEffect(() => {
    // Only monitor app state if coming from campaigns tab
    if (source !== 'campaigns') return;
    
    const handleAppStateChange = (nextAppState) => {
      console.log('📱 App state changed to:', nextAppState);
      
      if (nextAppState === 'active' && campaignData?.checkIn && campaignData?.checkInAt && !campaignData?.checkOutAt) {
        // App came back to foreground, recalculate elapsed time from check-in timestamp
        const checkInTime = new Date(campaignData.checkInAt).getTime();
        const now = new Date().getTime();
        const actualElapsedSeconds = Math.max(0, Math.floor((now - checkInTime) / 1000));
        
        console.log('🔄 App back to foreground - recalculating elapsed time:', actualElapsedSeconds, 'seconds');
        setElapsedTime(actualElapsedSeconds);
        
        // Restart timer with the correct elapsed time
        if (timerInterval) {
          clearInterval(timerInterval);
        }
        startTimer(actualElapsedSeconds);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [campaignData?.checkIn, campaignData?.checkInAt, campaignData?.checkOutAt, timerInterval, source]);

  // Calculate total worked time when checked out
  const calculateTotalWorkedTime = () => {
    if (campaignData?.checkInAt && campaignData?.checkOutAt) {
      const startTime = new Date(campaignData.checkInAt).getTime();
      const endTime = new Date(campaignData.checkOutAt).getTime();
      const totalSeconds = Math.max(0, Math.floor((endTime - startTime) / 1000));
      return formatElapsedTime(totalSeconds);
    }
    return '00:00:00';
  };

  // Format elapsed time to HH:MM:SS
  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCommentSend = async () => {
    setCommentSendLoader(true)
    try {
      await ApiManager('post', 'event-comments', {
        content: commentText,
        eventId: id
      })
      setCommentText('')
      getAllComments();
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    } finally {
      setCommentSendLoader(false)
    }
  }
  const handleDeleteComment = async (commentId) => {
    try {
      const { data } = await ApiManager('delete', `event-comments/${commentId}`)
      dispatch(openToast({ type: 'success', message: data?.message }));
      setAllCommentsData(prev => prev?.filter(item => item?.id !== commentId))
    } catch (error) {
      dispatch(openToast({ message: error?.response?.data?.message }));
    }
  }
  const getAllComments = async () => {
    try {
      const { data } = await ApiManager('get', `event-comments?page=${page}&perPage=5&eventId=${id}`)
      setTotalPages(data?.response?.totalPages)
      if (page > 1) {
        setAllCommentsData(prev => ([...prev, ...data?.response?.details]))
      } else {
        setAllCommentsData(data?.response?.details)
      }
    } catch (error) {
      console.log("🚀 ~ getAllComments ~ error:", error)
    }
  }

  const handleLoadMore = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }

  const renderCheckInButton = () => {
    // Only show check-in button if coming from campaigns tab
    if (source !== 'campaigns') {
      console.log('❌ Check-in button not showing - not from campaigns tab');
      return null;
    }
    
    // console.log('🔍 Check-in button conditions:');
    console.log('  - checkLoginStatus(false):', checkLoginStatus(false));
    console.log('  - campaignData?.registered:', campaignData?.registered);
    console.log('  - isOngoing:', isOngoing);
    console.log('  - !isInActive:', !isInActive);
    console.log('  - campaignStatus?.status:', campaignStatus?.status);
    console.log('  - campaignData?.activationStatus:', campaignData?.activationStatus);
    
    if (checkLoginStatus(false) && campaignData?.registered && isOngoing && !isInActive) {
      console.log('✅ All conditions met - showing check-in button');
      return (
        <CheckInButton
          style={styles.floatingButton}
          campaignData={campaignData}
          setCampaignData={setCampaignData}
          eventId={id}
        />
      )
    } else {
      console.log('❌ Check-in button not showing - conditions not met');
    }
  }

  const renderCheckInStatus = () => {
    console.log('🎨 renderCheckInStatus called');
    console.log('  - source:', source);
    console.log('  - checkLoginStatus(false):', checkLoginStatus(false));
    console.log('  - campaignData?.registered:', campaignData?.registered);
    console.log('  - campaignData?.checkIn:', campaignData?.checkIn);
    console.log('  - campaignData?.checkOutAt:', campaignData?.checkOutAt);
    console.log('  - elapsedTime:', elapsedTime);
    
    // Only show check-in status if coming from campaigns tab
    if (source !== 'campaigns') {
      console.log('❌ Check-in status not showing - not from campaigns tab');
      return null;
    }
    
    if (!checkLoginStatus(false) || !campaignData?.registered) return null;

    return (
      <View style={styles.checkInStatusContainer}>
        {campaignData?.checkIn && !campaignData?.checkOutAt ? (
          // Checked In State
          <View style={styles.checkedInContainer}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIndicator} />
              <Typography text="You are checked in" size={16} bold color={COLORS.white} />
            </View>
            
            <View style={styles.timerContainer}>
              <Typography text="Time worked:" size={14} color={COLORS.white} />
              <Typography text={formatElapsedTime(elapsedTime)} size={24} bold color={COLORS.white} />
            </View>
            
            <View style={styles.checkInTimeContainer}>
              <Typography text={`Checked in at: ${moment(campaignData?.checkInAt).format('MMM D, YYYY h:mm A')}`} size={12} color={COLORS.white} />
            </View>
          </View>
        ) : campaignData?.checkOutAt ? (
          // Checked Out State
          <View style={styles.checkedOutContainer}>
            <View style={styles.statusHeader}>
              <View style={[styles.statusIndicator, { backgroundColor: COLORS.grey }]} />
              <Typography text="You are checked out" size={16} bold color={COLORS.blackV2} />
            </View>
            
            <View style={styles.timerContainer}>
              <Typography text="Total time worked:" size={14} color={COLORS.blackV2} />
              <Typography text={calculateTotalWorkedTime()} size={24} bold color={COLORS.primary} />
            </View>
            
            <View style={styles.checkOutTimeContainer}>
              <Typography text={`Checked in: ${moment(campaignData?.checkInAt).format('MMM D, YYYY h:mm A')}`} size={12} color={COLORS.blackV2} />
              <Typography text={`Checked out: ${moment(campaignData?.checkOutAt).format('MMM D, YYYY h:mm A')}`} size={12} color={COLORS.blackV2} />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <FlatList
          nestedScrollEnabled
          data={allCommentsData || []}
          ListHeaderComponent={
            <>
              <Header back pH={16} />
              <View>
                <Container bgColor={COLORS.whiteV2}>
                  <ProfileHeader
                    isInActive={isInActive}
                    coverImg={
                      {
                        uri: campaignData?.bannerImage || placeholder_cover_img,
                      }}
                  >
                    <Typography text="Campaign" mT={14} size={11} color="#27272E99" />
                    <Flex algItems="center" jusContent={'space-between'}>
                      <Typography
                        text={campaignData.title}
                        size={24}
                        bold
                        color="#3C3F43"
                      />
                      <Flex algItems={'center'}>
                        <Typography
                          text={campaignData?.voltzPerHour}
                          bold
                          color={COLORS.primary}
                        />
                        <DealPointIcon />
                      </Flex>
                    </Flex>
                    <Typography color={campaignStatus?.color} bold>
                      {campaignStatus?.status.toUpperCase()}
                    </Typography>

                    {/* Check-in Status Display */}
                    {renderCheckInStatus()}

                    <Flex algItems="center" jusContent="space-between">
                      <View style={{ width: "80%" }}>
                        <Flex
                          mt={6}
                          gap={6}
                          flexStyle={{ width: "100%" }}
                        >
                          <ProfileCalendarIcon />
                          <Typography
                            text={`${moment(campaignData?.startDate).format(
                              "MMMM D, YYYY"
                            )} | ${moment(campaignData?.startDate).format(
                              "hh:mm a"
                            )} –${moment(campaignData?.endDate).format(
                              "MMMM D, YYYY"
                            )} | ${moment(campaignData?.endDate).format("hh:mm a")}`}
                            size={12}
                            color={COLORS.blackV2}
                          />
                        </Flex>

                        <Flex
                          mt={6}
                          gap={6}
                          flexStyle={{ width: "100%" }}
                        >
                          <ProfileLoactionIcon style={{ marginTop: 2, marginRight: 2 }} />
                          <Typography
                            text={`${campaignData?.country}, ${campaignData?.city}, ${campaignData?.state}`}
                            size={12}
                            color={COLORS.blackV2}
                            numberOfLines={2}
                          />
                        </Flex>
                      </View>
                      <LikeAndShare
                        sharePress={() =>
                          onShareLink({
                            page: "campaign",
                            id: id,
                            message: "Check out this campaign in voltz",
                          })
                        }
                      />
                    </Flex>

                    <Flex mt={8} algItems="center" gap={8} flexWrap={"wrap"}>
                      {campaignData?.sdg?.map((item, i) => {
                        return (
                          <Image
                            key={i}
                            source={{ uri: item?.image }}
                            style={{
                              width: sizer.moderateScale(33),
                              height: sizer.moderateVerticalScale(33),
                              borderRadius: 5,
                            }}
                          />
                        );
                      })}

                    </Flex>

                    <TouchableOpacity
                      activeOpacity={baseOpacity}
                      onPress={() => {
                        navigation.navigate("NGOProfile", {
                          id: campaignData?.userId,
                        });
                      }}
                    >
                      <Flex algItems="center" gap={8} mt={8}>
                        <Image
                          source={{
                            uri:
                              campaignData?.user?.profileImage || placeholder_cover_img,
                          }}
                          style={{
                            width: sizer.moderateScale(33),
                            height: sizer.moderateVerticalScale(33),
                            borderRadius: 50,
                          }}
                        />
                        <Typography text={campaignData?.user?.name} bold size={11} />
                      </Flex>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate("ViewAllVolunteers", {
                          eventId: campaignData?.id,
                          type: "donation",
                        })
                      }
                    >
                      <Flex algItems="center" mt={17} jusContent="space-between">
                        <Flex algItems="center">
                          <Typography
                            text={
                              "$" +
                              formatNumber(campaignData?.donationReceived) +
                              " raised"
                            }
                            color="#969696"
                            semiBold
                          />
                          {campaignData?.donationRequired && (
                            <Typography
                              text={` of $${formatNumber(
                                campaignData?.donationRequired
                              )} target`}
                              color="#969696"
                              size={11}
                              medium
                            />
                          )}
                        </Flex>
                        <CharityGroupedAvatar data={campaignData} />
                      </Flex>
                    </TouchableOpacity>

                    {campaignData?.donationRequired && (
                      <ProgressBar
                        progress={calculateDonationPercentage(
                          campaignData?.donationReceived || 0,
                          campaignData?.donationRequired || 0
                        )}
                        color={COLORS.secondary}
                        style={{
                          marginTop: sizer.moderateVerticalScale(8),
                          height: sizer.moderateVerticalScale(8),
                          borderRadius: 53,
                        }}
                      />
                    )}

                    <Flex gap={8} flexStyle={{ flex: 1 }}>
                      <Flex gap={8} flexStyle={{ flex: 1 }}>
                        {!campaignData?.registered && (
                          <OutlineButton
                            style={{ height: sizer.moderateVerticalScale(31) }}
                            label={"Register"}
                            isLoading={isLoading}
                            disabled={
                              campaignStatus?.status == "Expired" ||
                              campaignData?.volunteerRequired ==
                              campaignData?.totalVolunteerRegistered
                            }
                            onPress={() => {
                              handleRegister(campaignData?.id, "register");
                            }}
                          />
                        )}
                        <OutlineButton
                          // onPress={() => Linking.openURL(`${websiteUrl}charity/${campaignData?.id}`)}
                          onPress={() => Linking.openURL(`${linkObj['campaign'] + campaignData?.id}`)}
                          style={{ height: sizer.moderateVerticalScale(31) }}
                          label="View on Web"
                          disabled={
                            campaignStatus?.status == "Expired" ||
                            (campaignData?.donationRequired
                              ? campaignData?.donationReceived >=
                              campaignData?.donationRequired
                              : false)
                          }
                        />

                      </Flex>

                      {campaignData?.registered && !isExpired && !isInActive && (
                        <Flex flexStyle={{ flex: 0.12 }}>
                          <OutlineButton
                            style={{ height: sizer.moderateVerticalScale(31) }}
                            label={<VerticalEllipsis />}
                            onPress={() => setVisible(true)}
                          />
                        </Flex>
                      )}
                    </Flex>
                    <Typography
                      mT={14}
                      text={'Description'}
                      size={16}
                      mB={10}
                      bold
                    />
                    <Typography
                      size={12}
                      LineHeight={18}
                      text={campaignData?.description}
                    />
                  </ProfileHeader>

                  {SuggestedCampaignData?.items?.length > 1 && (
                    <ViewAll
                      label="You may also like"
                      fontBold
                      showViewAll={
                        SuggestedCampaignData?.items?.length > 1 ? true : false
                      }
                      onPress={() => {
                        navigation.navigate("ViewAllCampaigns");
                      }}
                    />
                  )}
                  <HorizontalScrollviewSpacing>
                    <Flex gap={8} mb={8}>
                      {SuggestedCampaignData?.items
                        ?.filter((campaignObj) => campaignObj?.id != id)
                        .map((obj, i) => (
                          <SuggestedCharityCard
                            data={obj}
                            key={i}
                            handlePress={() => {
                              navigation.push("CampaignProfile", { id: obj?.id });
                            }}
                          />
                        ))}
                    </Flex>
                  </HorizontalScrollviewSpacing>
                  {SuggestedCampaignData?.items?.length == 1 && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <EmptyCampaign width={sizer.moderateScale(200)} />
                      <Typography textAlign="center" mT={-30} mB={10} bold>
                        No Suggested Campaign Found
                      </Typography>
                    </View>
                  )}
                  <CampaignProfileBottomSheet
                    isVisible={isVisible}
                    setVisible={setVisible}
                    leaveEvent={() => {
                      if (
                        campaignStatus?.status == "Ongoing" &&
                        campaignStatus?.status == "Expired"
                      ) {
                        dispatch(
                          openToast({
                            message:
                              "You can't leave campaign Because it's " +
                              campaignStatus.status,
                          })
                        );
                        return;
                      }
                      handleRegister(campaignData?.id, "un-register");
                    }}
                    navigateLogMyHour={() =>
                      navigation.navigate("LogMyHours", { eventId: campaignData?.id })
                    }
                    campaignStatus={campaignStatus}
                  />
                  {/* <CampaignComments /> */}
                  {user && campaignData?.registered && !isInActive &&
                    <>

                      <Typography size={15} bold >
                        Comments
                      </Typography>
                      <MessageField
                        comment
                        placeholder="Enter comment here"
                        messageText={commentText}
                        setMessageText={setCommentText}
                        messageSendHandler={handleCommentSend}
                        sendLoading={commentSendLoader}
                      />
                    </>
                  }
                </Container>

                <DonationModal
                  isVisible={donationModal}
                  setVisible={setDonationModal}
                  setCardModal={setCardModal}
                  setPaymentApiUrl={setPaymentApiUrl}
                  data={campaignData}
                />
                <CardDetailModal
                  isVisible={cardModal}
                  setVisible={setCardModal}
                  paymentApiUrl={paymentApiUrl}
                  setDonationSuccess={setDonationSuccess}
                />
              </View>
            </>
          }
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => user && campaignData?.registered && <ListItem item={item} handleDeleteComment={handleDeleteComment} checkLoginStatus={checkLoginStatus} />}
          onEndReached={handleLoadMore}
        />
        {renderCheckInButton()}
      </KeyboardAvoidingView>

    </>
  );
};

export default CampaignProfile;



const ListItem = ({ item, checkLoginStatus, handleDeleteComment }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const onClose = () => {
    setMenuVisible(false)
  }

  return (
    <Container>
      <Flex jusContent="space-between" mt={15} >
        <Flex gap={6}>
          <TouchableOpacity onPress={() => { }}>
            <Image
              source={{
                uri:
                  item?.commenter?.profileImage
              }}
              style={styles.userImage}
            />
          </TouchableOpacity>
          <View style={styles.replyText}>
            <Typography size={14} semiBold>
              {item?.commenter?.firstName +
                " " +
                item?.commenter?.lastName}
            </Typography>
            <Typography size={13} >{item?.content}</Typography>
          </View>
        </Flex>

        {checkLoginStatus() && (
          <Menu
            contentStyle={styles.menu}
            visible={menuVisible}
            onDismiss={onClose}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Icon
                  name={"dots-three-vertical"}
                  size={sizer.fontScale(13)}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => {
              handleDeleteComment(item?.id)
              setMenuVisible(false)
            }} title="Delete" />
          </Menu>
        )}

      </Flex>
    </Container >

  )
}


const styles = StyleSheet.create({
  userImage: {
    width: sizer.moderateScale(40),
    height: sizer.moderateScale(40),
    borderRadius: sizer.moderateScale(20),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  menu: {
    overflow: 'hidden',
    borderRadius: 10,
    width: sizer.moderateScale(80),
    height: sizer.moderateScale(60),
    backgroundColor: COLORS.white
  },
  main: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginHorizontal: -CONSTANTS.containerPaddingX,
    height: sizer.moderateVerticalScale(567),
    marginTop: sizer.moderateVerticalScale(16),
    borderBottomLeftRadius: sizer.moderateScale(16),
    borderBottomRightRadius: sizer.moderateScale(16),
    overflow: "hidden",
  },
  coverImg: { height: 158, width: "100%" },
  profileImg: {
    borderRadius: 50,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: sizer.moderateVerticalScale(76),
    left: sizer.moderateScale(16),
  },
  floatingButton: {
    position: "absolute",
    right: sizer.moderateScale(16),
    bottom: sizer.moderateVerticalScale(16),
    width: sizer.moderateScale(136),
    height: sizer.moderateScale(46),
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    paddingHorizontal: sizer.moderateScale(10),
  },
  checkInStatusContainer: {
    marginTop: sizer.moderateVerticalScale(16),
    padding: CONSTANTS.containerPaddingX,
  },
  checkedInContainer: {
    padding: CONSTANTS.containerPaddingX,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizer.moderateVerticalScale(8),
  },
  statusIndicator: {
    width: sizer.moderateScale(16),
    height: sizer.moderateScale(16),
    borderRadius: sizer.moderateScale(8),
    backgroundColor: COLORS.secondary,
    marginRight: sizer.moderateScale(8),
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: sizer.moderateVerticalScale(8),
  },
  checkInTimeContainer: {
    alignItems: 'center',
  },
  checkedOutContainer: {
    padding: CONSTANTS.containerPaddingX,
    backgroundColor: COLORS.whiteV2,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
  },
  checkOutTimeContainer: {
    alignItems: 'center',
    marginTop: sizer.moderateVerticalScale(8),
  },
});