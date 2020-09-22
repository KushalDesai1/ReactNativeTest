import {StyleSheet, Dimensions} from 'react-native';
import AppColor from '../../utils/AppColor';
import AppFonts from '../../utils/AppFonts';

const DEVICE_WIDTH = Dimensions.get('window').width;

const SearchArticleStyle = StyleSheet.create({
  searchView: {
    padding: 5,
    borderRadius: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColor.white,
    width: '80%',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: AppColor.searchArticle,
    width: '15%',
    marginVertical: 10,
  },
  searchButtonDisable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: AppColor.lightGrey,
    width: '15%',
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
    fontSize: DEVICE_WIDTH * 0.045,
  },
  userInstruction: {
    fontSize: DEVICE_WIDTH * 0.06,
    color: AppColor.greyText,
    fontFamily: AppFonts.regular,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  articleView: {
    marginVertical: 10,
    backgroundColor: AppColor.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  newsInfoHeader: {
    fontFamily: AppFonts.bold,
    color: AppColor.greyText,
    fontSize: DEVICE_WIDTH * 0.04,
  },
  newsInfoText: {
    fontFamily: AppFonts.regular,
    color: AppColor.greyText,
    flexWrap: 'wrap',
    fontSize: DEVICE_WIDTH * 0.038,
  },
  pdfView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default SearchArticleStyle;
