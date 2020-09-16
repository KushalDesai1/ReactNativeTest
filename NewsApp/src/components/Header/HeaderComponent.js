import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import HeaderStyle from './HeaderStyle';
import AppImage from '../../utils/AppImage';

const HeaderComponent = props => {

  return (
    <View style={HeaderStyle.container}>
      {props.menu ? (
        <TouchableOpacity onPress={props.handleDrawer}>
          <Image
            source={AppImage.menu}
            style={{width: 25, height: 25, marginLeft: 10}}
          />
        </TouchableOpacity>
      ) : props.backEnabled ? (
        <TouchableOpacity onPress={props.handleBackpress}>
          <Image
            source={AppImage.back_navigate}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
      ) : (
        <Image source={null} style={{width: 25, height: 25, marginLeft: 5}} />
      )}

      <Text style={HeaderStyle.title}>{props.title}</Text>

      <Image source={null} style={{width: 25, height: 25, marginLeft: 5}} />
    </View>
  );
};

export default HeaderComponent;
