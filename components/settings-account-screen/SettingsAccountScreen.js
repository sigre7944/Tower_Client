import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker
} from "react-native";

import Header from "./header/Header";

export default class SettingsAccountScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    header: <Header navigation={navigation} />,
    swipeable: false
  });

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      ></View>
    );
  }
}
