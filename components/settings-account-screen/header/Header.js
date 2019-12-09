import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modalbox";
import { DrawerActions } from "react-navigation-drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/styles";

export default class Header extends React.PureComponent {
  _goBackToSettings = () => {
    this.props.navigation.navigate("Settings");
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
            onPress={this._goBackToSettings}
          >
            <FontAwesomeIcon icon={faChevronLeft} size={20} color={"#BDBDBD"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={this._toggleReturn}>
            <Text style={styles.middle_text_style}>Profile settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.end_icon_container}
            onPress={this._openPurchaseHistoryTab}
          ></TouchableOpacity>
        </View>
      </View>
    );
  }
}
