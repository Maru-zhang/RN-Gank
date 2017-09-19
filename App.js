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
      refreshing: false,
      pageIndex: 0,
      moreLoading: false
    }
  }
  componentDidMount() {
    this.setState({pageIndex: 0});
    return fetch('http://gank.io/api/data/all/20/0')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results
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

  _onLoadMore() {
    this.setState({
      moreLoading: true,
      pageIndex: this.state.pageIndex + 1
    });
    console.log('dsadsadsa');
    fetch('http://gank.io/api/data/all/20/'+this.state.pageIndex)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        moreLoading: false
      });
      this.setState({
        dataSource: this.state.dataSource.concat(responseJson.results)
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
      if (this.state.moreLoading) {
        return (
          <View style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => <HomeCell navigator={this.props.navigator} item={item}  style={styles.item}></HomeCell>} 
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}
              keyExtractor={(item, index) => index}
              onEndReached={this._onLoadMore.bind(this)}
            />
            <Text style={styles.footer}>正在努力为你加载...</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => <HomeCell navigator={this.props.navigator} item={item}  style={styles.item}></HomeCell>} 
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}
              keyExtractor={(item, index) => index}
              onEndReached={this._onLoadMore.bind(this)}
            />
          </View>
        );
      }

  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0
  },
  footer: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
})