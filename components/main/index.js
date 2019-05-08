import JournalTopNavigator from './screens/Journal'
import Progress from './screens/Progress/Progress'
import Reward from './screens/Reward/Reward'
import Settings from './screens/Settings/Settings'
import {createBottomTabNavigator} from 'react-navigation'

const MainNavigator = createBottomTabNavigator({
    Journal: JournalTopNavigator,
    Progress: { screen: Progress },
    Reward: { screen: Reward },
    Settings: { screen: Settings },
},
{
    initialRouteName: "Journal",
})


export default MainNavigator