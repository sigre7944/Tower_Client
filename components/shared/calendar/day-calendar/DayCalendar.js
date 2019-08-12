import React, { Component } from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


export default class DayCalendar extends React.Component {
    month_data_array = []
    numberOfMonths = (12 * 10) + 1 //Number of months we want to display. (12 months in a year) * (number of year) + 1 (for current month)

    chosen_day = -1
    chosen_month = -1
    chosen_year = -1

    state = {
        current_month_index: 0,
        month_data_array: []
    }

    chooseDifferentMonth = (index) => {
        if (index !== this.state.current_month_index)
            this.setState({
                current_month_index: index
            })
    }

    scrollToCurrentMonth = (month_index) => {
        this._flatlistRef.scrollToOffset({ animated: true, offset: 0 })
    }

    _keyExtractor = (item, index) => `month-calendar-${index}`

    _renderItem = ({ item, index }) => (
        <CalendarDisplayHolder
            style={
                index === this.state.month_data_array.length - 1 ?
                    {
                        flex: 1,
                        width: 338,
                    }

                    :

                    {
                        flex: 1,
                        width: 338,
                        marginRight: 338,
                    }
            }

            month={item.month}
            year={item.year}
            month_index={index}
            chooseDifferentMonth={this.chooseDifferentMonth}
            current_month_index={this.state.current_month_index}
            currentDayInMonth={new Date().getDate()}
            currentMonth={new Date().getMonth()}
            currentYear={new Date().getFullYear()}
            scrollToCurrentMonth={this.scrollToCurrentMonth}
            setChosenDate={this.setChosenDate}
            task_data={this.props.task_data}
        />
    )

    initializeMonths = () => {
        let currentMonth = new Date().getMonth(),
            currentYear = new Date().getFullYear()

        this.getFollowingMonths(currentMonth, currentYear, this.numberOfMonths)
    }

    getFollowingMonths = (currentMonth, currentYear, numberOfMonths) => {
        if (numberOfMonths === 0) {
            return
        }

        this.month_data_array.push({
            month: currentMonth,
            year: currentYear,
        })

        if (currentMonth === 11) {
            currentMonth = 0
            currentYear += 1
        }

        else {
            currentMonth += 1
        }

        numberOfMonths -= 1

        this.getFollowingMonths(currentMonth, currentYear, numberOfMonths)
    }

    setChosenDate = (day, month, year) => {
        this.chosen_day = day
        this.chosen_month = month
        this.chosen_year = year
    }

    save = () => {
        if(this.chosen_day > 0 && this.chosen_month > 0 && this.chosen_year > 0){
            if(this.chosen_day < new Date().getDate() && this.chosen_month === new Date().getMonth() && this.chosen_year === new Date().getFullYear())
                this._updateStartingDate(new Date().getDate(), this.chosen_month, this.chosen_year)

            else
                this._updateStartingDate(this.chosen_day, this.chosen_month, this.chosen_year)
        }

        this.props.disableAllTabs()
    }

    _updateStartingDate = (day, month, year) => {
        let startTime = trackingTime = new Date(new Date(new Date((new Date().setMonth(month))).setDate(day)).setFullYear(year)).getTime()

        this.props.updateStartingDate({
            day,
            month,
            year,
            startTime,
            trackingTime
        })
    }

    componentDidMount() {
        this.initializeMonths()

        this.setState({
            month_data_array: [... this.month_data_array]
        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <FlatList
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={338 * 2}
                    snapToAlignment="start"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this._keyExtractor}
                    initialNumToRender={1}
                    removeClippedSubviews={true}
                    data={this.state.month_data_array}
                    extraData={this.state.current_month_index}
                    renderItem={this._renderItem}
                    maxToRenderPerBatch={20}
                    windowSize={19}

                    ref={(c) => this._flatlistRef = c}
                >

                </FlatList>
            </View>
        )
    }
}

class CalendarDisplayHolder extends React.PureComponent {
    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    day_data_array = [] //Hold the data to display of each day in the current calendar month

    state = {
        row_days_array: [],
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, (month + 1), 0).getDate()
    }

    getDataOfDaysLastMonthToDisplay = (daysLastMonthToDisplay, daysLastMonth) => {
        for (let i = (daysLastMonth - daysLastMonthToDisplay + 1); i <= daysLastMonth; i++) {
            this.day_data_array.push({
                day: i
            })
        }
    }

    getDataOfDaysThisMonthToDisplay = (daysThisMonth) => {
        for (let i = 1; i <= daysThisMonth; i++) {
            this.day_data_array.push({
                day: i,
                main: true //To identify this object contains a day of the current month
            })
        }
    }

    getDataOfDaysNextMonthToDisplay = (daysNextMonthToDisplay) => {
        for (let i = 1; i <= daysNextMonthToDisplay; i++) {
            this.day_data_array.push({
                day: i
            })
        }
    }

    _scrollToCurrentMonth = () => {
        this.props.scrollToCurrentMonth()
    }


    componentDidMount() {
        let month = this.props.month,
            year = this.props.year

        this.day_data_array = [] //length of 7*6 = 42

        let daysThisMonth = this.getDaysInMonth(month, year) //Number of days in this month

        let daysLastMonth //Number of days in the last month

        //To check if the current month is January or not
        //If not, then we proceed finding the total days in the last month normally
        if (month !== 0) {
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
        if (this.day_data_array.length < 42) {
            for (let i = this.day_data_array.length; i < 42; i++) {
                this.day_data_array.push({
                    day: 0
                })
            }
        }

        //This array will hold data of 7 days in a row for displaying the month calendar (there are 6 rows in total)
        let row_days_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)]

        for (let i = 0; i < this.day_data_array.length; i++) {
            row_days_array[parseInt(i / 7)].push({
                dayData: this.day_data_array[i],
                calendarDayIndex: i
            })
        }

        this.setState({
            row_days_array: [...row_days_array]
        })
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableHighlight style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                    onPress={this._scrollToCurrentMonth}
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
                            {this.monthNames[this.props.month]}
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
                        row_days_array={this.state.row_days_array}

                        {... this.props}
                    />
                </View>
            </View>
        )
    }
}

