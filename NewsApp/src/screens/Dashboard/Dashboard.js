import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';
import HeaderComponent from '../../components/Header/HeaderComponent';
import DashboardStyles from './DashboardStyles';
import axios from 'axios';
import APIStrings from '../../webservice/APIStrings';
import AppColor from '../../utils/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppFonts from '../../utils/AppFonts';
import Loader from '../../components/Loader/Loader';

const DEVICE_WIDTH = Dimensions.get('window').width;

class Dashboard extends React.Component {
  constructor(props) {
    super();
    this.page = 1;
    this.onEndReachedCalledDuringMomentum = false;
    this.arrayholder = [];
    this.state = {
      page: 1,
      isLoading: true,
      isRefreshing: false,
      newsList: [],
      searchValue: '',
    };
  }

  componentDidMount() {
    this.getNewsList();
  }

  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  getNewsList = (pageIndex) => {
    axios
      .get(APIStrings.newsListAPI, {
        params: {
          page: pageIndex,
        },
      })
      .then((response) => {
        let responseJson = response.data;
        this.setState(
          {
            newsList: responseJson.items,
            isLoading: false,
          },
          () => {
            this.arrayholder = this.state.newsList;
          },
        );
      })
      .catch((error) => {
        console.log(error);
        this.state({isLoading: false});
      });
  };

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      this.setState({isRefreshing: true});
      this.page = this.page + 1; // increase page by 1
      this.loadMoreNewsList(this.page); // method for API call
    }
  };

  loadMoreNewsList = (pageIndex) => {
    axios
      .get(APIStrings.newsListAPI, {
        params: {
          page: pageIndex,
        },
      })
      .then((response) => {
        let responseJson = response.data;
        this.setState(
          {
            newsList: [...this.state.newsList, ...responseJson.items],
            isRefreshing: false,
          },
          () => {
            this.arrayholder = this.state.newsList;
          },
        );
      })
      .catch((error) => {
        console.log(error);
        this.state({isRefreshing: false});
      });
  };

  onRefresh = () => {
    this.setState({isLoading: true, page: 1, newsList: []}, () => {
      this.getNewsList();
    });
  };

  gotoNewsDetailScreen = (newsDetail) => {
    this.props.navigation.navigate('NewsDetails', {
      newsDetail,
    });
  };

  renderNewsList = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.gotoNewsDetailScreen(item)}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              width: DEVICE_WIDTH - 40,
              fontFamily: AppFonts.regular,
              fontSize: DEVICE_WIDTH * 0.04,
              color: AppColor.newsTitle,
            }}>
            {index + 1}.{'  '}
            <Text style={{textDecorationLine: 'underline'}}>
              {item.title} ({item.place_of_publication}) {item.start_year}-
              {item.end_year}
            </Text>
          </Text>
          <View style={{flexDirection: 'row', width: DEVICE_WIDTH - 40}}>
            <Text>URL: </Text>
            <Text style={{textDecorationLine: 'underline'}}>{item.url}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFlatlist = () => {
    return (
      <FlatList
        style={{marginHorizontal: 10, marginTop: 10}}
        data={this.state.newsList}
        extraData={this.state.newsList}
        initialNumToRender={20}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => this.renderNewsList(item, index)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.onRefresh()}
            colors={[AppColor.headerBg]}
          />
        }
        ItemSeparatorComponent={() => this.renderSeparator()}
        ListFooterComponent={() => this.renderFooter()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!this.onEndReachedCalledDuringMomentum) {
            this.handleLoadMore(); // LOAD MORE DATA
            this.onEndReachedCalledDuringMomentum = true;
          }
        }}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
      />
    );
  };

  searchNewsList = (text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()} 
      ${item.place_of_publication.toUpperCase()} 
      ${item.start_year.toString().toUpperCase()} 
      ${item.end_year.toString().toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({newsList: newData});
  };

  renderSearchView = () => {
    return (
      <View style={DashboardStyles.searchView}>
        <Icon
          name="search"
          size={20}
          color={AppColor.grey}
          style={{marginHorizontal: 10}}
        />
        <TextInput
          placeholder={'Search '}
          style={DashboardStyles.searchInput}
          value={this.state.searchValue}
          onChangeText={(text) => {
            this.setState({searchValue: text}, () => {
              this.searchNewsList(text);
            });
          }}
        />
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: AppColor.lightGrey,
        }}
      />
    );
  };

  renderFooter = () => {
    return (
      <View style={DashboardStyles.footer}>
        {this.state.isRefreshing ? (
          <ActivityIndicator
            color={AppColor.headerBg}
            style={{margin: 20}}
            size="large"
            animating
          />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderComponent
          title="Dashboard"
          menu={true}
          handleDrawer={() => this.toggleDrawer()}
        />

        {this.renderSearchView()}
        <Loader loading={this.state.isLoading} />
        {this.renderFlatlist()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogOut: () => dispatch({type: 'IS_LOGGED_OUT'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
