// import React from 'react'

// import { Dimensions } from "react-native";
import {
  createMaterialTopTabNavigator,
  // createDrawerNavigator,
  // createStackNavigator
} from "react-navigation";

// import Drawer from "../../../drawer/Drawer.Container";
import Day from "./components/Daily/Daily.Container";
import Week from "./components/Weekly/Weekly";
import Month from "./components/Monthly/Monthly";
// import JournalHeader from "./components/header/JournalHeader.Container"

import CustomTabBarComponent from "./custom-tab-bar-component/CustomTabBarComponent.Container";

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

// const JournalStackNavigator = createStackNavigator(
//   { JournalTopNavigator },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       header: <JournalHeader navigation={navigation} />
//     })
//   }
// );

// const DrawerNavigator = createDrawerNavigator(
//   {
//     JournalStackNavigator: JournalStackNavigator
//   },
//   {
//     drawerLockMode: "unlocked",
//     contentComponent: Drawer,
//     drawerType: "slide",
//     drawerWidth: Dimensions.get("window").width * 0.8,
//     overlayColor: "gray",
//     minSwipeDistance: 1
//   }
// );

export default JournalTopNavigator;
