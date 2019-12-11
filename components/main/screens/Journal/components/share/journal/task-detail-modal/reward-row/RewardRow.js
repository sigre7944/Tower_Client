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

import {
    reward_icon
} from "../../../../../../../../shared/icons";

const icon_size = 14
const icon_color = "#2C2C2C"
import { styles } from './styles/styles';

const window_width = Dimensions.get("window").width

export default class RewardRow extends React.PureComponent {
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
                    <View
                        style={{
                            width: icon_size,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {reward_icon(icon_size, icon_color)}
                    </View>
                </View>


                <View
                    style={{
                        marginLeft: 20,
                    }}
                >
                    <Text
                        style={styles.text}
                    >
                        {this.props.reward_text} pts
                    </Text>
                </View>
            </View>
        )
    }
}
