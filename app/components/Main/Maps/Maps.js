import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import listRestaurantsVI from '../../../../api/restaurants/restaurants_vi';
import listRestaurantsEN from '../../../../api/restaurants/restaurants_en';
import listRestaurantsJA from '../../../../api/restaurants/restaurants_ja';
import {Icon} from 'react-native-elements';
import {withNamespaces} from 'react-i18next';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.012;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurants: [],
      marginTop: 0,
      languageCode: '',
    };
  }

  getListRestaurants = () => {
    let listRestaurants = listRestaurantsJA;
    let {languageCode} = this.state;
    // if (languageCode === '') {
    //   languageCode = locale.substr(0, 2);
    // }
    if (languageCode === 'vi') {
      listRestaurants = listRestaurantsVI;
    }
    if (languageCode === 'en') {
      listRestaurants = listRestaurantsEN;
    }
    this.setState({
      listRestaurants: listRestaurants,
    });
  };

  async componentDidMount() {
    setTimeout(() => this.setState({marginTop: -1}), 500);
    this.requestLocationPermission();
    await getLanguageCode()
      .then(res =>
        this.setState({
          languageCode: res,
        }),
      )
      .catch(err => console.log(err));
    this.getListRestaurants();
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  locateCurrentPosition = () => {
    const {t} = this.props;
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: t('maps:propmt gps'),
      ok: t('common:setting'),
      cancel: t('common:skip'),
      style: {
        positiveButtonTextColor: '#001F5F',
        negativeButtonTextColor: '#7E7E7E',
      },
    })
      .then(() => {
        Geolocation.getCurrentPosition(
          position => {
            let initialPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATTITUDE_DELTA,
              longitudeDelta: LONGTITUDE_DELTA,
            };
            this.setState({initialPosition});
          },
          error => console.log(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const {
      container,
      imageMarker,
      titleMarker,
      markerWrapper,
      textMarker,
      content,
      more,
      textMore,
    } = styles;
    const {navigation, t} = this.props;
    return (
      <View style={container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{
            ...StyleSheet.absoluteFillObject,
            marginTop: this.state.marginTop,
          }}
          initialRegion={this.state.initialPosition}>
          {this.state.listRestaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}>
              <Image
                style={imageMarker}
                source={require('../../../images/LOGO.png')}
                tintColor="#DD3624"
              />
              <Callout
                onPress={() =>
                  navigation.navigate('MenuFoodsScreen', {restaurant})
                }>
                <View style={markerWrapper}>
                  <Text style={titleMarker}>{restaurant.name}</Text>
                  <View style={content}>
                    <Icon name="map-marker" type="font-awesome" />
                    <Text style={textMarker}>{restaurant.address}</Text>
                  </View>
                  <View style={content}>
                    <Icon name="phone" type="font-awesome" />
                    <Text style={textMarker}>{restaurant.phone}</Text>
                  </View>
                  <View style={more}>
                    <Text style={textMore}>{t('maps:see more')}</Text>
                  </View>
                </View>
              </Callout>
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
    flex: 1,
    padding: 10,
  },
  imageMarker: {
    width: 40,
    height: 40,
    resizeMode: 'center',
  },
  titleMarker: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  markerWrapper: {
    width: 250,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textMarker: {
    marginLeft: 10,
    fontSize: 15,
  },
  more: {
    alignItems: 'flex-end',
  },
  textMore: {
    fontSize: 15,
    color: '#001F5F',
  },
});

export default withNamespaces(['maps', 'common'], {wait: true})(Maps);
