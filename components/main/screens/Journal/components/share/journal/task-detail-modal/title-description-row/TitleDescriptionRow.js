import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../../shared/helpers";
export default class TitleDescriptionRow extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: normalize(40, "height"),
          paddingHorizontal: normalize(20, "width")
        }}
      >
        <CompleteBox />

        <View
          style={{
            marginHorizontal: normalize(20, "width")
          }}
        >
          <Text style={styles.title}>{this.props.title}</Text>

          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </View>
    );
  }
}

class CompleteBox extends React.PureComponent {
  render() {
    return (
      <View style={styles.complete_box_container}>
        {this.props.checked_complete ? <View></View> : null}

        <View></View>
      </View>
    );
  }
}
