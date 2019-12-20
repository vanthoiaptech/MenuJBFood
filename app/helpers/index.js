import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export default getStorangeValue = async () => {
  try {
    const value = await AsyncStorage.getItem('@languageCode');
    if (value !== null) {
      this.setState({
        languageCode: value,
      });
    }
  } catch (error) {
    Alert.alert(error);
  }
}
