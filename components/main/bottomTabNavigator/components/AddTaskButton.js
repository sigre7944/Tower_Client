import React from "react";

import { Text, TouchableOpacity } from "react-native";

import { primary_colors } from "../../../shared/styles/style";

import { plus_icon } from "../../../shared/icons";

const icon_size = 18;
const icon_color = "white";

export default class AddTaskButton extends React.PureComponent {
  _onPress = () => {
    this.props.toggleAddTask();
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={{
          height: 56,
          width: 56,
          borderRadius: 56,
          backgroundColor: primary_colors.prim_1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: -35,
          zIndex: 10
        }}
      >
        {plus_icon(icon_size, icon_color)}
      </TouchableOpacity>
    );
  }
}
