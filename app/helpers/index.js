import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const getStorangeValue = async () => {
  try {
    const value = await AsyncStorage.getItem('@languageCode');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    Alert.alert(error);
  }
};
