import React from 'react';
import MainNavigator from './components/main/Main' //Main screen
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import Drawer from './components/drawer/Drawer'
import Header from './components/main/header/Header'

const store = createStore(rootReducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const ContentNavigator = createStackNavigator(
  { //Stack navigator works as a history object in a web browser, which helps popping out in pushing in screen to proceed navigations
    Main: MainNavigator
  }, 
  {
    initialRouteName: "Main",
    defaultNavigationOptions: ({navigation}) => ({
      header: <Header navigation = {navigation} />
    })
  }
)

const drawerNavigator = createDrawerNavigator({
  ContentNavigator: ContentNavigator
}, {
  drawerLockMode: 'locked-closed',
  contentComponent: Drawer
})

const AppContainer =  createAppContainer(drawerNavigator) //return a React component, which is to wrap the stack navigator 
