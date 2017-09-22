import React, { Component } from 'react';
import { SegmentedControlIOS, ActivityIndicator, RefreshControl, NavigatorIOS, FlatList, Text, View, StyleSheet, Alert } from 'react-native';
import HomeCell from './src/pages/HomeCell.js'
import PlaygroundView from './src/pages/playground.js'

export default class NavigatorIOSApp extends Component {

  _onRightNavigationItemClick() {
    this.refs.nav.push({
      title: "Mr",
      component: PlaygroundView      
    }); 
  }

  render() {
    return <NavigatorIOS
      ref='nav'
      initialRoute = {{
        component: HomeActivity,
        title: "RN-Gank",
        rightButtonTitle: "test",
        onRightButtonPress: () => this._onRightNavigationItemClick(),
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
    this._onRefresh();
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
    fetch('http://gank.io/api/data/all/20/'+this.state.pageIndex)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        moreLoading: false
      });
      this.setState({
        moreLoading: false,
        dataSource: this.state.dataSource.concat(responseJson.results)
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
        <SegmentedControlIOS values={['One', 'Two', 'Three', 'Four', 'Five']} selectedIndex={0} />
        <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <HomeCell navigator={this.props.navigator} item={item}  style={styles.item}></HomeCell>} 
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}
            keyExtractor={(item, index) => index}
            onEndReached={this._onLoadMore.bind(this)}
          />
          {this.state.moreLoading && (<Text style={styles.footer}>正在努力为你加载...</Text>)}
        </View>
      );
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