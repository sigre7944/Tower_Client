import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../shared/helpers";

export default class SettingHeader extends React.PureComponent {
  _openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: normalize(17, "height")
          }}
        >
          <View style={styles.end_icon_container}></View>

          <View>
            <Text style={styles.middle_text_style}>Settings</Text>
          </View>

          <View style={styles.end_icon_container}></View>
        </View>
      </SafeAreaView>
    );
  }
}
