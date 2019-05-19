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

import DayAnnotationPanel from './day-annotation/DayAnnotationPanel'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel'

export default class Calendar extends Component{

    state = {
    }

    componentDidUpdate(prevProps){
        console.log(prevProps.currentAnnotation)
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
                <DayAnnotationPanel />
                
                :

                <>
                {this.props.currentAnnotation === 'week' ?
                    <WeekAnnotationPanel />

                    :

                    <>
                    <MonthAnnotationPanel />
                    </>
                
                }
                </>
            }
            </View>
        )
    }
}