import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Modal,
    Picker,
    Dimensions,
    Easing,
} from 'react-native';

import { styles } from './styles/styles'

import {
    repeat_icon
} from "../../../../../../../../shared/icons";

const icon_color = "#2C2C2C"
const icon_size = 14

const window_width = Dimensions.get("window").width

export default class RepeatValueHolder extends React.PureComponent {

    state = {
        current_chosen_repeat_type: "weeks",

        is_picker_opened: false,
    }

    _changePickerValue = (itemValue, itemIndex) => {
        this.setState({
            current_chosen_repeat_type: itemValue
        })
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
            current_chosen_repeat_type: this.props.selected_repeat_type
        })
    }

    _chooseDonePicker = (repeat_type) => {
        this.props._setRepeatType(repeat_type)
        this._closePicker()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selected_repeat_type !== prevProps.selected_repeat_type) {
            this.setState({
                current_chosen_repeat_type: this.props.selected_repeat_type
            })
        }
    }

    render() {
        let every_text_style = styles.every_option_text,
            every_input_style = styles.every_option_input,
            picker_button_style = styles.picker_button_container,
            picker_text_style = styles.every_option_text

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
                    <View
                        style={{
                            width: icon_size,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {repeat_icon(icon_size, icon_color)}
                    </View>
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
                            style={every_text_style}
                        >
                            Every
                        </Text>

                        <TextInput
                            style={every_input_style}
                            maxLength={2}
                            keyboardType="number-pad"
                            value={this.props.repeat_input_value}
                            onChange={this.props._onChangeRepeatInput}
                            ref={this._setRef}
                            autoCorrect={false}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={picker_button_style}

                        onPress={this._openPicker}
                    >
                        <Text
                            style={picker_text_style}
                        >
                            {this.props.selected_repeat_type}
                        </Text>
                    </TouchableOpacity>

                    <RepeatTypePicker
                        _closePicker={this._closePicker}
                        _chooseDonePicker={this._chooseDonePicker}
                        is_picker_opened={this.state.is_picker_opened}

                        current_chosen_repeat_type={this.state.current_chosen_repeat_type}
                        _changePickerValue={this._changePickerValue}
                    />
                </View>
            </View>
        )
    }
}

class RepeatTypePicker extends React.PureComponent {

    _chooseDonePicker = () => {
        this.props._chooseDonePicker(this.props.current_chosen_repeat_type)
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
                    <TouchableWithoutFeedback
                        onPress={this.props._closePicker}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: window_width,
                                backgroundColor: "#000000",
                                opacity: 0.2,
                            }}
                        />
                    </TouchableWithoutFeedback>

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
                            selectedValue={this.props.current_chosen_repeat_type}
                            onValueChange={this.props._changePickerValue}
                            itemStyle={styles.picker_value_text}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                zIndex: 10,
                                marginTop: 50,
                            }}
                        >
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