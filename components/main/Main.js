import Journal from './screens/Journal/'
import Progress from './screens/Progress'
import Reward from './screens/Reward'
import Settings from './screens/Settings'

import {createBottomTabNavigator} from 'react-navigation'

const MainNavigator = createBottomTabNavigator({
    Journal: { screen: Journal },
    Progress: { screen: Progress },
    Reward: { screen: Reward },
    Settings: { screen: Settings },
},
{
    initialRouteName: "Journal"
})

export default MainNavigator