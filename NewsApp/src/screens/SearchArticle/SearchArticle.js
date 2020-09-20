import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import AppStyles from '../../utils/AppStyles';
import SearchArticleStyle from './SearchArticleStyle';
import HeaderComponent from '../../components/Header/HeaderComponent';
import AppColor from '../../utils/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import AppStrings from '../../utils/AppStrings';
import APIStrings from '../../webservice/APIStrings';
import moment from 'moment';
import AppFonts from '../../utils/AppFonts';
import AppImage from '../../utils/AppImage';

class SearchArticle extends React.Component {
  constructor(props) {
    super();
    this.page = 1;
    this.onEndReachedCalledDuringMomentum = false;
    this.state = {
      searchValue: '',
      isLoading: false,
      isRefreshing: false,
      articleList: [],
    };
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
  };

  getArticleList = () => {
    this.setState({isLoading: true, articleList: []});

    axios
      .get(APIStrings.searchArticleAPI, {
        params: {
          page: this.page,
          andtext: this.state.searchValue,
        },
      })
      .then((response) => {
        let responseJson = response.data;
        this.setState({
          articleList: responseJson.items,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.state({isLoading: false});
      });
  };

  renderSearchView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignSelf: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={SearchArticleStyle.searchView}>
          <Icon
            name="search"
            size={20}
            color={AppColor.grey}
            style={{marginHorizontal: 10}}
          />
          <TextInput
            placeholder={'Search '}
            style={SearchArticleStyle.searchInput}
            value={this.state.searchValue}
            onChangeText={(text) => {
              this.setState({searchValue: text});
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.getArticleList()}
          disabled={this.state.searchValue.length > 0 ? false : true}
          style={
            this.state.searchValue.length > 0
              ? SearchArticleStyle.searchButton
              : SearchArticleStyle.searchButtonDisable
          }>
          <View>
            <Text style={SearchArticleStyle.searchArticleText}>GO</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  gotoArticleDetails = (articleInfo) => {
    this.props.navigation.navigate('ArticleDetails', {
        articleInfo
    });
  };

  renderArticleList = (item, index) => {
      let date = '';
      let articleDate = ''
      if (item.date && item.date.length > 0) {
        date = item.date;
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(date.length - 2);
        date = year + '-' + month + '-' + day;
        articleDate = moment(date).format('MMM DD, YYYY');
      }
    
    return (
      <TouchableOpacity onPress={() => this.gotoArticleDetails(item)} key={index}>
        <View style={SearchArticleStyle.articleView}>
          <View style={{width: '90%'}}>
            <Text
              style={{
                fontFamily: AppFonts.regular,
                fontSize: 20,
                color:AppColor.greyText
              }}>
              {item.title} ({item.place_of_publication}), {articleDate}
            </Text>
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={AppImage.rightArrow}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  onRefresh = () => {
    this.setState({isLoading: true, page: 1, newsList: []}, () => {
      this.getArticleList();
    });
  };

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      this.setState({isRefreshing: true});
      this.page = this.page + 1; // increase page by 1
      this.loadMoreArticleList(this.page); // method for API call
    }
  };

  loadMoreArticleList = (pageIndex) => {
    axios
      .get(APIStrings.newsListAPI, {
        params: {
          page: pageIndex,
        },
      })
      .then((response) => {
        let responseJson = response.data;
        this.setState({
          articleList: [...this.state.articleList, ...responseJson.items],
          isRefreshing: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.state({isRefreshing: false});
      });
  };

  renderFooter = () => {
    return (
      <View style={SearchArticleStyle.footer}>
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

  renderFlatlist = () => {
    return (
      <FlatList
        style={{marginHorizontal: 10, marginTop: 10}}
        data={this.state.articleList}
        extraData={this.state.articleList}
        initialNumToRender={20}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => this.renderArticleList(item, index)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.onRefresh()}
            colors={[AppColor.headerBg]}
          />
        }
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

  render() {
    return (
      <SafeAreaView style={AppStyles.rootViewContainer}>
        <HeaderComponent
          title="Search Articles"
          backEnabled={true}
          handleBackpress={() => this.handleBackButton()}
        />
        {this.renderSearchView()}

        <Loader loading={this.state.isLoading} />

        {this.renderFlatlist()}

        {/* {!this.state.isLoading || this.state.articleList.length > 0 ? (
            <View>
                {this.renderFlatlist()}
            </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={SearchArticleStyle.userInstruction}>
              {AppStrings.userInstruction}
            </Text>
          </View>
        )} */}
      </SafeAreaView>
    );
  }
}

export default SearchArticle;
