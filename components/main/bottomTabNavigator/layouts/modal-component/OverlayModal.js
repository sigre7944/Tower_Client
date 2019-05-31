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

DismissElement = (props) => {
    return(
    <TouchableWithoutFeedback
        onPress={() => {
            props.addTaskButtonActionProp()
            props.disableCalendarOption()
        }}
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

export default class UnderlayModal extends Component {

    state = {
        currentAnnotation: 'day',
        addTaskClicked: false,
        calendarChosen: false,
    }

    setCurrentAnnotation = (annotation) => {
        this.setState({currentAnnotation: annotation})
    }

    chooseCalenderOption = () => {
        this.setState(prevState => ({
            calendarChosen: !prevState.calendarChosen
        }))
    }

    disableCalendarOption = () => {
        this.setState({
            calendarChosen: false
        })
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
                disableCalendarOption = {this.disableCalendarOption}
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
                    />

                    : 

                    <></>
                }
                
                    
            </Modal>
        )
    }
}