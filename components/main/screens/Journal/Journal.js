import {createMaterialTopTabNavigator} from 'react-navigation'

import Daily from './components/Daily/Daily.Container'
import Weekly from './components/Weekly/Weekly'
import Monthly from './components/Monthly/Monthly'

import CustomTabBarComponent from './custom-tab-bar-component/CustomTabBarComponent'

const JournalTopNavigator = createMaterialTopTabNavigator({
    Day: {screen: Daily},
    Week: {screen: Weekly},
    Month: {screen: Monthly}
},
{
    initialRouteName: "Day",
    // tabBarOptions: {
    //     upperCaseLabel: false,
    //     labelStyle: {
    //         color: 'black',
    //         fontSize: 18
    //     },
    //     style: {
    //         backgroundColor: 'white',
    //         shadowColor: 'transparent',
    //     },
    //     tabStyle: {
    //     },
    //     indicatorStyle: {
    //         top: 0,
    //         backgroundColor: '#54BAAC',
    //         height: 3,
    //         borderRadius: 30,
    //         alignContent: "center",
    //     },
        
    // },
    tabBarComponent: CustomTabBarComponent
})

export default JournalTopNavigator;