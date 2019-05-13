import React from 'react'

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Keyboard,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

import AddTaskButton from './layouts/AddTaskButton'
import UnderlayModal from './layouts/modal-component/UnderlayModal'


export default class BottomTabNavigator extends React.Component{



    state = {
        addClicked: false,
        renderAddTaskUI: null,
        keyboardHeight: 0,
        addTaskDisplayProperty: 'none',
        calendarChosen: false
    }

    //START of ./AddTaskButton.js
    addTaskButtonActionProp = () => {
        this.setState(prevState => ({
            addClicked: !prevState.addClicked,
            calendarChosen: false
        }))
    }
    //END of ./AddTaskButton.js



    //START of /modal-component/UnderlayModal.js
    dismissAddTaskProcessWhenClickOnUnderlayModal = () => {
        Keyboard.dismiss
        this.setState(prevState => ({
            keyboardHeight: 0,
            addClicked: !prevState.addClicked
        }))
    }

    chooseCalenderOption = () => {
        this.setState(prevState=> ({
            calendarChosen: !prevState.calendarChosen,
            addTaskDisplayProperty: 'none'
        }))

        Keyboard.dismiss
    }
    //END of /modal-component/UnderlayModal.js


    componentDidMount(){
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            (e) => {
                this.setState({
                    keyboardHeight: e.endCoordinates.height,
                })
            }
        )

        
    }

    componentDidUpdate = (prepProps, prevState) => {
        if(this.state.addClicked && this.state.addClicked !== prevState.addClicked){
            this.setState({
                addTaskDisplayProperty: 'flex'
            })
        }
    }

    componentWillUnmount(){
        this.keyboardWillShowListener.remove();
    }

    render(){
        return(
            <>
            <View style={{
                height: 60,
                display: "flex",
                alignItems: "center",
            }}> 
                {this.state.addClicked ?
                    
                    <UnderlayModal 
                        dismissAddTaskProcessWhenClickOnUnderlayModal = {this.dismissAddTaskProcessWhenClickOnUnderlayModal}
                        addTaskDisplayProperty = {this.state.addTaskDisplayProperty}
                        keyboardHeight = {this.state.keyboardHeight}
                        chooseCalenderOption = {this.chooseCalenderOption}
                        calendarChosen = {this.state.calendarChosen}
                    />

                    : 

                    <></>
                }
                {this.props.routeName === "Daily" || this.props.routeName === "Weekly" || this.props.routeName === "Monthly" ?
                    
                    <AddTaskButton addTaskButtonActionProp = {this.addTaskButtonActionProp}/>

                    : 

                    <>
                    </>
                }
                

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