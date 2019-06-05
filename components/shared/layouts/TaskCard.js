import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CheckBox } from 'react-native-elements'

export default class TaskCard extends Component {
    state = {
        isOpened: false
    }

    handleListClick = () => {
        this.setState(prevState => ({isOpened: !prevState.isOpened}))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.checkBox}>
                    <CheckBox 
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.props.checked}
                    />
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>Task 1</Text>
                </View>
                <View style={styles.share}>
                    <FontAwesome5 name={'link'} style={styles.icon}/>
                </View>
                <View style={styles.colorBox}>
                    <FontAwesome5 name={'dot-circle'} style={styles.icon}/>
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flexDirection: 'row',
        height: 60
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1,
    },
    share: {
        width: 50,
        height: 60
    },
    colorBox: {
        width: 50,
        height: 60
    },
    descriptionText:{

    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
    }
});