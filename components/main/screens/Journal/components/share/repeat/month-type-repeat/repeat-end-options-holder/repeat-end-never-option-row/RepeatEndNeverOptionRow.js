import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../../../shared/helpers";
export default class RepeatEndNeverOptionRow extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.index === nextProps.current_index &&
        this.props.current_index !== nextProps.current_index) ||
      (this.props.index === nextProps.last_index &&
        this.props.last_index !== nextProps.last_index)
    );
  }

  _chooseEndOption = () => {
    this.props.chooseEndOption(this.props.index);
  };

  render() {
    let text_style = styles.unchosen_every_option_text,
      button_container = styles.repeat_end_chosen_button_container_deactivated,
      activated = this.props.index === this.props.current_index;

    if (this.props.index === this.props.current_index) {
      text_style = styles.every_option_text;
      button_container = styles.repeat_end_chosen_button_container;
    } else if (this.props.index === this.props.last_index) {
      text_style = styles.unchosen_every_option_text;
      button_container = styles.repeat_end_chosen_button_container_deactivated;
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
          <Text style={text_style}>Never</Text>

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
