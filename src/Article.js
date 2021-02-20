import React from 'react';
import { View, Linking, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Card, Divider, Avatar, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import {
  AdMobBanner,
  PublisherBanner,
 } from 'expo-ads-admob';


export default class Article extends React.Component {

  render() {
    
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
      const LeftContent = props => <Avatar.Icon {...props} icon="card-text" />
    return (

      <TouchableNativeFeedback
        useForeground
        onPress={() => Linking.openURL(url)}
      >
  <Card>
    <Card.Title title="Notícia" subtitle={time} left={LeftContent} />
    <Card.Content>
    <Title>{title}</Title>
    <Paragraph>{description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: urlToImage }} />
    <Card.Actions>
      <Button>Saiba mais...</Button>
    </Card.Actions>
  </Card>
      </TouchableNativeFeedback>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  }
};