import React, { Component } from 'react'
import { Text,StyleSheet } from 'react-native'
import WebViewActivity from './Web.js'

export default class HomeCell extends Component {

  _onForward = (item) => {
    this.props.navigator.push({
        title: 'Scene',
        component: WebViewActivity,
        passProps: {"url": this.props.item.url}
    });
  }

  render() {
    return (
      <Text style={styles.item} onPress={this._onForward}>{this.props.item.desc}</Text>
    );
  }
}

const styles = StyleSheet.create({
    item: {
      height: 100,
      padding: 10,
      fontSize: 18
    },
  })