class DayInWeekHolder extends React.PureComponent {
    render() {
        return (
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

class RenderCalendar extends React.PureComponent {
    state = {
        lastCalendarDayIndex: 0, //To keep track of the last chosen day in the month (for resetting its style)
        currentCalendarDayIndex: 0, //Keeping track of the current chosen day in the month (for changing its style to proper one)
    }

    //If we choose a different day in the month, then this function will be called
    changeCurrentCalendarDayIndex = (index) => {
        if (this.state.currentCalendarDayIndex !== index) {
            this.setState(prevState => ({
                lastCalendarDayIndex: prevState.currentCalendarDayIndex,
                currentCalendarDayIndex: index
            }))
        }
    }

    render() {
        return (
            <>
                {
                    this.props.row_days_array.map((rowData, index) => (
                        <CalendarRow
                            key={'calendar row ' + index}
                            rowData={rowData}

                            lastCalendarDayIndex={this.state.lastCalendarDayIndex}
                            changeCurrentCalendarDayIndex={this.changeCurrentCalendarDayIndex}

                            {... this.props}
                        />
                    ))
                }
            </>
        )
    }
}

class CalendarRow extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                {this.props.rowData.map((data, index) => {
                    if (data.dayData.main)
                        return (
                            <DayHolder
                                key={"day holder " + data.calendarDayIndex}

                                day={data.dayData.day}

                                calendarDayIndex={data.calendarDayIndex}

                                {... this.props}
                            />
                        )

                    else
                        return (
                            <DummyHolder
                                key={"dummy holder " + data.calendarDayIndex}

                                day={data.dayData.day}
                            />
                        )
                })}
            </View>
        )
    }
}

class DayHolder extends React.PureComponent {

    state = {
        dayHolderStyle: styles.UnchosenDayHolder,
        dayTextStyle: styles.UnchosenDayText,
    }

    chooseDay = () => {
        this.setState({
            dayHolderStyle: styles.ChosenDayHolder,
            dayTextStyle: styles.ChosenDayText
        })

        this.props.changeCurrentCalendarDayIndex(this.props.calendarDayIndex)

        this.props.chooseDifferentMonth(this.props.month_index)

        this.props.setChosenDate(this.props.day, this.props.month, this.props.year)
    }


    componentDidMount() {
        let { schedule } = this.props.task_data
        if (schedule) {
            if (this.props.month === schedule.month && this.props.year === schedule.year && this.props.day === schedule.day) {
                this.chooseDay()
            }

            else {
                if (this.props.currentMonth === this.props.month && this.props.currentYear === this.props.year && this.props.day === this.props.currentDayInMonth) {
                    this.chooseDay()
                }
            }
        }
        else {
            if (this.props.currentMonth === this.props.month && this.props.currentYear === this.props.year && this.props.day === this.props.currentDayInMonth) {
                this.chooseDay()
            }
        }

    }


    componentDidUpdate(prevProps, prevState) {
        //If we choose another day then we reset the previous day's style
        //This means if this day is the previous day then reset its style
        if (this.props.lastCalendarDayIndex !== prevProps.lastCalendarDayIndex && this.props.lastCalendarDayIndex === this.props.calendarDayIndex) {
            this.setState({
                dayHolderStyle: styles.UnchosenDayHolder,
                dayTextStyle: styles.UnchosenDayText,
            })
        }

        if (this.props.month_index !== this.props.current_month_index && this.props.current_month_index !== prevProps.current_month_index) {
            this.setState({
                dayHolderStyle: styles.UnchosenDayHolder,
                dayTextStyle: styles.UnchosenDayText,
            })
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                }}
                underlayColor="transparent"

                //Need to optimize this
                onPress={this.chooseDay}
            >
                <View
                    style={this.state.dayHolderStyle}
                >
                    <Text
                        style={this.state.dayTextStyle}
                    >
                        {this.props.day}
                    </Text>
                </View>

            </TouchableHighlight>
        )
    }
}

class DummyHolder extends React.PureComponent {
    render() {
        return (
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
