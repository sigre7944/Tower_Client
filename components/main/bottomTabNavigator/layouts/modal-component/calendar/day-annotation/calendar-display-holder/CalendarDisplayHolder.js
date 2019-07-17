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



class DayInWeekHolder extends React.PureComponent{
    render(){
        return(
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
                    {this.props.day}
                </Text>
            </View>
        )
    }
}

class RenderCalendar extends React.PureComponent{
    state = {
        lastCalendarDayIndex: 0, //To keep track of the last chosen day in the month (for resetting its style)
        currentCalendarDayIndex: 0, //Keeping track of the current chosen day in the month (for changing its style to proper one)
    }

    //If we choose a different day in the month, then this function will be called
    changeCurrentCalendarDayIndex = (index) => {
        this.setState({
            currentCalendarDayIndex: index
        })
    }

    //After we get the currentCalendarDayIndex, we set the lastCalendarDayIndex to the previous currentCalendarDayIndex
    componentDidUpdate(prevProps, prevState){
        if(this.state.currentCalendarDayIndex !== prevState.currentCalendarDayIndex){
            // console.log(prevState.currentCalendarDayIndex)
            this.setState({
                lastCalendarDayIndex: prevState.currentCalendarDayIndex
            })
        }
    }


    render(){
        return(
            <>
                {
                    this.props.row_days_array.map((rowData, index) => (
                        <CalendarRow
                            key = {'calendar row ' + index}
                            rowData = {rowData}

                            lastCalendarDayIndex = {this.state.lastCalendarDayIndex}
                            changeCurrentCalendarDayIndex = {this.changeCurrentCalendarDayIndex}

                            // month_index = {this.props.month_index}
                            // current_month_index = {this.props.current_month_index}
                            // chooseDifferentMonth = {this.props.chooseDifferentMonth}
                            
                            {... this.props}
                        />
                    ))
                }
            </>
        )
    }
}

class CalendarRow extends React.PureComponent{
    
    render(){
        return(
            <View 
                style={{
                    flexDirection: 'row',
                }}
            >
                {this.props.rowData.map((data, index) => {
                    if(data.dayData.main)
                        return (
                            <DayHolder 
                                key={"day holder "+ data.calendarDayIndex}

                                day = {data.dayData.day}

                                calendarDayIndex = {data.calendarDayIndex}
                                // lastCalendarDayIndex = {this.props.lastCalendarDayIndex}
                                // changeCurrentCalendarDayIndex = {this.props.changeCurrentCalendarDayIndex}

                                // month_index = {this.props.month_index}
                                // current_month_index = {this.props.current_month_index}
                                // chooseDifferentMonth = {this.props.chooseDifferentMonth}

                                {... this.props}
                            />
                        )

                    else
                        return (
                            <DummyHolder 
                                key={"dummy holder "+ data.calendarDayIndex}

                                day = {data.dayData.day}
                            />
                        )
                })}
            </View>
        )
    }
}


class DayHolder extends React.PureComponent{

    state = {
        dayHolderStyle: {},
        dayTextStyle: {},
    }

    chooseDay = (index) => {
        this.setState({
            dayHolderStyle: styles.ChosenDayHolder,
            dayTextStyle: styles.ChosenDayText
        })

        this.props.changeCurrentCalendarDayIndex(index)

        this.props.chooseDifferentMonth(this.props.month_index)
    }


    componentDidMount(){
        this.setState({
            dayHolderStyle: styles.UnchosenDayHolder,
            dayTextStyle: styles.UnchosenDayText
        })

        if(this.props.currentMonth === this.props.month && this.props.currentYear === this.props.year && this.props.calendarDayIndex === this.props.currentDayInMonth -1){
            this.chooseDay(this.props.calendarDayIndex)
        }
    }


    componentDidUpdate(prevProps, prevState){
        //If we choose another day then we reset the previous day's style
        //This means if this day is the previous day then reset its style
        if(this.props.lastCalendarDayIndex !== prevProps.lastCalendarDayIndex && this.props.lastCalendarDayIndex === this.props.calendarDayIndex){
            this.setState({
                dayHolderStyle: styles.UnchosenDayHolder,
                dayTextStyle: styles.UnchosenDayText,
            })
        }

        if(this.props.month_index !== this.props.current_month_index && this.props.current_month_index !== prevProps.current_month_index){
            this.setState({
                dayHolderStyle: styles.UnchosenDayHolder,
                dayTextStyle: styles.UnchosenDayText,
            })
        }
    }

    render(){
        return(
            <TouchableHighlight
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                }}
                underlayColor="transparent"
                
                //Need to optimize this
                onPress={this.chooseDay.bind(this, this.props.calendarDayIndex)}
            >   
                <View
                    style={this.state.dayHolderStyle}
                >
                    <Text
                        style= {this.state.dayTextStyle}
                    >
                        {this.props.day}
                    </Text>
                </View>
                
            </TouchableHighlight>
        )
    }
}

