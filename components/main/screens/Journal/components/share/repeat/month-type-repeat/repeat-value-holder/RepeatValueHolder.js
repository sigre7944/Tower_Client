import React from "react";

import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { styles } from "./styles/styles";

import { repeat_icon } from "../../../../../../../../shared/icons";
import { normalize } from "../../../../../../../../shared/helpers";
const icon_color = "#2C2C2C";
const icon_size = normalize(14, "width");

export default class RepeatValueHolder extends React.PureComponent {
  _setRef = r => {
    this._text_input_ref = r;
  };

  _chooseInput = () => {
    if (this._text_input_ref) {
      this._text_input_ref.focus();
    }
  };

  render() {
    let every_text_style = styles.every_option_text,
      every_input_style = styles.every_option_input,
      picker_button_style = styles.picker_button_container,
      picker_text_style = styles.every_option_text;

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: normalize(30, "width"),
            marginTop: normalize(35, "height"),
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

          <Text style={styles.title_text}>Repeat</Text>
        </View>

        <TouchableOpacity
          style={{
            marginTop: normalize(25, "height"),
            flexDirection: "row",
            alignItems: "center",
            marginLeft: normalize(59, "width")
          }}
          onPress={this._chooseInput}
        >
          <View
            style={{
              flexDirection: "row"
            }}
          >
            <Text style={every_text_style}>Every</Text>

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

          <View style={picker_button_style}>
            <Text style={picker_text_style}>month</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
