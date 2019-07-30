import React from 'react';
import MainNavigator from './components/main/Main' //Main screen
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Drawer from './components/drawer/Drawer'
import Header from './components/main/header/Header'

import * as FileSystem from 'expo-file-system';

let categories = {},
  filePath = FileSystem.documentDirectory + "categories.json"

export default class App extends React.Component {

  state = {
    store: undefined,
  }

  LoadCategoriesFromFile = (filePath) => {
    FileSystem.getInfoAsync(filePath)
    .then(data => {
      if (data.exists) {
        FileSystem.readAsStringAsync(filePath)
          .then(data => {
            categories = JSON.parse(data)
            
            this.setState({
              store: createStore(rootReducer, { categories })
            })
          })
      }
  
      else {
  
        FileSystem.writeAsStringAsync(
          filePath,
          JSON.stringify({
            "cate_0": {
              "name": "Inbox",
              "color": "red"
            }
          })
        )
          .then(() => {
            return FileSystem.readAsStringAsync(filePath)
  
  
          })
          .then(data => {
            initialState = JSON.parse(data)
  
            this.setState({
              store: createStore(rootReducer, { categories })
            })
          })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.LoadCategoriesFromFile(filePath)
  }

  render() {
    return (
      <>
        {
          this.state.store ?
            <Provider store={this.state.store}>
              <AppContainer />
            </Provider>

          :

          null
        }
      </>

    )
  }
}

const ContentNavigator = createStackNavigator(
  { //Stack navigator works as a history object in a web browser, which helps popping out in pushing in screen to proceed navigations
    Main: MainNavigator
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  }
)

const drawerNavigator = createDrawerNavigator({
  ContentNavigator: ContentNavigator
}, {
    drawerLockMode: 'locked-closed',
    contentComponent: Drawer
  })

const AppContainer = createAppContainer(drawerNavigator) //return a React component, which is to wrap the stack navigator 





