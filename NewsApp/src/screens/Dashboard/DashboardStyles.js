import { StyleSheet } from 'react-native';
import AppColor from '../../utils/AppColor';

const DashboardStyles = StyleSheet.create({
  appView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: '80%',
  },
  category: {
    width: '95%',
    height: '45%',
    backgroundColor: AppColor.white,
    borderRadius: 20,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 5, },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3
  },
  nextArrow: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginRight: 10,
  },
  mainImage: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default DashboardStyles;