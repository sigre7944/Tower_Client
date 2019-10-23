import React, { Component } from 'react'

import {
    View,
} from 'react-native';

// import MonthAnnotationPanel from './month-annotation/MonthAnnotationPanel.Container'
// import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel.Container'

import DayCalendar from './day-calendar/DayCalendar.Container'
import WeekCalendar from './week-calendar/WeekCalendar.Container'

const panel_width = 338

export default class Calendar extends Component {

    render() {
        return (
            <>
                {
                    this.props.currentAnnotation === 'day' ?
                        <DayCalendar
                            edit={this.props.edit}
                            hideAction={this.props.disableAllTabs}
                        />

                        :

                        <>
                            {this.props.currentAnnotation === "week" ?
                                <WeekCalendar
                                    edit={this.props.edit}
                                    hideAction={this.props.disableAllTabs}
                                />
                                :

                                null
                            }

                            {/* {this.props.currentAnnotation === 'week' ?
                                <View
                                    style={{
                                        position: 'absolute',
                                        width: panel_width,
                                        height: 446,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                    }}
                                >
                                    <WeekAnnotationPanel
                                        disableAllTabs={this.props.disableAllTabs}
                                    />
                                </View>

                                :

                                <View style={{
                                    position: 'absolute',
                                    width: panel_width,
                                    height: 546,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                }}>
                                    <MonthAnnotationPanel
                                        disableAllTabs={this.props.disableAllTabs}
                                    />
                                </View>

                            } */}
                        </>
                }

            </>
        )
    }
}