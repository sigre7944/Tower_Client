import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import SettingHeader from "./components/header/SettingHeader";

import { styles } from "./styles/styles";

export default class Settings extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return ({
      header: <SettingHeader navigation={navigation} />,
      swipeable: false
    })
  }

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.changeRouteAction(payload.state.routeName)
      }
    )
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white"
        }}
      >
        
      </View>
    );
  }
}