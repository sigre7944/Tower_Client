import React, { Component } from 'react'

import {
    View,
} from 'react-native';


import DayCalendar from './day-calendar/DayCalendar.Container'
import WeekCalendar from './week-calendar/WeekCalendar.Container'
import MonthCalendar from './month-calendar/MonthCalendar.Container'

const panel_width = 338

export default class Calendar extends React.PureComponent {

    render() {
        return (
            <>
                {
                    this.props.currentAnnotation === 'day' ?
                        <DayCalendar
                            edit={this.props.edit}
                            edit_task_data={this.props.edit_task_data}
                            _editFieldData={this.props._editFieldData}

                            hideAction={this.props.hideAction}
                        />

                        :

                        <>
                            {this.props.currentAnnotation === "week" ?
                                <WeekCalendar
                                    edit={this.props.edit}
                                    edit_task_data={this.props.edit_task_data}
                                    _editFieldData={this.props._editFieldData}

                                    hideAction={this.props.hideAction}
                                />
                                :

                                <MonthCalendar
                                    edit={this.props.edit}
                                    edit_task_data={this.props.edit_task_data}
                                    _editFieldData={this.props._editFieldData}

                                    hideAction={this.props.hideAction}
                                />
                            }
                        </>
                }

            </>
        )
    }
}