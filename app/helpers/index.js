import AsyncStorage from '@react-native-community/async-storage';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

/**
 * get @languageCode from AsyncStorage
 * @return string
 */

export const getLanguageCode = async () => {
  try {
    const value = await AsyncStorage.getItem('@languageCode');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};
