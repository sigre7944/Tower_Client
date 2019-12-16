import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/styles";
import { normalize } from "../../shared/helpers";

export default class PurchaseHistoryHeader extends React.PureComponent {
  _gobackToRewardTab = () => {
    this.props.navigation.navigate("Reward");
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
            onPress={this._gobackToRewardTab}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={normalize(20, "width")}
              color={"#BDBDBD"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this._toggleReturn}>
            <Text style={styles.middle_text_style}>Inventory</Text>
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
