import React from 'react'

import JournalTopNavigator from './screens/Journal/Journal'
import Progress from './screens/Progress/Progress'
import Reward from './screens/Reward/Reward'
import Settings from './screens/Settings/Settings'
import {createBottomTabNavigator} from 'react-navigation'

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { colors } from 'react-native-elements';

const MainNavigator = createBottomTabNavigator({
    Journal: JournalTopNavigator,
    Progress: { screen: Progress },
    Reward: { screen: Reward },
    Settings: { screen: Settings },
},
{
    initialRouteName: "Journal",
    defaultNavigationOptions: ({navigation}) => ({
        header: renderBottomTabNavigator(navigation)
    })
})


function renderBottomTabNavigator(props){
    return(
        <>
        <View style={{
            backgroundColor: 'red'
        }}>

        </View>
        </>
    )
}

export default MainNavigator