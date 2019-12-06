import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
} from 'react-native-maps';

class Maps extends Component {
  state = {
    coordinates: [
      {name: '1', latitude: 37.8025259, longitude: -122.4351431},
      {name: '2', latitude: 37.7896386, longitude: -122.421646},
      {name: '3', latitude: 37.7665248, longitude: -122.4161628},
      {name: '4', latitude: 37.7734153, longitude: -122.4577787},
      {name: '5', latitude: 37.7948605, longitude: -122.4596065},
    ],
  };

  render() {
    const {container, map, imageMarker, titleMarker} = styles;
    return (
      <View style={container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}>
          {this.state.coordinates.map(marker => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}>
              <Text style={titleMarker}>{marker.name}</Text>
              <Image
                style={imageMarker}
                source={require('../../../../images/icon/marker.png')}
              />
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
  },
  imageMarker: {
    width: 50,
    height: 50,
  },
  titleMarker: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Maps;
