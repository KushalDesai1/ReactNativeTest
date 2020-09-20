import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AppColor from '../../utils/AppColor';

const Loader = (props) => {
  const {loading} = props;

  if (loading) {
    return (<View style={styles.modalBackground}>
      <ActivityIndicator
        size="large"
        color={AppColor.headerBg}
        animating={loading}
      />
    </View>);
  } else {
    return <View />;
  }
  // return (
  //   <View style={{flex: 1}}>
  //     {loading ?
  //       <View style={styles.modalBackground}>
  //         <ActivityIndicator
  //           size='large'
  //           color={AppColor.headerBg}
  //           animating={loading} />
  //       </View>
  //       : null}
  //   </View>

  // )
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
export default Loader;
