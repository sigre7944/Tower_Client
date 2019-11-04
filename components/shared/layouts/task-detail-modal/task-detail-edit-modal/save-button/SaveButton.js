import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    Modal,
    ScrollView
} from 'react-native'

import { styles } from './styles/styles'

export default class SaveButton extends Component {

    render(){
        return(
            <TouchableOpacity
                style={styles.container}
            >
                <Text
                    style={styles.text}
                >
                    SAVE
                </Text>
            </TouchableOpacity>
        )
    }
}