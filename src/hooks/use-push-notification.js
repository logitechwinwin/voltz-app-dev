import messaging from '@react-native-firebase/messaging';
import format from 'pretty-format';

const usePushNotification = (dispatch, navigation) => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFCMToken();
    }
  }

  async function getNotificationCount() {
    // try {
    //   let {data} = await ApiManager("get", "notificationCount")
    //   if (data?.data?.setTotalNotification) {
    //      dispatch(setNotificationCount(data?.data?.totalUnreadNotifications))
    //   }
    // } catch (error) {
    //   console.log("🚀 ~ getNotificationCount ~ error:", error)
    // }
  }

  async function getFCMToken() {
    let fcmToken = await messaging().getToken();
    try {
      if (fcmToken) {
        return fcmToken;
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: push-notification.js:33 ~ getFCMToken ~ error:',
        error,
      );
    }
    return fcmToken;
  }

  function notificationListener() {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("🚀 ~ messaging ~ remoteMessage:", remoteMessage)
      // if (remoteMessage?.data?.screenType == 'Estimate') {
      //   navigation.navigate('Notifications')
      //   return
      // }
      // navigation.navigate('Notifications')
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(remoteMessage);
          // getNotificationCount()
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      // getNotificationCount()
    });
  }

  function backgroundMessageHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background! *', remoteMessage);
    });
  }

  return {
    requestUserPermission,
    notificationListener,
    backgroundMessageHandler,
    getFCMToken,
  };
};

export {usePushNotification};