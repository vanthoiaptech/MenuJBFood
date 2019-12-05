/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Main from './app/components/Main';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => Main);
