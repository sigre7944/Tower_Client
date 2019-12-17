import React from "react";

import { TouchableOpacity } from "react-native";
import { primary_colors } from "../../../shared/styles/style";

import { plus_icon } from "../../../shared/icons";

import { normalize } from "../../../shared/helpers";

const icon_size = normalize(18, "width");
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
          zIndex: 10,
          shadowOffset: {
            width: 0,
            height: 6
          },
          shadowRadius: 6,
          shadowColor: "black",
          shadowOpacity: 0.19,
          elevation: 8
        }}
      >
        {plus_icon(icon_size, icon_color)}
      </TouchableOpacity>
    );
  }
}
