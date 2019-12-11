import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";

import Day from "./components/Daily/Daily.Container";
import Week from "./components/Weekly/Weekly";
import Month from "./components/Monthly/Monthly";

import CustomTabBarComponent from "./custom-tab-bar-component/CustomTabBarComponent.Container";

const JournalTopNavigator = createMaterialTopTabNavigator(
  {
    Day: { screen: Day, navigationOptions: { header: null } },
    Week: { screen: Week, navigationOptions: { header: null } },
    Month: { screen: Month, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "Day",
    tabBarComponent: CustomTabBarComponent
  }
);

export default JournalTopNavigator;
