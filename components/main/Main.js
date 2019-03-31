import React from 'react';
import {
    LayoutAnimation,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createMaterialBottomTabNavigator,
    createBottomTabNavigator,
    NavigationScreenProp,
    NavigationState,
    SafeAreaView,
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
} from 'react-navigation';


import Journal from './screens/Journal';
import Progress from './screens/Progress';
import Reward from './screens/Reward';
import Settings from './screens/Settings';

import OverView from './drawers/OverView';

const TabNavigator = createBottomTabNavigator({
    Journal: { screen: Journal },
    Progress: { screen: Progress },
    Reward: { screen: Reward },
    Settings: { screen: Settings },
});


const DrawerNavigator = createDrawerNavigator({
    TabNavigator : { screen: TabNavigator}
});




class Main extends React.Component {

    componentDidMount() {
        const willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
              console.log('Main focused');
            }
        );

    }     

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }
    render() {
        /*
        const { navigation } = this.props;
        const { routes, index } = navigation.state;
        const activeRoute = routes[index];
        let bottom = null;
        if (activeRoute.routeName !== 'Home') {
        bottom = (
            <View style={{ height: 50, borderTopWidth: StyleSheet.hairlineWidth, alignSelf: "flex-end" }}>
            <Button
                title="Check out"
                onPress={() => {
                //
                }}
            />
            </View>
        );
        }
        return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="default" />
            <SafeAreaView
            style={{ flex: 1 }}
            forceInset={{ horizontal: 'always', top: 'always' }}
            >
            <SimpleTabs navigation={navigation} />
            </SafeAreaView>
            {bottom}
        </View>
        );
        }
        */
        return (
            <MainContainer />
        )
    }
}

const  MainContainer = createAppContainer(DrawerNavigator);

export default Main;