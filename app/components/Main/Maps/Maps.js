import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import {Icon} from 'react-native-elements';
import {withNamespaces} from 'react-i18next';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {domain} from '../../../constants/urlDefine';

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
      languageCode: 'ja',
      isLoading: false,
      geolocationError: false,
    };
  }

  getListRestaurants = async () => {
    this.setState({isLoading: true});
    let {languageCode} = this.state;
    try {
      let response = await fetch(`${domain}/api/restaurants/${languageCode}`);
      let listRestaurants = await response.json();
      this.setState({
        listRestaurants,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        listRestaurants: [],
      });
    }
  };

  async componentDidMount() {
    setTimeout(() => this.setState({marginTop: -1}), 500);
    this.requestLocationPermission();
    await getLanguageCode()
      .then(res => {
        const languageCode = res ? res : 'ja';
        this.setState({
          languageCode,
        });
      })
      .catch(() =>
        this.setState({
          languageCode: 'ja',
        }),
      );
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

  watchID: ?number = null;

  // get device location on the map
  locateCurrentPosition = () => {
    this.setState({isLoading: true});
    const {t} = this.props;
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      //turn on the dialog box from android location services
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
            this.setState({
              initialPosition,
              isLoading: false,
            });
          },
          error => {
            this.setState({isLoading: false});
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

        this.watchID = Geolocation.watchPosition(
          position => {
            let initialPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATTITUDE_DELTA,
              longitudeDelta: LONGTITUDE_DELTA,
            };
            this.setState({
              initialPosition,
              isLoading: false,
            });
          },
          error => {
            this.setState({isLoading: false});
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
      });
  };

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  renderSpinner = () => {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
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
    const {listRestaurants, marginTop} = this.state;
    return (
      <View style={container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{
            ...StyleSheet.absoluteFillObject,
            marginTop: marginTop,
          }}
          initialRegion={this.state.initialPosition}>
          {listRestaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: parseFloat(restaurant.latitude),
                longitude: parseFloat(restaurant.longitude),
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
        {this.renderSpinner()}
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
