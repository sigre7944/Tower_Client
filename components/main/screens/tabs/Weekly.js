import React from 'react';
import {
    Text,
    Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    SafeAreaView,
} from 'react-navigation';

export default class WeeklyScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Weekly',
        tabBarIcon: ({
        tintColor,
        focused,
        horizontal,
        }) => (
        <Ionicons
            name={focused ? 'ios-people' : 'ios-people'}
            size={horizontal ? 20 : 26}
            style={{ color: tintColor }}
        />
        ),
    };
    render() {
        const { navigation } = this.props;
        return (
        <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
            <Text>Weekly Tasks</Text>
        </SafeAreaView>
        );
    }
}