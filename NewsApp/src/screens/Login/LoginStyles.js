import AppColor from '../../utils/AppColor';
import { Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const LoginStyles = {
  loginBtn: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: AppColor.white,
    borderRadius: 40,
    paddingVertical: DEVICE_HEIGHT * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#f5ebef",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.32,
    elevation: 2,
    marginTop: 20
  }
}

export default LoginStyles;