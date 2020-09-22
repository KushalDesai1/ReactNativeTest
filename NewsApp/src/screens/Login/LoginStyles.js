import AppColor from '../../utils/AppColor';
import AppFonts from '../../utils/AppFonts';
import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const LoginStyles = {
  logoView: {
    height: '60%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  loginView: {
    height: '40%',
    alignItems: 'center',
    backgroundColor: AppColor.headerBg,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  loginBtn: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: AppColor.white,
    borderRadius: 40,
    paddingVertical: DEVICE_HEIGHT * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f5ebef',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.32,
    elevation: 2,
    marginTop: 20,
  },
  loginText: {
    fontFamily: AppFonts.medium,
    fontSize: DEVICE_WIDTH * 0.06,
    marginTop: 10,
    color: AppColor.white,
  },
  googleText: {
    marginLeft: 10, 
    fontSize: DEVICE_WIDTH * 0.06, 
    fontFamily: AppFonts.medium
  }
};

export default LoginStyles;
