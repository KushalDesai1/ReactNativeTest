import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import AppStyles from '../../utils/AppStyles';
import AppFonts from '../../utils/AppFonts';
import AppImage from '../../utils/AppImage';
import LoginStyles from './LoginStyles';
import * as Types from '../../redux/actionTypes';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import AppColor from '../../utils/AppColor';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isGoogleProcessing: false,
      isAppleProcessing: false,
    };
  }

  componentDidMount() {
    this.configGoogleSignIn();
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo = async () => {
    try {
      this.setState({ isGoogleProcessing: true })
      const userInfo = await GoogleSignin.signInSilently();
      if (userInfo !== null) {
        this.setState({
          isGoogleProcessing: false
        }, () => {
          this.saveUserData(userInfo)
        })
      } else {
        this.setState({ isGoogleProcessing: false })
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
      this.setState({ isGoogleProcessing: false })
    }
  };

  configGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '622816545250-qc7ritfpbtnc5sti1r2k6a2jesiuce63.apps.googleusercontent.com',
      offlineAccess: false
    });
  }

  onGoogleLogin = async () => {

    this.setState({
      isGoogleProcessing: true
    })

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo !== null) {
        this.setState({
          isGoogleProcessing: false
        }, () => {
          this.saveUserData(userInfo)
        })
      } else {
        this.setState({ isGoogleProcessing: false })
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Sign In cancelled: ' + error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Sign In Progress: ' + error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY SERVICES NOT AVAILABLE: ' + error);
      } else {
        // some other error happened
        console.log('OTHER ERROR: ' + error);
      }
      this.setState({ isGoogleProcessing: false })
    }

  }

  saveUserData = async (userInfo) => {
    try {
      AsyncStorage.setItem('UserInfo', JSON.stringify(userInfo))
      .then(() => {
        this.props.userLogin()
      })
    } catch (error) {}
  }

  render() {
    return (
      <SafeAreaView style={{ ...AppStyles.rootViewContainer, backgroundColor: AppColor.white }}>
        <View style={{ height: '60%', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={AppImage.loginScreenImage}/>
        </View>
        <View
          style={{
            height: '40%',
            alignItems: 'center',
            backgroundColor: AppColor.headerBg,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50
          }}>
          <Text style={{
            fontFamily: AppFonts.medium,
            fontSize: 23, marginTop: 10, color: AppColor.white
          }}>Login with</Text>
          {this.state.isGoogleProcessing === true ?
            <ActivityIndicator size={30} color={AppColor.white} /> :
            <TouchableOpacity onPress={() => this.onGoogleLogin()}
              style={LoginStyles.loginBtn}
              activeOpacity={0.8}>
              <Image source={AppImage.googleImage} />
              <Text style={{ marginLeft: 10, fontSize: 20, fontFamily: AppFonts.medium }}>Google</Text>
            </TouchableOpacity>
          }
        </View>


      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => { return {} };

const mapDispatchToProps = dispatch => {
  return {
    userLogin: () => dispatch({ type: Types.IS_LOGGED_IN })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
