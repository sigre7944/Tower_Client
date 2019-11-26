import React from 'react';
import MainNavigator from './components/main/Main' //Main screen
import { Dimensions, Animated, Easing } from 'react-native'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import Drawer from './components/drawer/Drawer.Container'

import PurchaseHistory from './components/purchase-history-screen/PurchaseHistory.Container'
import EditMultipleTasks from "./components/edit-multiple-tasks-screen/EditMultipleTasks.Container";
import * as Font from 'expo-font'

import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/index";
import * as FileSystem from "expo-file-system";
import { CacheDir, DocumentDir } from "redux-persist-expo-fs-storage";
import { cacheDirectory } from 'expo-file-system';

export default class App extends React.Component {

  initialState = {}

  currentDate = new Date()

  state = {
    finished_loading_fonts: false
  }

  loadFonts = async () => {
    let finished_loading = await Font.loadAsync({
      'sf-ui-display-light': require('./assets/fonts/sf-ui-display/sf-ui-display-light.otf'),
      'sf-ui-display-medium': require('./assets/fonts/sf-ui-display/sf-ui-display-medium.otf')
    })

    this.setState({
      finished_loading_fonts: true
    })
  }

  reset = () => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((string) => { console.log(string) })
    FileSystem.deleteAsync(FileSystem.documentDirectory + 'reduxPersist').then(() => { console.log("reset!") })
  }

  componentDidMount() {
    this.reset()
    this.loadFonts()
  }

  render() {
    return (
      <>
        {
          this.state.finished_loading_fonts ?
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppContainer />
              </PersistGate>
            </Provider>
            :
            null
        }
      </>

    )
  }
}

const DrawerNavigator = createDrawerNavigator({
  MainNavigator: MainNavigator,
}, {
  drawerLockMode: 'locked-closed',
  contentComponent: Drawer,
  drawerType: 'slide',
  drawerWidth: Dimensions.get("window").width * 0.80,
  overlayColor: "gray"
})

const AppStackNavigator = createStackNavigator({
  DrawerNavigator: { screen: DrawerNavigator, navigationOptions: { header: null } },
  PurchaseHistory: { screen: PurchaseHistory },
  EditMultipleTasks: { screen: EditMultipleTasks }
}, {
  initialRouteName: "DrawerNavigator",
  headerMode: "screen",
})

const AppContainer = createAppContainer(AppStackNavigator) //return a React component, which is to wrap the stack navigator 





