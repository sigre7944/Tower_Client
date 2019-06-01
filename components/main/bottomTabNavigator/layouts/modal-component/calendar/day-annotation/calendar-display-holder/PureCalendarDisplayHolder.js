import React, { Component } from 'react'

import CalendarDisplayHolder from './CalendarDisplayHolder'

export default class PureCalendarDisplayHolder extends React.PureComponent{
    render(){
        return(
            <CalendarDisplayHolder 
                style = {this.props.style}
                month={this.props.month} 
                year={this.props.year}
                calendarIndex = {this.props.calendarIndex}
                chooseDiffCalendarMonth = {this.props.chooseDiffCalendarMonth}
                currentIndexOfTotalCalendarMonth = {this.props.currentIndexOfTotalCalendarMonth}
            />
        )
    }
}