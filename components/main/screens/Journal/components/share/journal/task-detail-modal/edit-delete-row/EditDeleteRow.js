import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { normalize } from "../../../../../../../../shared/helpers";
export default class EditDeleteRow extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: normalize(25, "height"),
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.props._openEdit}
        >
          <FontAwesomeIcon
            icon={faEdit}
            size={normalize(18, "width")}
            color="#2C2C2C"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: normalize(28, "width")
          }}
          onPress={this.props._toggleDelete}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            size={normalize(18, "width")}
            color="#2C2C2C"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
