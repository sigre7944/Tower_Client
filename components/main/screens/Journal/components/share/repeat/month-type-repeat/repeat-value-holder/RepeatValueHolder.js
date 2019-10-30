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

    _setRef = (r) => {
        this._text_input_ref = r
    }

    _chooseInput = () => {
        if (this._text_input_ref) {
            this._text_input_ref.focus()
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

                <TouchableOpacity
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 59,
                    }}

                    onPress={this._chooseInput}

                >
                    <View
                        style={{
                            flexDirection: "row",
                        }}
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
                    </View>


                    <View
                        style={picker_button_style}
                    >
                        <Text
                            style={picker_text_style}
                        >
                            month
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}