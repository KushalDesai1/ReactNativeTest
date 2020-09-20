import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

// importing Drawer content
import DrawerContent from './screens/DrawerContent';

// importing screen
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';
import NewsDetails from './screens/NewsDetails/NewsDetails';
import SearchArticle from './screens/SearchArticle/SearchArticle';
import ArticleDetails from './screens/SearchArticle/ArticleDetails';

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
      <DashboardStack.Screen name="NewsDetails" component={NewsDetails}/>
      <DashboardStack.Screen name="SearchArticle" component={SearchArticle}/>
      <DashboardStack.Screen name="ArticleDetails" component={ArticleDetails}/>
    </DashboardStack.Navigator>
  )
}

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerType="back"
      drawerContent={props => <DrawerContent {...props} />}
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
