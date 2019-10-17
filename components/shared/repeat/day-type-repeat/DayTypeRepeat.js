import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    DatePickerIOS,
    Keyboard,
    Modal,
    Picker,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

import { styles } from './styles/styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)
const window_width = Dimensions.get("window").width

export default class DayTypeRepeat extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)

    state = {
        selected_repeat_type: "days",

        is_picker_opened: false
    }

    _changePickerValue = (itemValue, itemIndex) => {
        this.setState({
            selected_repeat_type: itemValue
        })
    }

    _openPicker = () => {
        this.setState({
            is_picker_opened: true
        })
    }

    _closePicker = () => {
        this.setState({
            is_picker_opened: false
        })
    }

    animateRepeat = () => {
        Animated.parallel([
            Animated.timing(
                this.repeat_opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.repeat_scale_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    componentDidMount() {
        this.animateRepeat()
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: 338,
                    height: 484,
                    transform: [{ scale: this.repeat_scale_value }],
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: this.repeat_opacity_value
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 30,
                        marginTop: 35,
                        alignItems: "center"
                    }}
                >
                    <FontAwesomeIcon
                        icon={faRedoAlt}
                        color="#2C2C2C"
                        size={14}
                    />

                    <Text
                        style={styles.title_text}
                    >
                        Repeat
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 59,
                    }}
                >
                    <Text
                        style={styles.every_option_text}
                    >
                        Every
                    </Text>

                    <TextInput
                        style={styles.every_option_input}
                        maxLength={2}
                        keyboardType="numbers-and-punctuation"
                    />

                    <TouchableOpacity
                        style={{
                            marginLeft: 20,
                            width: 84,
                            height: 28,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            backgroundColor: "#E6F3F3"
                        }}

                        onPress={this._openPicker}
                    >
                        <Text
                            style={styles.every_option_text}
                        >
                            {this.state.selected_repeat_type}
                        </Text>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={this.state.is_picker_opened}
                    >
                        <View
                            style={{
                                flex: 1,
                                position: "relative"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    width: window_width,
                                    backgroundColor: "#000000",
                                    opacity: 0.2,
                                }}

                                onPress={this._closePicker}
                            >
                            </TouchableOpacity>

                            <View
                                style={{
                                    position: "absolute",
                                    height: 200,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                }}
                            >

                                <Picker
                                    selectedValue={this.state.selected_repeat_type}
                                    onValueChange={this._changePickerValue}
                                    itemStyle={styles.picker_value_text}
                                >
                                    <Picker.Item
                                        label="days"
                                        value="days"
                                    />
                                    <Picker.Item
                                        label="weeks"
                                        value="weeks"
                                    />
                                    <Picker.Item
                                        label="months"
                                        value="months"
                                    />
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Animated.View>
        )
    }
}