class DummyHolder extends React.PureComponent{
    render(){
        return(
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                }}
            >
            </View>
        )
    }
}


export default class CalendarDisplayHolder extends Component{
    /*TO EXPLITCITLY USE GLOBAL VARIABLES WITHIN CLASS, ONE MUST DEFINE THOSE VARIABLES INSIDE CLASS*/
    /*IF DEFINING OUTSIDE, THOSE VARIABLES WILL BE UPDATED EVERY TIME THE SCRIPT THAT EXECUTES IT IS RAN*/
    
    day_data_array = [] //Hold the data to display of each day in the current calendar month
    row_days_array = [] //Hold all the row of React element to display the current calendar month


    state = {
        row_days_array: [],
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, (month + 1), 0).getDate()
    }

    getDataOfDaysLastMonthToDisplay = (daysLastMonthToDisplay, daysLastMonth) => {
        for(let i = (daysLastMonth - daysLastMonthToDisplay + 1); i <= daysLastMonth; i++){
            this.day_data_array.push({
                day: i
            })
        }
    }

    getDataOfDaysThisMonthToDisplay = (daysThisMonth) => {
        for(let i = 1; i <= daysThisMonth; i++){
            this.day_data_array.push({
                day: i,
                main: true //To identify this object contains a day of the current month
            })
        }
    }

    getDataOfDaysNextMonthToDisplay = (daysNextMonthToDisplay) => {
        for(let i = 1; i <= daysNextMonthToDisplay; i++){
            this.day_data_array.push({
                day: i
            })
        }
    }

    _scrollToCurrentMonth = () => {
        this.props.scrollToCurrentMonth()
    }

    componentDidMount(){

        let month = this.props.month,
            year = this.props.year 

        this.day_data_array = [] //length of 7*6 = 42
        
        let daysThisMonth = this.getDaysInMonth(month, year) //Number of days in this month

        let daysLastMonth //Number of days in the last month

        //To check if the current month is January or not
        //If not, then we proceed finding the total days in the last month normally
        if(month !== 0){
            daysLastMonth = this.getDaysInMonth(month, year)
        }


        //If the case, we will find the last December's total days
        else
            daysLastMonth = this.getDaysInMonth(11, (year - 1))

        let firstDayOfCurrentMonthInWeek = new Date(year, month, 1).getDay(), //This is the first day in month, but with the index in a week (Sun, Mon, ... Sat to 0, 1, ..., 6)
            daysLastMonthToDisplay = firstDayOfCurrentMonthInWeek !== 0 ? firstDayOfCurrentMonthInWeek - 1 : 6  //To be used to find how many days from last month should we 
                                                                                                                //display in the month calendar (Optional)

        
        //Push data of displaying days from last month to the array
        this.getDataOfDaysLastMonthToDisplay(daysLastMonthToDisplay, daysLastMonth)

        //Push data of displaying days from current month to the array
        this.getDataOfDaysThisMonthToDisplay(daysThisMonth)

        let lastDayOfCurrentMonthInWeek = new Date(year, month, daysThisMonth).getDay(),
            daysNextMonthToDisplay = lastDayOfCurrentMonthInWeek !== 0 ? 7 - lastDayOfCurrentMonthInWeek : 0 //To be used to find how many days from next month should we
                                                                                                             //display in the month calendar (Optional)

        //Push data of displaying days from next month to the array
        this.getDataOfDaysNextMonthToDisplay(daysNextMonthToDisplay)


        //After we get all neccessary data from last, current and next months, we need to fill the rest indexes will dummy data
        if(this.day_data_array.length < 42){
            for(let i = this.day_data_array.length; i < 42; i++){
                this.day_data_array.push({
                    day: 0
                })
            }
        }

        //This array will hold data of 7 days in a row for displaying the month calendar (there are 6 rows in total)
        this.row_days_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)]

        for(let i = 0; i < this.day_data_array.length; i++){
            this.row_days_array[parseInt(i / 7)].push({
                dayData: this.day_data_array[i],
                calendarDayIndex: i
            })
        }

        this.setState({
            row_days_array: [... this.row_days_array]
        })
    }

    componentDidUpdate(prevProps, prevState){

        
    }


    componentWillUnmount(){
    }

    

    render(){
        return(
            <View style={this.props.style}>
                <TouchableHighlight style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress = {this._scrollToCurrentMonth}
                >
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
                            {monthNames[this.props.month]}
                        </Text>
                        <Text
                            style={{
                                color: "gray",
                                fontSize: 14,
                                marginLeft: 5
                            }}
                        >
                            {this.props.year}
                        </Text>
                    </View>
                    
                </TouchableHighlight>

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

                    <RenderCalendar 
                        row_days_array = {this.state.row_days_array}

                        // month_index = {this.props.month_index}
                        // current_month_index = {this.props.current_month_index}
                        // chooseDifferentMonth = {this.props.chooseDifferentMonth}

                        {... this.props}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    UnchosenDayHolder: {
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

    ChosenDayHolder: {
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
