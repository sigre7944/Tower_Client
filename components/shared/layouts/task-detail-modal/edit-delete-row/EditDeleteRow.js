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
    faEdit,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { Map, List } from 'immutable'
import { styles } from './styles/styles';

const window_width = Dimensions.get("window").width

export default class EditDeleteRow extends Component {

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 25,
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <FontAwesomeIcon
                        icon={faEdit}
                        size={18}
                        color="#2C2C2C"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 28,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size={18}
                        color="#2C2C2C"
                    />
                </TouchableOpacity>
            </View>
        )
    }
}
