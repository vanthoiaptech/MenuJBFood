import AsyncStorage from '@react-native-community/async-storage';

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
