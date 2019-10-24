import React, { Component } from 'react'

import {
    View,
} from 'react-native';


import DayCalendar from './day-calendar/DayCalendar.Container'
import WeekCalendar from './week-calendar/WeekCalendar.Container'
import MonthCalendar from './month-calendar/MonthCalendar.Container'

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

                                <MonthCalendar
                                    edit={this.props.edit}
                                    hideAction={this.props.disableAllTabs}
                                />
                            }
                        </>
                }

            </>
        )
    }
}