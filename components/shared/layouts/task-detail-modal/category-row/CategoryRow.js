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
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import { Map, List } from 'immutable'
import { styles } from './styles/styles';

const window_width = Dimensions.get("window").width

export default class CategoryRow extends React.PureComponent {
    render() {
        let category_text_style = this.props.category_color === "white" 
        || this.props.category_color === "no color" ? styles.text : { ...styles.text, ...{ color: this.props.category_color } }
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
                    {this.props.category_color === "white" || this.props.category_color === "no color" ?
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                borderWidth: 1,
                                borderColor: "#2C2C2C",
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 15,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: 1,
                                    backgroundColor: "#2C2C2C",
                                    transform: [{ rotate: "45deg" }]
                                }}
                            >
                            </View>
                        </View>
                        :
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: this.props.category_color
                            }}
                        >

                        </View>
                    }
                </View>


                <View
                    style={{
                        marginLeft: 20,
                    }}
                >
                    <Text
                        style={category_text_style}
                    >
                        {this.props.category_name}
                    </Text>
                </View>
            </View>
        )
    }
}
