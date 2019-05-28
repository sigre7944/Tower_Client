import React from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import CalendarDisplayHolder from '../../../components/main/bottomTabNavigator/layouts/modal-component/calendar/day-annotation/calendar-display-holder/CalendarDisplayHolder'

export default class DayAnnotationCalendarFirstInit extends React.Component {
    componentDidMount(){
        let currentMonth = new Date().getMonth(),
        currentYear = new Date().getFullYear(),
        monthComponent_arr = [],
        monthsToDisplay_arr = []

        //get the past 11 months and current month (12 in total)
        let monthsFromLastYear = 11 - currentMonth

        //Get the data of months from the last year
        for(let i = 11 - (monthsFromLastYear); i <= 11; i++){
            monthsToDisplay_arr.push({
                month: i,
                year: currentYear - 1
            })
        }

        //Get the data of past months in the current year
        for(let i = 0; i <= currentMonth; i ++){
            monthsToDisplay_arr.push({
                month: i,
                year: currentYear
            })
        }

        //Get the next 12 months
        let monthsInNextYear = 12 - (11 - currentMonth)

        //Get the data of next months in the current year
        for(let i = currentMonth + 1; i <= 11; i++){
            monthsToDisplay_arr.push({
                month: i,
                year: currentYear,
            })
        }

        //Get the data of months in the next year
        for(let i = 0; i < (monthsInNextYear); i++){
            monthsToDisplay_arr.push({
                month: i,
                year: currentYear + 1,
            })
        }

        monthComponent_arr = monthsToDisplay_arr.map((data, index) => 
            {
                if(index === monthsToDisplay_arr.length - 1){
                    return(
                        <CalendarDisplayHolder 
                        key={'month-render-calendar' + index}
                        style={{
                            flex: 1,
                            width: Dimensions.get('window').width - 50,
                        }} 
        
                        month={data.month} 
                        year={data.year}
        
                        // chooseDiffCalendarMonth = {this.chooseDiffCalendarMonth}
                        // currentIndexOfTotalCalendarMonth = {this.state.currentIndexOfTotalCalendarMonth}
                        calendarIndex = {index}
                        />
                    )
                }

                else
                    return(
                        <CalendarDisplayHolder 
                        key={'month-render-calendar' + index}
                        style={{
                            flex: 1,
                            width: Dimensions.get('window').width - 50,
                            marginRight: (Dimensions.get('window').width - 50)
                        }} 
        
                        month={data.month} 
                        year={data.year}
        
                        // chooseDiffCalendarMonth = {this.chooseDiffCalendarMonth}
                        // currentIndexOfTotalCalendarMonth = {this.state.currentIndexOfTotalCalendarMonth}
                        calendarIndex = {index}
                        />
                    )
            }
        )

        this.props.updateMonthComponentArr(monthComponent_arr)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.monthComponent_arr !== prevProps.monthComponent_arr){
            MonthComponent_arr = this.props.monthComponent_arr
        }
    }

    render(){
        return(
            <>
            </>
        )
    }
}