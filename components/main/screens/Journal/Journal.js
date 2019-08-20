import {createMaterialTopTabNavigator} from 'react-navigation'

import Daily from './layouts/Daily/Daily.Container'
import Weekly from './layouts/Weekly/Weekly'
import Monthly from './layouts/Monthly/Monthly'


const JournalTopNavigator = createMaterialTopTabNavigator({
    Day: {screen: Daily},
    Week: {screen: Weekly},
    Month: {screen: Monthly}
},
{
    initialRouteName: "Day",
    tabBarOptions: {
        upperCaseLabel: false,
        labelStyle: {
            color: 'black',
            fontSize: 18
        },
        style: {
            backgroundColor: 'white',
            shadowColor: 'transparent'
        },
        tabStyle: {
        },
        indicatorStyle: {
            top: 0,
            backgroundColor: 'black',
        }
    },
})

export default JournalTopNavigator;