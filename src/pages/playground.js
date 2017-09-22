import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class PlaygroundView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.a1}>dsadsadsadsa</Text>
                <View style={styles.a2}></View>
                <View style={styles.a3}></View>
                <View style={styles.a1}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    a1: {
        width: 50, height: 50,
        flex: 1,
        backgroundColor: 'red'
    },
    a2: {
        width: 50, height: 50,
        flex: 1,
        backgroundColor: 'green'
    },
    a3: {
        width: 50, height: 50,
        flex: 1,
        backgroundColor: 'yellow'
    }
})