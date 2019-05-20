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
    ScrollView
} from 'react-native';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

DayInWeekHolder = (props) => (
    <View
        style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Text
            style={{
                color: "gray",
            }}
        >
            {props.day}
        </Text>
    </View>
)

export default class CalendarDisplayHolder extends Component{

    state = {
        monthInText: '',
        year: '',
        renderDaysInMonth: <></>
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
    }

    componentDidMount(){
        let month = this.props.month,
            monthInText = monthNames[month],
            year = this.props.year 

        this.setState({monthInText, year})  

        let daysInMonth = this.getDaysInMonth(month + 1, year),
            calendar_row_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)], //6 rows in total
            display_day_array = [] //length of 7*6 = 42

        let daysInLastMonth
        //To check the current month is January or not
        if(month !== 0)
            daysInLastMonth = this.getDaysInMonth(month, year)

        else
            daysInLastMonth = this.getDaysInMonth(12, year - 1)

        let firstDayOfCurrentMonthInWeek = new Date(year, month, 1).getDay() ,
            numberOfDaysFromLastMonth

        //Find the number of days from last month to determine how many last month's days will be displayed in the calendar
        if(firstDayOfCurrentMonthInWeek !== 0){
            numberOfDaysFromLastMonth = firstDayOfCurrentMonthInWeek - 1
        }

        else{
            numberOfDaysFromLastMonth = 6
        }

        //Get the days in last month based on the number of last month's days calculated above
        for(let i = daysInLastMonth - numberOfDaysFromLastMonth + 1; i <= daysInLastMonth; i++){
            display_day_array.push({
                day: i
            }) 
        }

        //Get the days in current month (main context)
        for(let i = 1; i <= daysInMonth; i++){
            display_day_array.push({
                day: i,
                main: true
            })
        }

        //Get the days will be displayed in the calendar from the next month
        let lastDayInWeekOfCurrentMonth = new Date(year, month, daysInMonth).getDay(),
            postDaysFromNextMonth = lastDayInWeekOfCurrentMonth !== 0 ? 7 - lastDayInWeekOfCurrentMonth : 0 //To determine displaying only when the last day in week of current month
                                                                                                            // is not Sunday.

        //Get the days in next month
        for(let i = 1; i <= postDaysFromNextMonth; i++){
            display_day_array.push({
                day: i
            })
        }


        //After we get all the information needed from 3 above loops, we need to fill up remaining indexes in display_day_array to complete 42 holders.
        if(display_day_array.length < 42){
            for(let i = display_day_array.length; i < 42; i++){
                display_day_array.push(<></>)
            }
        }

        //In calendar_row_array, each index is a row, containing all the neccessary React elements to form the Calendar.
        for(let i = 0; i < display_day_array.length; i++){
            if(display_day_array[i].main)
                calendar_row_array[parseInt((i) / 7)].push(
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 7,
                        }}
                        key={"Touchable holder for day in calendar " + i}
                    >
                        <Text
                            style= {{
                                color: "black"
                            }}
                        >
                            {display_day_array[i].day}
                        </Text>
                    </TouchableHighlight>
                )

            else
                calendar_row_array[parseInt((i) / 7)].push(
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 7,
                        }}

                        key={"view holder for day in calendar " + i}
                    >
                        <Text
                            style= {{
                                color: "gainsboro"
                            }}
                        >
                            {display_day_array[i].day}
                        </Text>
                    </View>
                )
            
        }

        //Display the Calendar through state.
        this.setState({
            renderDaysInMonth : calendar_row_array.map((elements, index) => (
                <View 
                    key={index}
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    {elements}
                </View>
            ))
        }) 
    }


    render(){
        return(
            <View style={this.props.style}>
                <View style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "500"
                            }}
                        >
                            {this.state.monthInText}
                        </Text>
                        <Text
                            style={{
                                color: "gray",
                                fontSize: 14,
                                marginLeft: 5
                            }}
                        >
                            {this.state.year}
                        </Text>
                    </View>
                    
                </View>

                <View
                    style={{
                        flex: 1,
                        marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <DayInWeekHolder day='M' />
                        <DayInWeekHolder day='T' />
                        <DayInWeekHolder day='W' />
                        <DayInWeekHolder day='T' />
                        <DayInWeekHolder day='F' />
                        <DayInWeekHolder day='S' />
                        <DayInWeekHolder day='S' />
                    </View>

                    {this.state.renderDaysInMonth}
                    
                </View>
            </View>
        )
    }
}