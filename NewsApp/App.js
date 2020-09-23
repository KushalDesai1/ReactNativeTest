/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RoutesNavigator from './src/RoutesNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import OfflineNotify from './src/components/NoInternet/OfflineNotify';

class App extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <OfflineNotify>
          <RoutesNavigator />
        </OfflineNotify>
      </Provider>
    );
  }
}

export default App;
