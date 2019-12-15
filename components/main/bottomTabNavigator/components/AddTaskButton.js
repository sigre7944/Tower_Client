import React from "react";

import { TouchableOpacity } from "react-native";
import { primary_colors } from "../../../shared/styles/style";

import { plus_icon } from "../../../shared/icons";

import { normalize } from "../../../shared/helpers";

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
          height: normalize(56, "width"),
          width: normalize(56, "width"),
          borderRadius: normalize(56, "width"),
          backgroundColor: primary_colors.prim_1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: -35,
          zIndex: 10
        }}
      >
        {plus_icon(normalize(icon_size, "width"), icon_color)}
      </TouchableOpacity>
    );
  }
}
