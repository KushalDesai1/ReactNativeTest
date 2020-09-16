import React from 'react';
import { View, NativeModules, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import HeaderComponent from '../../components/Header/HeaderComponent';
import AppImage from '../../utils/AppImage';
import DashboardStyles from './DashboardStyles';

class Dashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {

  }

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  gotoRecruitmentScreen = () => {
    this.props.navigation.navigate('Recruitment')
  }

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent
          title="Dashboard"
          menu={true}
          handleDrawer={() => this.toggleDrawer()}
        />
        <View style={{ alignItems: 'center', height: '92%' }}>

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => { return {} }

const mapDispatchToProps = dispatch => {
  return {
    userLogOut: () => dispatch({ type: 'IS_LOGGED_OUT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
