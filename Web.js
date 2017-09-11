import React, { Component } from 'react';
import { WebView } from 'react-native'

export default class WebViewActivity extends Component {

    render() {
        return (
            <WebView
        source={{uri: this.props.url}}/>
        )
    }
}