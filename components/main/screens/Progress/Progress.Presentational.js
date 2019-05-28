import React from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Button
} from 'react-native';

export default class Progress extends React.Component {
    componentDidMount(){
      const didFocusScreen = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.props.changeRouteAction(payload.state.routeName)
        }
      )
    }

    render() {
      return (
        <>
        </>
      );
    }
}
