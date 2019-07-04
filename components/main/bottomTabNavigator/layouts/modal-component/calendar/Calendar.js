import React, { Component } from 'react'

import {
    View,
} from 'react-native';

import DayAnnotationPanel from './day-annotation/DayAnnotationPanel'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel'
import MonthAnnotationPanel from './month-annotation/MonthAnnotationPanel'

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
                <DayAnnotationPanel
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