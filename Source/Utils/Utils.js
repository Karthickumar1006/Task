import {PermissionsAndroid, Platform} from 'react-native';

//Requesting permission for ExternalWritePermission for access file manager
export async function requestExternalWritePermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
    return false;
  } else {
    return true;
  }
}
