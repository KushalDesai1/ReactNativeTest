import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import AppStyles from '../../utils/AppStyles';
import HeaderComponent from '../../components/Header/HeaderComponent';
import SearchArticleStyle from './SearchArticleStyle';
import moment from 'moment';
import axios from 'axios';
import PDFView from 'react-native-view-pdf';
import AppFonts from '../../utils/AppFonts';
import AppColor from '../../utils/AppColor';
// import Loader from '../../components/Loader/Loader';

class ArticleDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      articleDetails: props.route.params.articleInfo,
      pdfURL: '',
      isPDFFound: true,
    };
  }

  componentDidMount() {
    this.getArticleDetails();
  }

  getArticleDetails = async () => {
    axios
    .get(this.state.articleDetails.url)
    .then((response) => {
      let responseJson = response.data;
      this.setState({
        pdfURL: responseJson.pdf,
        isLoading: false,
      });
    })
    .catch((error) => {
      console.log(error);
      this.state({isLoading: false});
    });
  };

  handleBackButton = () => {
    this.props.navigation.goBack();
  };

  renderTitleText = (title) => {
    return (
      <View style={{width: '30%'}}>
        <Text style={SearchArticleStyle.newsInfoHeader}>{title}</Text>
      </View>
    );
  };

  renderArticleDetails = (detail) => {
    return (
      <View style={{width: '70%'}}>
        {detail ? (
          <Text style={SearchArticleStyle.newsInfoText}>{detail}</Text>
        ) : (
          <Text style={SearchArticleStyle.newsInfoText}>-</Text>
        )}
      </View>
    );
  };

  renderTitle = () => {
    let date = this.state.articleDetails.date;
    let articleDate = '';
    if (date && date.length > 0) {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(date.length - 2);
      date = year + '-' + month + '-' + day;
      articleDate = moment(date).format('MMM DD, YYYY');
    }
    return (
      <View style={{flexDirection: 'row'}}>
        {this.renderTitleText('Title')}
        <View style={{width: '70%'}}>
          <Text style={SearchArticleStyle.newsInfoText}>
            {this.state.articleDetails.title} (
            {this.state.articleDetails.place_of_publication}), {articleDate}
          </Text>
        </View>
      </View>
    );
  };

  renderPublicationPlace = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Place of publication')}
        {this.renderArticleDetails(
          this.state.articleDetails.place_of_publication,
        )}
      </View>
    );
  };

  renderPublisher = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Publisher')}
        {this.renderArticleDetails(this.state.articleDetails.publisher)}
      </View>
    );
  };

  renderPublicationDate = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Date of publication')}
        {this.renderArticleDetails(
          this.state.articleDetails.start_year +
            '-' +
            this.state.articleDetails.end_year,
        )}
      </View>
    );
  };

  renderPDF = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        {this.state.pdfURL && this.state.pdfURL.length > 0 ? (
          <PDFView
            fadeInDuration={250.0}
            style={{width: 300, height: 300}}
            resource={this.state.pdfURL}
            resourceType="url"
            onLoad={() => this.setState({isLoading: false, isPDFFound: true})}
            onError={(error) => this.setState({isPDFFound: false})}
          />
        ) : (
          <View style={{
            width: 300, 
            height: 300, 
            justifyContent: 'center', 
            alignItems: 'center'}}>
            <Text style={{
              fontFamily: AppFonts.bold,
              color: AppColor.greyText,
              fontSize: 20
            }}>Loading pdf...</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={AppStyles.rootViewContainer}>
        <HeaderComponent
          title="Articles Details"
          backEnabled
          handleBackpress={() => this.handleBackButton()}
        />
        {/* <Loader loading={this.state.isLoading} /> */}

        <ScrollView>
          <View
            style={{
              width: '90%',
              marginHorizontal: 10,
              marginTop: 20,
            }}>
            {this.renderPDF()}
            {this.renderTitle()}
            {this.renderPublicationPlace()}
            {this.renderPublisher()}
            {this.renderPublicationDate()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ArticleDetails;
