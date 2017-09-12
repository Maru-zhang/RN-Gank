import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, NavigatorIOS, FlatList, Text, View, StyleSheet, Alert } from 'react-native';
import HomeCell from './HomeCell.js'

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
      isLoading: false,
      refreshing: false
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
      });
  }
  _onRefresh() {
    this.setState({refreshing: true});
    fetch('http://gank.io/api/data/all/20/0')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        refreshing: false,
        dataSource: responseJson.results
      }, function() {

      });
    });
  }
  render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <HomeCell navigator={this.props.navigator} item={item}  style={styles.item}></HomeCell>} 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0
  }
})