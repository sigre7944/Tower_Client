import React from 'react';

import {
    View,
    ScrollView,
    StyleSheet,
    Keyboard,
    Animated,
    KeyboardAvoidingView,
    Dimensions,
    Modal
} from 'react-native';

export default class PurchaseHistory extends React.PureComponent {
    static navigationOptions = {
        // header: null,
    };

    componentDidMount() {
        const didFocusScreen = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.props.changeRouteAction(payload.state.routeName)
            }
        )

        // const willFocusScreen = this.props.navigation.addListener(
        //     'willFocus',
        //     payload => {
        //         this.props.changeRouteAction(payload.state.routeName)
        //     }
        // )
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >

            </View>
        )
    }
}