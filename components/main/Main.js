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

const MainNavigator = createBottomTabNavigator({
    Journal: JournalTopNavigator,
    Progress: { screen: Progress },
    Reward: { screen: Reward },
    Settings: { screen: Settings },
},
{
    initialRouteName: "Journal",
    tabBarComponent: props => (
        <RenderBottomTabNavigator {...props} />
    )
})


class RenderBottomTabNavigator extends React.Component{

    componentDidMount(){
        console.log(this.props.navigation.state.routeName)
    }

    render(){
        return(
            <>
            <View style={{
                height: 60,
                display: "flex",
                alignItems: "center",
            }}>
                <TouchableHighlight
                        onPress = {() => console.log(true)}
                        style= {{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: -35,
                            zIndex: 10
                        }}
                    >
                        <Text style={{
                            color: 'white'
                        }}>add</Text>
                </TouchableHighlight>

                <View
                    style={{
                        display: "flex",
                        backgroundColor: 'gainsboro',
                        flexDirection: "row",
                        justifyContent: "space-around",
                        height: 60,
                    }}
                >
                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Journal'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Journal</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Progress'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Progress</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Reward'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Reward</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Settings'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Settings</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </>
        )
    }
}

export default MainNavigator