import React, { Component, Fragment } from 'react'

import {
    View,

} from 'react-native';

import DayAnnotationPanel from './day-annotation/DayAnnotationPanel'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel'
import MonthAnnotationPanel from './month-annotation/MonthAnnotationPanel'

export default class Calendar extends Component {

    render() {
        return (
            <Fragment>
                {this.props.currentAnnotation === 'day' ?
                    <View
                        style={{
                            position: 'absolute',
                            top: 75,
                            bottom: 75,
                            right: 25,
                            left: 25,
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                    >
                        <DayAnnotationPanel
                            chooseRepeatOption = {this.props.chooseRepeatOption}
                        />
                    </View>

                    :

                    <Fragment>
                        {this.props.currentAnnotation === 'week' ?
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
                                <WeekAnnotationPanel 
                                    chooseRepeatOption = {this.props.chooseRepeatOption}
                                />
                            </View>

                            :

                            <View style={{
                                position: 'absolute',
                                top: 100,
                                bottom: 100,
                                right: 25,
                                left: 25,
                                backgroundColor: 'white',
                                borderRadius: 10,
                            }}>
                                <MonthAnnotationPanel />
                            </View>

                        }
                    </Fragment>
                }
            </Fragment>
        )
    }
}