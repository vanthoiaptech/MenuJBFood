import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import i18n from '../../utils/i18n';

const {width} = Dimensions.get('window');

const OfflineNotice = () => {
  const [isInternetReachable, setIsInternetReachable] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const {container, text} = styles;

  if (isInternetReachable) {
    return null;
  }

  return (
    <View style={container}>
      <Text style={text}>{i18n.t('common:no internet connection')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    top: 60,
    left: -10,
    opacity: 0.9,
  },
  text: {
    color: '#FFF',
  },
});

export default OfflineNotice;
