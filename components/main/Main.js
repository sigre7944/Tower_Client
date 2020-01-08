import React from "react";

import Journal from "./screens/Journal/Journal";
import Progress from "./screens/Progress/Progress.Container";
import Reward from "./screens/Reward/Reward.Container";
import Settings from "./screens/Settings/Settings.Container";

import BottomTabNavigator from "./bottomTabNavigator/BottomTabNavigator.Container";

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import JournalHeader from "./screens/Journal/components/header/JournalHeader.Container";

const JournalStackNavigator = createStackNavigator(
  { Journal },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: <JournalHeader navigation={navigation} />
    })
  }
);
const ProgressStackNavigator = createStackNavigator({ Progress });
const RewardStackNavigator = createStackNavigator({ Reward });
const SettingsStackNavigator = createStackNavigator({ Settings });

const MainNavigator = createBottomTabNavigator(
  {
    JournalStackNavigator,
    ProgressStackNavigator,
    RewardStackNavigator,
    SettingsStackNavigator
  },
    {
      initialRouteName: "JournalStackNavigator",
      tabBarComponent: props => <BottomTabNavigator {...props} />,
      lazy: false
    }
);

MainNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = "unlocked";
  if (navigation.state.index > 0) {
    drawerLockMode = "locked-closed";
  }

  return {
    drawerLockMode
  };
};

export default MainNavigator;
