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
    ScrollView,
    StyleSheet
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
    /*TO EXPLITCITLY USE GLOBAL VARIABLES WITHIN CLASS, ONE MUST DEFINE THOSE VARIABLES INSIDE CLASS*/
    /*IF DEFINING OUTSIDE, THOSE VARIABLES WILL BE UPDATED EVERY TIME THE SCRIPT THAT EXECUTES IT IS RAN*/
    
    display_day_array = [] //Hold the data to display of each day in the current calendar month
    calendar_row_array = [] //Hold all the row of React element to display the current calendar month
    lastIndexOfDay //The last day's index in display_day_array to reset the style of the last day


    constructor(props){
        super(props)
        this.state = {
            monthInText: '',
            year: '',
            renderDaysInMonth: <></>,
            display_day_style_array: [],
            display_day_text_style_array: [],
            calendar_row_array: []
        }
    }

    


    chooseDay = (index, day) => {
        let display_day_style_array = this.state.display_day_style_array,
            display_day_text_style_array = this.state.display_day_text_style_array

        if(this.lastIndexOfDay){
            display_day_style_array[this.lastIndexOfDay] = styles.UnchosenDay

            display_day_text_style_array[this.lastIndexOfDay] = styles.UnchosenDayText
        }


        display_day_style_array[index] = styles.ChosenDay

        display_day_text_style_array[index] = styles.ChosenDayText

        this.setState({
            display_day_style_array: [... display_day_style_array],
            display_day_text_style_array: [... display_day_text_style_array]
        })

        this.lastIndexOfDay = index

        this.props.chooseDiffCalendarMonth(this.props.calendarIndex)
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
            display_day_style_array = [], //to store style of each day for display proper style when chossing
            display_day_text_style_array = [] //to store style of each day's text for display proper style when chossing

        this.display_day_array = [] //length of 7*6 = 42
        
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
            // this.display_day_array.push({
            //     day: i
            // }) 

            this.display_day_array.push(<></>)

            display_day_style_array.push(styles.UnchosenDay)

            display_day_text_style_array.push(styles.UnchosenDayText)
        }

        //Get the days in current month (main context)
        for(let i = 1; i <= daysInMonth; i++){
            this.display_day_array.push({
                day: i,
                main: true
            })

            display_day_style_array.push(styles.UnchosenDay)

            display_day_text_style_array.push(styles.UnchosenDayText)
        }

        //Get the days will be displayed in the calendar from the next month
        let lastDayInWeekOfCurrentMonth = new Date(year, month, daysInMonth).getDay(),
            postDaysFromNextMonth = lastDayInWeekOfCurrentMonth !== 0 ? 7 - lastDayInWeekOfCurrentMonth : 0 //To determine displaying only when the last day in week of current month
                                                                                                            // is not Sunday.

        //Get the days in next month
        for(let i = 1; i <= postDaysFromNextMonth; i++){
            // this.display_day_array.push({
            //     day: i
            // })

            this.display_day_array.push(<></>)

            display_day_style_array.push(styles.UnchosenDay)

            display_day_text_style_array.push(styles.UnchosenDayText)
        }

        //After we get all the information needed from 3 above loops, we need to fill up remaining indexes in display_day_array to complete 42 holders.
        if(this.display_day_array.length < 42){
            for(let i = this.display_day_array.length; i < 42; i++){
                this.display_day_array.push(<></>)
            }
        }

        //Display the Calendar through state.
        this.setState({
            display_day_style_array: [... display_day_style_array],
            display_day_text_style_array: [... display_day_text_style_array],
        }) 
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.display_day_style_array !== prevState.display_day_style_array){
            this.calendar_row_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)] //6 rows in total

            //In calendar_row_array, each index is a row, containing all the neccessary React elements to form the Calendar.
            for(let i = 0; i < this.display_day_array.length; i++){
                if(this.display_day_array[i].main)
                    this.calendar_row_array[parseInt((i) / 7)].push(
                        <TouchableHighlight
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 2,
                            }}
                            onPress={this.chooseDay.bind(this, i, this.display_day_array[i].day)}
                            key={"maindayholder "+i}
                            underlayColor="transparent"
                        >   
                            <View
                                style={this.state.display_day_style_array[i]}
                            >
                                <Text
                                    style= {this.state.display_day_text_style_array[i]}
                                >
                                    {this.display_day_array[i].day}
                                </Text>
                            </View>
                            
                        </TouchableHighlight>
                    )

                else
                    this.calendar_row_array[parseInt((i) / 7)].push(
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 2,
                            }}

                            key={"view holder for day in calendar " + i}
                        >
                            {/* <Text
                                style= {{
                                    color: "gainsboro"
                                }}
                            >
                                {this.display_day_array[i].day}
                            </Text> */}
                        </View>
                    )
            }
            
            this.setState({
                renderDaysInMonth : this.calendar_row_array.map((elements, index) => (
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

        if(this.props.calendarIndex !== this.props.currentIndexOfTotalCalendarMonth && this.props.currentIndexOfTotalCalendarMonth !== prevProps.currentIndexOfTotalCalendarMonth){
            let display_day_style_array = this.state.display_day_style_array
            display_day_style_array.forEach((style, i, arr) => {
                arr[i] = styles.UnchosenDay
            })

            let display_day_text_style_array = this.state.display_day_text_style_array
            display_day_text_style_array.forEach((style, i, arr) => {
                arr[i] = styles.UnchosenDayText
            })

            this.setState({
                display_day_style_array: [... display_day_style_array],
                display_day_text_style_array: [... display_day_text_style_array]
            })
        }
    }


    componentWillUnmount(){
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


const styles = StyleSheet.create({
    UnchosenDay: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "white"
    },

    UnchosenDayText: {
        color: 'black'
    },

    ChosenDay: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "black"
    },

    ChosenDayText: {
        color: 'white'
    },
})

