import React from "react";
import { Text, View } from "react-native";

import { end_icon } from "../../../../../../../../shared/icons";
import { normalize } from "../../../../../../../../shared/helpers";

const icon_size = normalize(14, "width");
const icon_color = "#2C2C2C";

import { styles } from "./styles/styles";

export default class EndRow extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: normalize(25, "height"),
          marginHorizontal: normalize(20, "width"),
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: normalize(28, "width"),
            height: normalize(28, "width"),
            justifyContent: "center",
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
            {end_icon(icon_size, icon_color)}
          </View>
        </View>

        <View
          style={{
            marginLeft: normalize(20, "width")
          }}
        >
          <Text style={styles.text}>{this.props.end_text}</Text>
        </View>
      </View>
    );
  }
}
