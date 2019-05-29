import React from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    Keyboard,
} from 'react-native';

import AddTaskButton from './layouts/AddTaskButton'
import OverlayModal from './layouts/modal-component/OverlayModal'

export default class BottomTabNavigator extends React.Component{

    state = {
        addTaskClicked: false,
        renderAddTaskUI: null,
        keyboardHeight: 0,
        should_AddTaskButton_be_displayed: "flex"
    }

    //START of ./AddTaskButton.js
    addTaskButtonActionProp = () => {
        this.setState(prevState => ({
            addTaskClicked: !prevState.addTaskClicked,
        }))
    }
    //END of ./AddTaskButton.js

    chooseNewScreen = (routeName) => {
        this.props.navigation.navigate({routeName})
    }


    componentDidMount(){
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.routeName !== prevProps.routeName){
            if((this.props.routeName === "Daily" || this.props.routeName === "Weekly" || this.props.routeName === "Monthly"))
                this.setState({
                    should_AddTaskButton_be_displayed: "flex"
                })

            else{
                this.setState({
                    should_AddTaskButton_be_displayed: "none"
                })
            }
        }
    }

    render(){
        return(
            <>
            <View style={{
                height: 60,
                display: "flex",
                alignItems: "center",
            }}> 
                <OverlayModal 
                    chooseCalenderOption = {this.chooseCalenderOption}
                    addTaskClicked = {this.state.addTaskClicked}
                    addTaskButtonActionProp = {this.addTaskButtonActionProp}
                />

                <AddTaskButton 
                addTaskButtonActionProp = {this.addTaskButtonActionProp}
                should_AddTaskButton_be_displayed = {this.state.should_AddTaskButton_be_displayed}
                />

                    
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
                        onPress = {this.chooseNewScreen.bind(this, 'Journal')}
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
                        onPress = {this.chooseNewScreen.bind(this, 'Progress')}
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
                        onPress = {this.chooseNewScreen.bind(this, 'Reward')}
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
                        onPress = {this.chooseNewScreen.bind(this, 'Settings')}
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