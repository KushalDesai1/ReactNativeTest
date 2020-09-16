import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';
import { Drawer } from 'react-native-paper';
import DrawerStyles from './DrawerStyles';
import ProgressiveImage from '../components/ProgressiveImage/ProgressiveImage';
import AppColor from '../utils/AppColor';
import AppFonts from '../utils/AppFonts';
import AsyncStorage from '@react-native-community/async-storage';

const URL = "https://www.redbytes.in/";

const ItemSeparator = () => {
  return <View
    style={{
      width: '90%',
      height: 1,
      alignSelf: 'center',
      marginVertical: 20,
      backgroundColor: AppColor.separatorColor
    }} />
}

const DrawerContent = (props) => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    configGoogleSignIn();
    getUserValue();
  }, []);

  const getUserValue = async () => {
    let userInfo;
    try {
      userInfo = await AsyncStorage.getItem('UserInfo')
      userInfo = JSON.parse(userInfo)

      if (userInfo) {
        setUserName(userInfo.user.name)
        setUserEmail(userInfo.user.email)
        setUserPhoto(userInfo.user.photo)
      } else {

      }
    } catch (error) {
      // handle here
    }
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Remember to remove the user from your app
      AsyncStorage.removeItem('UserInfo')
        .then(() => {
          dispatch({ type: 'IS_LOGGED_OUT' })
        })
    } catch (error) {
      console.error(error);
    }
  };

  configGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '622816545250-qc7ritfpbtnc5sti1r2k6a2jesiuce63.apps.googleusercontent.com',
      offlineAccess: false
    });
  }

  const logOutConfirmation = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Yes', onPress: () => {
            signOut();
          }
        },
      ],
      { cancelable: false });
    return true;

  }


  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={DrawerStyles.drawerContent}>
          <View style={DrawerStyles.profileView}>
            <ProgressiveImage
              style={DrawerStyles.profileImage}
              uri={userPhoto}
            />
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={DrawerStyles.profileName}>{userName}</Text>
              <Text style={DrawerStyles.profileEmail}>{userEmail}</Text>
            </View>
          </View>
          {ItemSeparator()}
        </View>

        <Drawer.Section>
          <DrawerItem
            icon={() => (
              <Image source={require('../assets/images/home_black.png')}
                style={DrawerStyles.icon}
              />
            )}
            activeTintColor='purple'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Dashboard'
            )}
            label="Dashboard"
            labelStyle={DrawerStyles.menuLabel}
            onPress={() => { props.navigation.navigate('Dashboard') }}
          />
          
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={DrawerStyles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Image source={require('../assets/images/logout.png')}
              style={DrawerStyles.icon}
            />
          )}
          label="Log Out"
          labelStyle={DrawerStyles.menuLabel}
          onPress={() => { logOutConfirmation() }}
        />
      </Drawer.Section>
    </View>
  );
}

const getActiveRouteState = function (routes, index, name) {
  return routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
};

export default DrawerContent;