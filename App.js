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
import MainLoading from "./components/loading/MainLoading";

import * as Font from "expo-font";
// import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/index";
import * as FileSystem from "expo-file-system";

import * as firebase from "firebase";
import "firebase/firestore";
import { FIREBASE_CONFIG } from "./config/index";

firebase.initializeApp(FIREBASE_CONFIG);

const logo = require("./assets/pngs/logo.png");
const loading_screen = <MainLoading logo={logo} />;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  initialState = {};

  currentDate = new Date();

  state = {
    is_ready: false
  };

  reset = () => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(string => {
      console.log(string);
    });
    FileSystem.deleteAsync(FileSystem.documentDirectory + "reduxPersist").then(
      () => {
        console.log("reset!");
      }
    );
  };

  _setReady = () => {
    this.setState({
      is_ready: true
    });
  };

  _loadError = () => {};

  componentDidMount() {
    // this.reset()
    this._setReady()
  }

  render() {
    return (
      <>
        {this.state.is_ready ? (
          <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <AppContainer />
            {/* </PersistGate> */}
          </Provider>
        ) : (
          // <AppLoading
          //   startAsync={this._loadAssetsAsync}
          //   onFinish={this._setReady}
          //   onError={console.warn}
          // />
          <></>
        )}
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
