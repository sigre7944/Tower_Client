import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

export default class MonthYearHolder extends React.PureComponent{
    render(){
        return(
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                }}
            >
                <Text>{this.props.monthAndYear}</Text>
            </View>
        )
    }
}