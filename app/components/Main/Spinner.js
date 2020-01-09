import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

class Spinner extends Component {
  render() {
    const {size, style} = this.props;
    if (style === 'loading') {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={size} color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={styles.loadMore}>
        <ActivityIndicator size={size} color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  loadMore: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Spinner;
