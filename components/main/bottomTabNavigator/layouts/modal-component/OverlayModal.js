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
    }

    
    setCurrentAnnotation = (annotation) => {
        this.setState({currentAnnotation: annotation})
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.addTaskClicked !== nextProps.addTaskClicked
    }

    componentWillMount(){

    }

    componentDidMount(){
        
    }

    componentDidUpdate(prevProps, prevState){
    }

    
    render(){
        return(
            <Modal
                visible={this.props.addTaskClicked}
                transparent={true}
            >   
                <DismissElement 
                addTaskButtonActionProp = {this.props.addTaskButtonActionProp} 
                />
                
                <AddTaskPanel 
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