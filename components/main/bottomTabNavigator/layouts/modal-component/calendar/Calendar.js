import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

import DayAnnotationPanelContainer from './day-annotation/DayAnnotationPanel.Container'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel'

export default class Calendar extends Component{

    state = {
    }

    componentDidMount(){
    }

    render(){
        return(
            <View 
                style={{
                    position: 'absolute',
                    top: 100,
                    bottom: 100,
                    right: 25,
                    left: 25,
                    backgroundColor: 'white',
                    borderRadius: 10,
                }}
            >

            {this.props.currentAnnotation === 'day' ?
                <DayAnnotationPanelContainer
                    calendarChosen = {this.props.calendarChosen}
                />
                
                :

                <>
                {this.props.currentAnnotation === 'week' ?
                    <WeekAnnotationPanel 
                        calendarChosen = {this.props.calendarChosen}
                    />

                    :

                    <>
                    <MonthAnnotationPanel 
                        calendarChosen = {this.props.calendarChosen}
                    />
                    </>
                
                }
                </>
            }
            </View>
        )
    }
}