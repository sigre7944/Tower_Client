import React from "react";
import { Image } from "react-native";

import MainNavigator from "./components/main/Main"; //Main screen
import { Dimensions, Animated, Easing } from "react-native";
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

import MainLoading from "./components/loading/MainLoading";

import * as Font from "expo-font";
import { AppLoading } from "expo";
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

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("./assets/pngs/logo.png"),
      require("./assets/pngs/no_main_reward_1x.png"),
      require("./assets/pngs/premium_1x.png"),
      require("./assets/pngs/have_no_reward_1x.png")
    ]);

    const fontAssets = Font.loadAsync({
      "sf-ui-display-light": require("./assets/fonts/sf-ui-display/sf-ui-display-light.otf"),
      "sf-ui-display-medium": require("./assets/fonts/sf-ui-display/sf-ui-display-medium.otf")
    });

    await Promise.all([...imageAssets, fontAssets]);
  };

  _setReady = () => {
    this.setState({
      is_ready: true
    });
  };

  _loadError = () => {};

  componentDidMount() {
    // this.reset()
  }

  render() {
    return (
      <>
        {this.state.is_ready ? (
          <Provider store={store}>
            {/* <PersistGate loading={loading_screen} persistor={persistor}> */}
              <AppContainer />
            {/* </PersistGate> */}
          </Provider>
        ) : (
          <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={this._setReady}
            onError={console.warn}
          />
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
    SignUpScreen: { screen: SignUpScreen }
  },
  {
    initialRouteName: "DrawerNavigator",
    headerMode: "screen"
  }
);

const AppContainer = createAppContainer(AppStackNavigator); //return a React component, which is to wrap the stack navigator
