import React from "react";
import MainNavigator from "./components/main/Main"; //Main screen
import { Dimensions, Image } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import Drawer from "./components/drawer/Drawer.Container";

import PurchaseHistory from "./components/purchase-history-screen/PurchaseHistory.Container";
import EditMultipleTasks from "./components/edit-multiple-tasks-screen/EditMultipleTasks.Container";

import SignInSignUpOptions from "./components/sign-in-sign-up-screen/SignInSignUpOptions";
import SignInScreen from "./components/sign-in-screen/SignInScreen";
import SignUpScreen from "./components/sign-up-screen/SignUpScreen";
import SettingsAccountScreen from "./components/settings-account-screen/SettingsAccountScreen.Container";
import MainLoading from "./components/loading/MainLoading.Container";

import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/index";
import * as FileSystem from "expo-file-system";

import * as firebase from "firebase";
import "firebase/firestore";
import { FIREBASE_CONFIG } from "./config/index";

firebase.initializeApp(FIREBASE_CONFIG);

export default class App extends React.Component {
  initialState = {};

  currentDate = new Date();

  state = {
    is_ready: false
  };

  reset = async () => {
    try {
      let read_res = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );

      console.log(read_res);
      let delete_res = await FileSystem.deleteAsync(
        FileSystem.documentDirectory + "reduxPersist"
      );

      console.log("delete");
    } catch (err) {
      console.log(err);
    }
  };

  _setReady = () => {
    this.setState({
      is_ready: true
    });
  };

  componentDidMount() {
    // this.reset();
  }

  render() {
    return (
      <>
        <Provider store={store}>
          {this.state.is_ready ? (
            <AppContainer />
          ) : (
            // <PersistGate persistor={persistor}>
            //   <AppContainer />
            // </PersistGate>
            <MainLoading _setReady={this._setReady} />
          )}
        </Provider>
      </>
    );
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    MainNavigator: MainNavigator
  },
  {
    drawerLockMode: "locked-closed",
    contentComponent: Drawer,
    drawerType: "slide",
    drawerWidth: Dimensions.get("window").width * 0.8,
    overlayColor: "gray"
  }
);

const AppStackNavigator = createStackNavigator(
  {
    DrawerNavigator: {
      screen: DrawerNavigator,
      navigationOptions: { header: null }
    },
    PurchaseHistory: { screen: PurchaseHistory },
    EditMultipleTasks: { screen: EditMultipleTasks },
    SignInSignUp: { screen: SignInSignUpOptions },
    SignInScreen: { screen: SignInScreen },
    SignUpScreen: { screen: SignUpScreen },
    SettingsAccountScreen: { screen: SettingsAccountScreen }
  },
  {
    initialRouteName: "DrawerNavigator",
    headerMode: "screen"
  }
);

const AppContainer = createAppContainer(AppStackNavigator); //return a React component, which is to wrap the stack navigator
