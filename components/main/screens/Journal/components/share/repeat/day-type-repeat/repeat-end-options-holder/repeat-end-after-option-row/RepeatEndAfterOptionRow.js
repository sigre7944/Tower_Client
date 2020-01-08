import React from "react";

import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../../../shared/helpers";
export default class RepeatEndAfterOptionRow extends React.Component {
  state = {
    is_text_input_readable: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.index === nextProps.current_index &&
        this.props.current_index !== nextProps.current_index) ||
      (this.props.index === nextProps.last_index &&
        this.props.last_index !== nextProps.last_index) ||
      this.props.after_occurrence_value !== nextProps.after_occurrence_value
    );
  }

  _chooseEndOption = () => {
    this.props.chooseEndOption(this.props.index);
    this._text_input_ref.focus();
  };

  _setTextInputRef = r => {
    this._text_input_ref = r;
  };

  _onFocus = () => {
    this.props.chooseEndOption(this.props.index);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.index === this.props.last_index &&
      this.props.last_index !== prevProps.last_index
    ) {
      this._text_input_ref.blur();
    }
  }

  render() {
    let text_style = styles.unchosen_every_option_text,
      button_container = styles.repeat_end_chosen_button_container_deactivated,
      activated = this.props.index === this.props.current_index,
      input_text_style = styles.unchosen_every_option_input;

    if (this.props.index === this.props.current_index) {
      text_style = styles.every_option_text;
      button_container = styles.repeat_end_chosen_button_container;
      input_text_style = styles.every_option_input;
    } else if (this.props.index === this.props.last_index) {
      text_style = styles.unchosen_every_option_text;
      button_container = styles.repeat_end_chosen_button_container_deactivated;
      input_text_style = styles.unchosen_every_option_input;
    }

    return (
      <TouchableOpacity
        style={{
          marginTop: normalize(25, "height"),
          marginLeft: normalize(59, "width"),
          marginRight: normalize(30, "width")
        }}
        onPress={this._chooseEndOption}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={text_style}>After</Text>

            <TextInput
              style={input_text_style}
              maxLength={2}
              keyboardType="number-pad"
              // placeholder="1"
              value={this.props.after_occurrence_value}
              onChange={this.props._onChangeAfterOccurrenceValue}
              ref={this._setTextInputRef}
              autoCorrect={false}
              onFocus={this._onFocus}
            />

            <View
              style={{
                marginLeft: normalize(20, "width")
              }}
            >
              <Text style={text_style}>occurrences</Text>
            </View>
          </View>

          <View style={button_container}>
            {activated ? (
              <View style={styles.repeat_end_chosen_button_activated}></View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
