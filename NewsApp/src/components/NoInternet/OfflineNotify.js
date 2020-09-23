import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, Text, StyleSheet, Animated} from 'react-native';
import AppColor from '../../utils/AppColor';
import AppStrings from '../../utils/AppStrings';

export const NetworkContext = React.createContext({isConnected: true});

class OfflineNotify extends React.PureComponent {
  static contextType = NetworkContext;

  state = {
    isConnected: true,
    animationSlideIn: new Animated.Value(-30),
    animationSlideOut: new Animated.Value(0),
    onlineFlag: 0,
  };

  componentDidMount() {
    //Subscribe to network state updates
    NetInfo.addEventListener((state) => {
      this.setState({isConnected: state.isConnected}, () => {
        this.handleConnectivityChange();
      });
    });
  }

  componentWillUnmount() {}

  handleConnectivityChange = () => {
    if (this.state.isConnected) {
      this.slideOutAnimation();
    } else {
      this.slideInAnimation();
    }
  };

  slideInAnimation = () => {
    
      Animated.timing(this.state.animationSlideIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() =>{
        this.setState({
          animationSlideIn: new Animated.Value(0)
        })
      });
  };

  slideOutAnimation = () => {
    Animated.timing(this.state.animationSlideIn, {
      toValue: -30,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        animationSlideIn: new Animated.Value(-30)
      })
    });
  }

  render() {
    const transformStyle = {
      transform: [
        {
          translateY: this.state.animationSlideIn,
        },
      ],
    };

    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}

        <View style={{position: 'absolute', width: '100%'}}>
          <Animated.View style={[transformStyle]}>
            {!this.state.isConnected ? 
            <View
              style={styles.noInternetStyle}>
              <Text style={styles.textStyle}>
                {AppStrings.internetError}
              </Text>
            </View>
            : null}
          </Animated.View>
        </View>
      </NetworkContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  noInternetStyle: {
    backgroundColor: AppColor.red,
    alignItems: 'center',
  },
  internetStyle: {
    alignItems: 'center',
  },
  textStyle: {
    color: AppColor.white,
  },
});

export default OfflineNotify;
