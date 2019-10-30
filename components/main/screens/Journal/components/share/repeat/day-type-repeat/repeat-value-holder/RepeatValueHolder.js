import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    Picker,
    Dimensions,
    Easing,
} from 'react-native';

import { styles } from './styles/styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faRedoAlt,
} from '@fortawesome/free-solid-svg-icons'

const window_width = Dimensions.get("window").width

export default class RepeatValueHolder extends React.PureComponent {

    state = {
        current_chosen_repeat_type: "days",

        is_picker_opened: false,
    }


    _setRef = (r) => {
        this._text_input_ref = r
    }

    _chooseInput = () => {
        if (this._text_input_ref) {
            this._text_input_ref.focus()
        }
    }

    _openPicker = () => {
        this.setState({
            is_picker_opened: true
        })
    }

    _closePicker = () => {
        this.setState({
            is_picker_opened: false,
        })
    }

    _chooseDonePicker = (repeat_type) => {
        this.props._setRepeatType(repeat_type)
        this._closePicker()
    }

    render() {
        return (
            <View>
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
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                        }}

                        onPress={this._chooseInput}
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
                            value={this.props.repeat_input_value}
                            onChange={this.props._onChangeRepeatInput}
                            ref={this._setRef}
                            autoCorrect={false}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.picker_button_container}

                        onPress={this._openPicker}
                    >
                        <Text
                            style={styles.every_option_text}
                        >
                            {this.props.selected_repeat_type}
                        </Text>
                    </TouchableOpacity>

                    <RepeatTypePicker
                        _closePicker={this._closePicker}
                        _chooseDonePicker={this._chooseDonePicker}
                        selected_repeat_type={this.props.selected_repeat_type}
                        is_picker_opened={this.state.is_picker_opened}
                    />
                </View>
            </View>
        )
    }
}

class RepeatTypePicker extends React.PureComponent {

    state = {
        current_chosen_repeat_type: "days"
    }

    _changePickerValue = (itemValue, itemIndex) => {
        this.setState(prevState => ({
            current_chosen_repeat_type: itemValue
        }))
    }

    _chooseDonePicker = () => {
        this.props._chooseDonePicker(this.state.current_chosen_repeat_type)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selected_repeat_type !== prevProps.selected_repeat_type) {
            this.setState({
                current_chosen_repeat_type: this.props.selected_repeat_type
            })
        }
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.is_picker_opened}
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

                        onPress={this.props._closePicker}
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
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                top: 20,
                                left: 0,
                                right: 0,
                                position: "absolute",
                                zIndex: 15,
                                height: 30,
                                paddingHorizontal: 30,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}

                                onPress={this.props._closePicker}
                            >
                                <Text
                                    style={styles.picker_cancel_option_text}
                                >
                                    Cancel
                                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}

                                onPress={this._chooseDonePicker}
                            >
                                <Text
                                    style={styles.picker_done_option_text}
                                >
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Picker
                            selectedValue={this.state.current_chosen_repeat_type}
                            onValueChange={this._changePickerValue}
                            itemStyle={styles.picker_value_text}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                zIndex: 10,
                                marginTop: 50,
                            }}
                        >
                            <Picker.Item
                                label="day"
                                value="day"
                            />
                            <Picker.Item
                                label="week"
                                value="week"
                            />
                            <Picker.Item
                                label="month"
                                value="month"
                            />
                        </Picker>
                    </View>
                </View>
            </Modal>
        )
    }
}