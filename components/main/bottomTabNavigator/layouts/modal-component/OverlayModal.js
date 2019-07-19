import React, { Component } from 'react'

import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import AddTaskPanel from './add-task-panel/AddTaskPanel'
import Calendar from './calendar/Calendar'
import Repeat from './repeat/Repeat.Container'


class DismissElement extends Component {
    _onPress = () => {
        this.props.addTaskButtonActionProp()
        this.props.disableAllTabs()
    }

    render(){
        return(
            <TouchableWithoutFeedback
                onPress={this._onPress}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "black",
                    opacity: 0.5,
                }}>
                </View>
            </TouchableWithoutFeedback>
            )
    }
    
}

export default class UnderlayModal extends Component {

    state = {
        currentAnnotation: 'day',
        addTaskClicked: false,
        calendarChosen: false,
        repeatClicked: false,
    }

    

    setCurrentAnnotation = (annotation) => {
        this.setState({currentAnnotation: annotation})
    }

    chooseCalenderOption = () => {
        this.setState(prevState => ({
            calendarChosen: !prevState.calendarChosen
        }))
    }

    disableAllTabs = () => {
        this.setState({
            calendarChosen: false,
            repeatClicked: false,
        })
    }

    chooseRepeatOption = () => {
        this.setState(prevState => ({
            repeatClicked: !prevState.repeatClicked,
            calendarChosen: !prevState.calendarChosen
        }))
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.addTaskClicked !== nextProps.addTaskClicked || this.state.calendarChosen !== nextState.calendarChosen
    }

    componentWillMount(){

    }

    componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.calendarChosen !== prevState.calendarChosen){
        }
    }

    

    render(){
        return(
            <Modal
                visible={this.props.addTaskClicked}
                transparent={true}
            >   
                <DismissElement 
                addTaskButtonActionProp = {this.props.addTaskButtonActionProp} 
                disableAllTabs = {this.disableAllTabs}
                />
                
                <AddTaskPanel 
                    chooseCalenderOption = {this.chooseCalenderOption}
                    setCurrentAnnotation = {this.setCurrentAnnotation}
                    currentAnnotation = {this.state.currentAnnotation}
                />
                
                {/* Calendar View */}
                {this.state.calendarChosen ? 
                    <Calendar 
                        currentAnnotation = {this.state.currentAnnotation}
                        calendarChosen = {this.state.calendarChosen}
                        chooseRepeatOption = {this.chooseRepeatOption}
                    />

                    : 

                    <></>
                }
                
                    
                {this.state.repeatClicked ? 
                    <Repeat 
                        repeatClicked = {this.state.repeatClicked}
                        currentAnnotation = {this.state.currentAnnotation}
                    />
                    
                    :

                    <></>
                }

            </Modal>
        )
    }
}