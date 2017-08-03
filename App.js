import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

export default class HomeActivity extends Component {
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
          renderItem={({item}) => <Text style={styles.item}>{item.desc}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18
  },
})