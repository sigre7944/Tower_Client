import React from 'react';
import {
    Text,
    Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    SafeAreaView,
} from 'react-navigation';


export default class MonthlyScreen extends React.Component {
    static navigationOptions = ({
        navigation,
    }) => ({
        tabBarLabel: 'Monthly',
        tabBarIcon: ({
        tintColor,
        focused,
        horizontal,
        }) => (
        <Ionicons
            name={focused ? 'ios-star' : 'ios-star'}
            size={horizontal ? 20 : 26}
            style={{ color: tintColor }}
        />
        ),
    });
    render() {
        const { navigation } = this.props;
        return (
        <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
            <Text>Monthly Tasks</Text>
            <Button
            onPress={() => navigation.navigate('Home')}
            title="Go to home tab"
            />
            <Button onPress={() => navigation.goBack(null)} title="Go back" />
        </SafeAreaView>
        );
    }
}

