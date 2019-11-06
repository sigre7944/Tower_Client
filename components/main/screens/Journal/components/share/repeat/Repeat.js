import React, { Component } from 'react'

import {
    View,
} from 'react-native';

import DayTypeRepeat from './day-type-repeat/DayTypeRepeat.Container'
import WeekTypeRepeat from './week-type-repeat/WeekTypeRepeat.Container'
import MonthTypeRepeat from './month-type-repeat/MonthTypeRepeat.Container'

export default class Repeat extends Component {

    render() {
        return (
            <>
                {this.props.currentAnnotation === "day" ?
                    <DayTypeRepeat
                        hideAction={this.props.hideAction}

                        edit={this.props.edit}
                        edit_task_data={this.props.edit_task_data}
                        _editFieldData={this.props._editFieldData}
                    />
                    :

                    <>
                        {this.props.currentAnnotation === "week" ?
                            <WeekTypeRepeat
                                hideAction={this.props.hideAction}

                                edit={this.props.edit}
                                edit_task_data={this.props.edit_task_data}
                                _editFieldData={this.props._editFieldData}
                            />

                            :
                            <MonthTypeRepeat
                                hideAction={this.props.hideAction}

                                edit={this.props.edit}
                                edit_task_data={this.props.edit_task_data}
                                _editFieldData={this.props._editFieldData}
                            />
                        }
                    </>
                }
            </>
        )
    }

}