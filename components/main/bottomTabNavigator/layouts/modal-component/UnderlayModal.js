import React, { Component } from 'react'

import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';

import AddTaskPanel from './add-task-panel/AddTaskPanel'
import Calendar from './calendar/Calendar'


DismissElement = (props) => (
    <TouchableWithoutFeedback
        onPress={() => {
            props.dismissAddTaskProcessWhenClickOnUnderlayModal()
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

export default class UnderlayModal extends Component {

    state = {
        currentAnnotation: 'day'
    }

    setCurrentAnnotation = (annotation) => {
        this.setState({currentAnnotation: annotation})
    }

    render(){
        return(
            <Modal
                visible={true}
                transparent={true}
            >   
                <DismissElement dismissAddTaskProcessWhenClickOnUnderlayModal = {this.props.dismissAddTaskProcessWhenClickOnUnderlayModal}/>
                
                <AddTaskPanel 
                    addTaskDisplayProperty = {this.props.addTaskDisplayProperty}
                    keyboardHeight = {this.props.keyboardHeight}
                    chooseCalenderOption = {this.props.chooseCalenderOption}
                    setCurrentAnnotation = {this.setCurrentAnnotation}
                    currentAnnotation = {this.state.currentAnnotation}
                />
                
                {/* Calendar View */}
                {this.props.calendarChosen ?
                    <Calendar 
                        currentAnnotation = {this.state.currentAnnotation}
                    />
                :

                    <></>
                }
                    
            </Modal>
        )
    }
}