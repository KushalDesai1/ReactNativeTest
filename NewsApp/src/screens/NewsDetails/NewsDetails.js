import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import AppStyles from '../../utils/AppStyles';
import HeaderComponent from '../../components/Header/HeaderComponent';
import NewsDetailsStyle from './NewsDetailsStyle';

class NewsDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      newsDetailsInfo: props.route.params.newsDetail,
      newsDetailURL: props.route.params.newsDetail.url,
      newsDetailAPI: {},
      isFound: true,
    };
  }

  handleBackButton = () => this.props.navigation.goBack();

  renderTitleText = (title) => {
    return (
      <View style={{width: '30%'}}>
        <Text style={NewsDetailsStyle.newsInfoHeader}>{title}</Text>
      </View>
    );
  };

  renderNewsDetails = (detail) => {
    return (
      <View style={{width: '70%'}}> 
        {detail ? (
          <Text style={NewsDetailsStyle.newsInfoText}>{detail}</Text>
        ) : (
          <Text style={NewsDetailsStyle.newsInfoText}>-</Text>
        )}
      </View>
    );
  };

  renderTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {this.renderTitleText('Title')}
        <View style={{width: '70%'}}>
          <Text style={NewsDetailsStyle.newsInfoText}>
            {this.state.newsDetailsInfo.title}: (
            {this.state.newsDetailsInfo.place_of_publication})
            {this.state.newsDetailsInfo.start_year}-
            {this.state.newsDetailsInfo.end_year}
          </Text>
        </View>
      </View>
    );
  };

  renderPublicationPlace = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Place of publication')}
        {this.renderNewsDetails(
          this.state.newsDetailsInfo.place_of_publication,
        )}
      </View>
    );
  };

  renderGeographicPlace = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Geographic coverage')}
        <View style={{width: '70%'}}>
          {this.state.newsDetailsInfo.city.length > 0 ? (
            this.state.newsDetailsInfo.city.map((item, index) => {
              let countyName = this.state.newsDetailsInfo.county[index];
              let country = this.state.newsDetailsInfo.country;
              return (
                <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  key={index}>
                  <View
                    style={NewsDetailsStyle.newsBulletView}
                  />
                  <Text style={NewsDetailsStyle.newsInfoText}>
                    {item}
                    {countyName ? ', ' + countyName : null}, {country}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={NewsDetailsStyle.newsInfoText}>-</Text>
          )}
        </View>
      </View>
    );
  };

  renderPublisher = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Publisher')}
        {this.renderNewsDetails(this.state.newsDetailsInfo.publisher)}
      </View>
    );
  };

  renderPublicationDate = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Date of publication')}
        {this.renderNewsDetails(
          this.state.newsDetailsInfo.start_year +
            '-' +
            this.state.newsDetailsInfo.end_year,
        )}
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Description')}
        <View style={{width: '70%'}}>
          {this.state.newsDetailsInfo.note.length > 0 ? (
            this.state.newsDetailsInfo.note.map((item, index) => {
              return (
                <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  key={index}>
                  <View style={NewsDetailsStyle.newsBulletView} />
                  <Text style={NewsDetailsStyle.newsInfoText}>{item}</Text>
                </View>
              );
            })
          ) : (
            <Text style={NewsDetailsStyle.newsInfoText}>-</Text>
          )}
        </View>
      </View>
    );
  };

  renderFrequency = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Frequency')}
        {this.renderNewsDetails(this.state.newsDetailsInfo.frequency)}
      </View>
    );
  };

  renderLanguage = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Language')}
        <View style={{width: '70%'}}>
          {this.state.newsDetailsInfo.language.map((item, index) => {
            return (
              <View
                style={{flexDirection: 'row', alignItems: 'center'}}
                key={index}>
                <View
                  style={NewsDetailsStyle.newsBulletView}
                />
                <Text style={NewsDetailsStyle.newsInfoText}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  renderSubjects = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('Subjects')}
        <View style={{width: '70%'}}>
          {this.state.newsDetailsInfo.subject.length > 0 ? (
            this.state.newsDetailsInfo.subject.map((item, index) => {
              return (
                <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  key={index}>
                  <View
                    style={NewsDetailsStyle.newsBulletView}
                  />
                  <Text style={NewsDetailsStyle.newsInfoText}>{item}</Text>
                </View>
              );
            })
          ) : (
            <Text style={NewsDetailsStyle.newsInfoText}>-</Text>
          )}
        </View>
      </View>
    );
  };

  renderLCCNNumber = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('LCCN')}
        {this.renderNewsDetails(this.state.newsDetailsInfo.lccn)}
      </View>
    );
  };

  renderOCLCNumber = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        {this.renderTitleText('OCLC')}
        {this.renderNewsDetails(this.state.newsDetailsInfo.oclc)}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={AppStyles.rootViewContainer}>
        <HeaderComponent
          title="News Details"
          backEnabled={true}
          handleBackpress={() => this.handleBackButton()}
        />

        <ScrollView>
          {Object.keys(this.state.newsDetailsInfo).length > 0 ? (
            <View
              style={{
                width: '90%',
                marginHorizontal: 10,
                marginTop: 20,
              }}>
              {this.renderTitle()}
              {this.renderPublicationPlace()}
              {this.renderGeographicPlace()}
              {this.renderPublisher()}
              {this.renderPublicationDate()}
              {this.renderDescription()}
              {this.renderFrequency()}
              {this.renderLanguage()}
              {this.renderSubjects()}
              {this.renderLCCNNumber()}
              {this.renderOCLCNumber()}
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>News Details not found</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default NewsDetails;
