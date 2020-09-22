import { StyleSheet, Dimensions } from "react-native";
import AppColor from "../../utils/AppColor";
import AppFonts from "../../utils/AppFonts";

const DEVICE_WIDTH = Dimensions.get('window').width;

const NewsDetailsStyle = StyleSheet.create({
    newsInfoHeader: {
        fontFamily: AppFonts.bold,
        color: AppColor.greyText,
        fontSize: DEVICE_WIDTH * 0.04
    },
    newsInfoText: {
        fontFamily: AppFonts.regular,
        color: AppColor.greyText,
        flexWrap: 'wrap',
        fontSize: DEVICE_WIDTH * 0.038
    },
    newsBulletView: {
        width: 5,
        height: 5,
        backgroundColor: AppColor.headerBg,
        marginRight: 10,
    }
  });
  
  export default NewsDetailsStyle;