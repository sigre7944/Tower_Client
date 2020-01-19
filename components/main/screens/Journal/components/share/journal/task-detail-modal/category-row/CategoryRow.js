import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles/styles";

import { normalize } from "../../../../../../../../shared/helpers";

export default class CategoryRow extends React.PureComponent {
  render() {
    let category_text_style =
      this.props.category_color === "white" ||
      this.props.category_color === "no color"
        ? styles.text
        : { ...styles.text, ...{ color: this.props.category_color } };
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
          {this.props.category_color === "white" ||
          this.props.category_color === "no color" ? (
            <View
              style={{
                width: normalize(14, "width"),
                height: normalize(14, "width"),
                borderRadius: normalize(14, "width"),
                borderWidth: 1,
                borderColor: "#2C2C2C",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: normalize(15, "width")
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: 1,
                  backgroundColor: "#2C2C2C",
                  transform: [{ rotate: "45deg" }]
                }}
              ></View>
            </View>
          ) : (
            <View
              style={{
                width: normalize(14, "width"),
                height: normalize(14, "width"),
                borderRadius: normalize(14, "width"),
                backgroundColor: this.props.category_color
              }}
            ></View>
          )}
        </View>

        <View
          style={{
            marginLeft: normalize(20, "width")
          }}
        >
          <Text style={category_text_style}>{this.props.category_name}</Text>
        </View>
      </View>
    );
  }
}
