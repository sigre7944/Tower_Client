import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/login/Login' //Login screen
import SignUp from './components/signup/SignUp' //Sign Up screen
import MainNavigator from './components/main/Main' //Main screen
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
// import Journal from './components/main/screens/Journal'
// import Progress from './components/main/screens/Progress'
// import Reward from './components/main/screens/Reward'
// import Settings from './components/main/screens/Settings'



export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

const styles = StyleSheet.create({
  topSpaced: {
    marginTop: 20
  }
})

const AppNavigator = createStackNavigator({ //Stack navigator works as a history object in a web browser, which helps popping out in pushing in screen to proceed navigations
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  // Main: {
  //   screen: Main,
  //   navigationOptions: {
  //     title: 'Home',
  //     header: null //this will hide the header
  //   },
  // },
  Main: MainNavigator
}, {
  initialRouteName: "Main"
})


// class Test extends React.Component{
//   render(){
//     return(
//       <Text>Testing</Text>
//     )
//   }
// }

// const MainNavigator = createStackNavigator({
//   // Journal: { screen: Journal },
//   // Progress: { screen: Progress },
//   // Reward: { screen: Reward },
//   // Settings: { screen: Settings },
//   Test: {
//     screen: Test
//   }
// })

const AppContainer =  createAppContainer(AppNavigator) //return a React component, which is to wrap the stack navigator