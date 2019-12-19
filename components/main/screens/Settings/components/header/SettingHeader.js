import React from "react";
import { View, Text } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { styles } from "./styles/styles";

export default class SettingHeader extends React.PureComponent {
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
          <View style={styles.end_icon_container}></View>

          <View>
            <Text style={styles.middle_text_style}>Settings</Text>
          </View>

          <View style={styles.end_icon_container}></View>
        </View>
      </View>
    );
  }
}
