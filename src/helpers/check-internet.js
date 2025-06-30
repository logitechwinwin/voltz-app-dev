import NetInfo from '@react-native-community/netinfo';

export default function CheckInternet() {
  return new Promise(async resolve => {
    let result = await NetInfo.fetch();
    if (result != null) {
      resolve(result?.isConnected);
    }
  });
}
