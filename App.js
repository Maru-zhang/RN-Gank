import React, { Component } from 'react';
import { ActivityIndicator, NavigatorIOS, FlatList, Text, View, StyleSheet, Alert } from 'react-native';
import WebViewActivity from './Web.js'

export default class NavigatorIOSApp extends Component {
  render() {
    return <NavigatorIOS
      initialRoute = {{
        component: HomeActivity,
        title: "RN-Gank",
      }}
      style={{flex: 1}}/>
  }
}

class HomeActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    return fetch('http://gank.io/api/data/all/20/0')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results
        }, function() {

        });
      })
      .catch((error) => {
        console.log(error)
      });
  }
  _onForward = (item) => {
    this.props.navigator.push({
      title: 'Scene ',
      component: WebViewActivity,
      passProps: {"url": item.url}
    });
  }
  render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 100}}>
            <ActivityIndicator />
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Text onPress={this._onForward} style={styles.item}>{item.desc}</Text>}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 64
  },
  item: {
    height: 100,
    padding: 10,
    fontSize: 18
  },
})