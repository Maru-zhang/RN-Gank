import React, { Component } from 'react';
import { ActivityIndicator, View, WebView } from 'react-native'

export default class WebViewActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    _onLoadFinish = () => {
        this.setState(previousState => {
            return { isLoading: false };
        });
    }

    render() {
        return (
            <WebView
            onLoadEnd={this._onLoadFinish}
            source={{uri: this.props.url}}/>
        );
    }
}