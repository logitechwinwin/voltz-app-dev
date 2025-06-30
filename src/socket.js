import {io} from 'socket.io-client';
import {baseApiUrl} from './globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function initializeSocket() {
  try {
    let token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (error) {
    throw error;
  }
}

export const socketConnectionPromise = initializeSocket().then(token => {
  return io(baseApiUrl, {
    extraHeaders: {
      accessToken: token,
    },
  });
});

export const newSocketConnectionPromise = async () => {
  const token = await initializeSocket();
  return io(baseApiUrl, {
    extraHeaders: {
      accessToken: token,
    },
  });
};
