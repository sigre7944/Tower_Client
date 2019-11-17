import {createMaterialTopTabNavigator} from 'react-navigation'

import Daily from './components/Daily/Daily'
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
    tabBarComponent: CustomTabBarComponent
})

export default JournalTopNavigator;