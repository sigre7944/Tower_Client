import React from 'react';
import {
    View,
    Text,
    Button,
    Switch
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    SafeAreaView,
} from 'react-navigation';

import Task from './../../components/Task'

export default class DailyScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Daily',
        tabBarIcon: ({
        tintColor,
        focused,
        horizontal,
        }) => (
        <Ionicons
            name={focused ? 'ios-home' : 'ios-home'}
            size={horizontal ? 20 : 26}
            style={{ color: tintColor }}
        />
        ),
    };

    state = {
        arrayOfIndexes : [2, 4, 6, 7],
        switchValue : true
    }

    onChangeSwitch = () => {
        this.setState(prevState => ({switchValue: !prevState.switchValue}))
    }

    render() {
        const { navigation } = this.props;
        return (
        <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
            <Text>Daily Tasks</Text>
            { this.state.arrayOfIndexes.map((key, index) => (
                <View key={index}>
                    <Task
                        index={key}
                        
                    />
                </View>   
            ))}
            <View>
                <Text>Complete</Text>
            </View>
            
        </SafeAreaView>
        );
    }
}