import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';

// importing Drawer content
import DrawerContent from './screens/DrawerContent';

// importing screen
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName='Login'>
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='HomeStack' component={DrawerScreen} />
    </AuthStack.Navigator>
  )
}

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator headerMode="none">
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    </DashboardStack.Navigator>
  )
}

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerType="back"
      drawerContent={props => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Drawer.Screen name="DashboardStack" component={DashboardStackScreen} />
      {/* <Drawer.Screen name="AboutUs" component={AboutUs} /> */}
    </Drawer.Navigator>
  );

}

const RoutesNavigator = () => {
  // const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const isUserSignedIn = useSelector(state => state.loginReducer.isUserLoggedIn)

  return (
    <NavigationContainer>
      {isUserSignedIn ?
        <DrawerScreen />
        : <AuthStackScreen />
      }
    </NavigationContainer>
  );
};

export default RoutesNavigator;
