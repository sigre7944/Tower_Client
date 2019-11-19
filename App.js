import React from 'react';
import MainNavigator from './components/main/Main' //Main screen
import { Dimensions, Animated, Easing } from 'react-native'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { batchDispatchMiddleware } from 'redux-batched-actions'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Drawer from './components/drawer/Drawer.Container'
import * as FileSystem from 'expo-file-system';

import PurchaseHistory from './components/purchase-history-screen/PurchaseHistory.Container'
import * as Font from 'expo-font'

let categories = {},
  currentTask = {},
  cate_filePath = FileSystem.documentDirectory + "categories.json",
  currentTask_filePath = FileSystem.documentDirectory + "currentTask.json"

export default class App extends React.Component {

  initialState = {}

  currentDate = new Date()

  state = {
    store: undefined,
    finished_loading_fonts: false
  }

  loadCategoriesFromFile = async (filePath) => {

    let info = await FileSystem.getInfoAsync(filePath)

    if (info.exists) {
      let readData = await FileSystem.readAsStringAsync(filePath)

      categories = JSON.parse(readData)

      this.initialState = { ... this.initialState, ... { categories } }

    }

    else {
      let writtenData = await FileSystem.writeAsStringAsync(
        filePath,
        JSON.stringify({
          cate_0: {
            name: "Inbox",
            color: "red"
          }
        })
      )

      let readData = await FileSystem.readAsStringAsync(filePath)

      categories = JSON.parse(readData)

      this.initialState = { ... this.initialState, ... { categories } }

    }
  }

  loadCurrentTaskFromFile = async (filePath) => {
    let info = await FileSystem.getInfoAsync(filePath)

    if (info.exists) {
      let readData = await FileSystem.readAsStringAsync(filePath)

      currentTask = JSON.parse(readData)

      this.initialState = { ... this.initialState, ... { currentTask } }
    }

    else {
      let writtenData = await FileSystem.writeAsStringAsync(
        filePath,
        JSON.stringify({
          title: "",
          description: "",
          type: "day",
          category: "cate_0",
          schedule: {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
            day: this.currentDate.getDate()
          },
          repeat: {
            type: "daily",
            interval: {
              value: 86400 * 1000
            }
          },
          end: {
            type: "never"
          },
          priority: {
            value: "pri_01",
            reward: 0
          },
          goal: {
            max: 1,
            current: 0
          }
        })
      )

      let readData = await FileSystem.readAsStringAsync(filePath)

      currentTask = JSON.parse(readData)

      this.initialState = { ... this.initialState, ... { currentTask } }
    }
  }

  InitializeLoading = async () => {
    let results = await Promise.all([
      this.loadCategoriesFromFile(cate_filePath),
      this.loadCurrentTaskFromFile(currentTask_filePath)
    ])

    this.setState({
      store: createStore(rootReducer)
    })
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

  componentDidMount() {
    // this.InitializeLoading().catch(err => console.log(err))

    this.loadFonts()

    this.setState({
      store: createStore(rootReducer, applyMiddleware(batchDispatchMiddleware, thunk))
    })
  }

  render() {
    return (
      <>
        {
          this.state.finished_loading_fonts ?
            <>
              {this.state.store ?
                <Provider store={this.state.store}>
                  <AppContainer />
                </Provider>

                :

                null
              }
            </>
            :
            null
        }
      </>

    )
  }
}

const ContentNavigator = createStackNavigator(
  { //Stack navigator works as a history object in a web browser, which helps popping out in pushing in screen to proceed navigations
    Main: { screen: MainNavigator, navigationOptions: {} },
  },
  {
    initialRouteName: "Main",
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 0,
    //     timing: Animated.timing,
    //     easing: Easing.step0
    //   }
    // }),
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    }),
  }
)

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
  PurchaseHistory: { screen: PurchaseHistory }
}, {
  initialRouteName: "DrawerNavigator",
})

const AppContainer = createAppContainer(AppStackNavigator) //return a React component, which is to wrap the stack navigator 





