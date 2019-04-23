import React from 'react';
import Login from './components/login/Login' //Login screen
import SignUp from './components/signup/SignUp' //Sign Up screen
import MainNavigator from './components/main/Main' //Main screen
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// const store = createStore()


export default class App extends React.Component {
  render() {
    return (
      // <Provider>
        <AppContainer />
      // </Provider>
    )
  }
}

const AppNavigator = createStackNavigator(
  { //Stack navigator works as a history object in a web browser, which helps popping out in pushing in screen to proceed navigations
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    Main: MainNavigator
  }, 
  {
    initialRouteName: "Main"
  }
)

const AppContainer =  createAppContainer(AppNavigator) //return a React component, which is to wrap the stack navigator