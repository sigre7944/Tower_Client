import React from "react";

import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";

import Day from "./components/Daily/Daily.Container";
import Week from "./components/Weekly/Weekly";
import Month from "./components/Monthly/Monthly";

import CustomTabBarComponent from "./custom-tab-bar-component/CustomTabBarComponent.Container";
import JournalHeader from "./components/header/JournalHeader.Container";
const JournalTopNavigator = createMaterialTopTabNavigator(
  {
    Day: { screen: Day, navigationOptions: { header: null } },
    Week: { screen: Week, navigationOptions: { header: null } },
    Month: { screen: Month, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "Day",
    tabBarComponent: CustomTabBarComponent,
    lazy: false
  }
);

// export default JournalTopNavigator;

export default class Journal extends React.PureComponent {
  state = {
    index: 0 // 0: Day, 1: Week, 2: Month
  };

  _chooseTab = index => {
    this.setState({
      index
    });
  };

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomTabBarComponent _chooseTab={this._chooseTab} />
        {this.state.index === 0 ? (
          <Day navigation={this.props.navigation} />
        ) : (
          <>
            {this.state.index === 1 ? (
              <Week navigation={this.props.navigation} />
            ) : (
              <Month navigation={this.props.navigation} />
            )}
          </>
        )}
      </View>
    );
  }
}
