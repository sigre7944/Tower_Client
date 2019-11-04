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
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { Map, List } from 'immutable'
import { styles } from './styles/styles';

const window_width = Dimensions.get("window").width

export default class PriorityRow extends Component {
    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 25,
                    marginHorizontal: 20,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: 28,
                        height: 28,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        size={14}
                        color={this.props.priority_color}
                    />
                </View>


                <View
                    style={{
                        marginLeft: 20,
                    }}
                >
                    <Text
                        style={{ ...styles.text, ...{ color: this.props.priority_color } }}
                    >
                        {this.props.priority_name}
                    </Text>
                </View>
            </View>
        )
    }
}
