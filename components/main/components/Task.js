import React from 'react';
import {
    LayoutAnimation,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Task extends React.Component {
    render() {
        return (
            <View>
                <Text>Task {this.props.index}</Text>
                <Text>A</Text>
            </View>
        )
    }
}