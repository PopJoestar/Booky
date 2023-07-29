/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import './i18n';
import './notification';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
