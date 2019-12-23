import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DrawerActions } from "react-navigation-drawer";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../shared/helpers";

export default class RewardHeader extends React.PureComponent {
  _openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={styles.end_icon_container}
            onPress={this._openDrawer}
          >
            <FontAwesomeIcon
              icon={faBars}
              size={normalize(20, "width")}
              color={"#BDBDBD"}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.middle_text_style}>Progress</Text>
          </View>

          <View style={styles.end_icon_container}></View>
        </View>
      </View>
    );
  }
}