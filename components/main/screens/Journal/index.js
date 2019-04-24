import React from 'react';
import {
    LayoutAnimation,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createMaterialTopTabNavigator,
    NavigationScreenProp,
    NavigationState,
    SafeAreaView,
} from 'react-navigation';

// import DailyScreen from './tabs/Daily';
// import WeeklyScreen from './tabs/Weekly';
// import MonthlyScreen from './tabs/Monthly';

// import Header from './shared/Header'

// const SimpleTabs = createMaterialTopTabNavigator({
//     Daily: DailyScreen,
//     Weekly: WeeklyScreen,
//     Monthly: MonthlyScreen,
// });

class Journal extends React.Component {
    // static router = SimpleTabs.router;

    static navigationOptions = {
        header: null,
        title: 'Journal'
    }

    // componentDidMount() {
    //     const willFocusSubscription = this.props.navigation.addListener(
    //         'willFocus',
    //         payload => {
    //           console.log('Journal focused');
    //         }
    //     );

    // }     

    // componentWillUpdate() {
    //     LayoutAnimation.easeInEaseOut();
    // }
    // render() {
    //     const { navigation } = this.props;
    //     const { routes, index } = navigation.state;
    //     const activeRoute = routes[index];
    //     let bottom = null;
    //     if (activeRoute.routeName !== 'Home') {
    //     bottom = (
    //         <View style={{ height: 50, borderTopWidth: StyleSheet.hairlineWidth, alignSelf: "flex-end" }}>
    //         <Button
    //             title="Check out"
    //             onPress={() => {
    //             //
    //             }}
    //         />
    //         </View>
    //     );
    //     }
    // }

    // AddTodo = () => {
        
    // }

    // render() {
    //     return(
    //         <View style={styles.inputContainer}>
    //             <TextInput 
    //                 style={styles.input}
    //             />
                
    //             <Button title="Add" onPress={this.AddTodo}/>
    //         </View>
    //     )
    // }
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        borderWidth: 2,
        width: 100,
        height: 30
    }
})


export default Journal;