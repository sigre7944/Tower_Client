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
                <DayAnnotationPanelContainer />
                
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