import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation'

import Day from './components/Daily/Daily'
import Week from './components/Weekly/Weekly'
import Month from './components/Monthly/Monthly'

import CustomTabBarComponent from './custom-tab-bar-component/CustomTabBarComponent.Container'

const JournalTopNavigator = createMaterialTopTabNavigator({
    Day: { screen: Day },
    Week: { screen: Week },
    Month: { screen: Month }
},
    {
        initialRouteName: "Day",
        tabBarComponent: CustomTabBarComponent,
    }
)

export default JournalTopNavigator;