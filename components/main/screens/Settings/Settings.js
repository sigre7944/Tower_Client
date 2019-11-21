import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import SettingHeader from "./components/header/SettingHeader";

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}