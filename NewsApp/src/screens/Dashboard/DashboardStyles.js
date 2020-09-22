import {StyleSheet, Dimensions} from 'react-native';
import AppColor from '../../utils/AppColor';
import AppFonts from '../../utils/AppFonts';

const DEVICE_WIDTH = Dimensions.get('window').width;

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
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
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
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchRootView: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  searchView: {
    padding: 5,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColor.white,
    width: '70%',
  },
  searchArticleView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: AppColor.searchArticle,
    width: '25%',
    marginVertical: 10,
  },
  searchInput: {
    fontSize: DEVICE_WIDTH * 0.055,
    fontFamily: AppFonts.light,
    width: '100%',
  },
  searchArticleText: {
    color: AppColor.white,
    fontFamily: AppFonts.medium,
    textAlign: 'center',
  },
  separatorView: {
    height: 1,
          width: '100%',
          backgroundColor: AppColor.lightGrey,
  }
});

export default DashboardStyles;
