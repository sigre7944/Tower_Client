import React from 'react';

import Journal from './screens/Journal'
import Progress from './screens/Progress'
import Reward from './screens/Reward'
import Settings from './screens/Settings'

import {createStackNavigator, createAppContainer} from 'react-navigation'

const MainNavigator = createStackNavigator({
    Journal: { screen: Journal },
    Progress: { screen: Progress },
    Reward: { screen: Reward },
    Settings: { screen: Settings },
},
{
    initialRouteName: "Progress"
})

class Main extends React.Component{

    render() {
        return(
            <Text>Main</Text>
        )
    }
}

export default MainNavigator