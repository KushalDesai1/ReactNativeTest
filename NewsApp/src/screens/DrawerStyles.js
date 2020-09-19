import AppFonts from "../utils/AppFonts";
import {Dimensions} from 'react-native';
import AppColor from "../utils/AppColor";

const DEVICE_WIDTH = Dimensions.get('window').width;

const DrawerStyles = {
  drawerContent:{
      flex: 1
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  profileView: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20
  },
  profileImage: {
    width: 70, 
    height: 70, 
    borderRadius:50,
    borderWidth: 2,
    borderColor: AppColor.headerBg
  },
  profileName: {
    fontSize: DEVICE_WIDTH*0.045,
    fontFamily: AppFonts.bold,
    color: '#2F363F'
  },
  profileEmail: {
    fontSize: DEVICE_WIDTH*0.035,
    fontFamily: AppFonts.medium,
    color: '#616C6F'
  },
  icon: {
    width: 20,
		height: 20
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  menuLabel: {
    fontSize: DEVICE_WIDTH*0.04,
    fontFamily: AppFonts.regular
  }
}

export default DrawerStyles;