import { StyleSheet, Dimensions } from 'react-native';
import AppColor from '../../utils/AppColor';
import AppFonts from '../../utils/AppFonts';

const DEVICE_WIDTH = Dimensions.get('window').width;

const HeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: '95%',
        height: '8%',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: AppColor.headerBg,
    },
    title: {
        color: AppColor.white,
        fontSize: DEVICE_WIDTH*0.06,
        fontFamily: AppFonts.bold,
        textAlign: 'center',
    }
});

export default HeaderStyle;