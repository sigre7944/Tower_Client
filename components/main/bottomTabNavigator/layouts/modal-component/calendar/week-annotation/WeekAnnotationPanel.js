import React, { Component } from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'
import MonthYearHolder from './calendar-display-holder/MonthYearHolder'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export default class WeekAnnotationPanel extends Component {
    numberOfYears = 10
    week_data_array = []

    currentDisplayingMonth = -1 //January's index is 0

    currentTimeInMili = new Date().getTime()

    chosen_day = chosen_week = chosen_month = chosen_year = -1

    state = {
        currentMonth: 'This month',
        nextMonthColor: 'white',
        nextMonthTextColor: 'gray',
        thisMonthColor: 'black',
        thisMonthTextColor: 'white',

        currentWeekIndex: 0,
        lastWeekIndex: 0,

        displaying_text_of_current_week: '',

        week_data_array: []
    }

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
    }

    chooseMonthOption = (monthOption) => {
        if (monthOption === "This month") {
            this.setState({
                thisMonthColor: 'black',
                thisMonthTextColor: 'white',
                nextMonthColor: 'white',
                nextMonthTextColor: 'gray'
            })
        }

        else if (monthOption === "Next month") {
            this.setState({
                thisMonthColor: 'white',
                thisMonthTextColor: 'gray',
                nextMonthColor: 'black',
                nextMonthTextColor: 'white'
            })
        }
    }

    _keyExtractor = (item, index) => `week-calendar-${index}`

    _renderItem = ({ item, index }) => {

        if (item.monthAndYear) {

            //Do not render item with dynamic heights, or else FlatList will have difficult in rendering items.
            return (
                <MonthYearHolder
                    monthAndYear={item.monthAndYear}
                />
            )
        }

        else {
            return (
                <CalendarDisplayHolder
                    weekData={item}
                    index={index}
                    scrollToWeekRow={this.scrollToWeekRow}
                    currentWeekIndex={this.state.currentWeekIndex}
                    lastWeekIndex={this.state.lastWeekIndex}

                    currentWeekTask={this.props.currentWeekTask}
                />
            )
        }
    }

    //getItemLayout prop is not working properly, avoid using it for large lists.
    // _getItemLayout = (data, index) => {
    //     let height = (data.length) * 40 + (this.numberOfYears + 1) * 12 * 40

    //     return({
    //         length: height,
    //         offset: 40 * index,
    //         index
    //     })
    // }

    scrollToWeekRow = (index) => {
        // To initialize the first week, we need to make sure that the reference of FlatList 
        // is initialized before calling the function scrollToWeekRow. (Because FlatList will render items faster 
        // than creating its reference)

        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ animated: true, offset: index * 40 - 40 * 2 })
        }

        let week_data = this.week_data_array[index],
            displaying_text_of_current_week = 'Week ' + week_data.noWeek + ' - ' + week_data.month + ' ' + week_data.year

        this.setState(prevState => ({
            lastWeekIndex: prevState.currentWeekIndex,
            currentWeekIndex: index,
            displaying_text_of_current_week: displaying_text_of_current_week
        }))

        this.props.updateCurrentWeekInMonth(week_data)

        this.setChosenDate(week_data.day, week_data.noWeek, week_data.monthIndex, week_data.year)

    }

    returnToCurrentMonth = () => {
        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ animated: true, offset: 2 * 40 - 40 * 2 })
        }

    }

    getWeek = (date) => {
        var target = new Date(date);
        var dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    initWeeks = () => {
        let year = new Date().getFullYear()

        this.getWeekData(new Date(year, 0, 1), new Date(year + this.numberOfYears, 11, 31), 1)
    }

    getWeekData = (firstDayOfWeek, endDay) => {

        if (firstDayOfWeek.getTime() > endDay.getTime()) {
            return
        }

        let weekData = {
            noWeek: 0,
            week_day_array: [],
            month: monthNames[firstDayOfWeek.getMonth()],
            monthIndex: firstDayOfWeek.getMonth(),
            year: firstDayOfWeek.getFullYear(),
            day: firstDayOfWeek.getDate(),
        }

        //Get monthAndYear text to seperate months
        if (firstDayOfWeek.getMonth() !== this.currentDisplayingMonth) {
            this.currentDisplayingMonth = firstDayOfWeek.getMonth()
            this.week_data_array.push({
                monthAndYear: monthNames[firstDayOfWeek.getMonth()] + " " + firstDayOfWeek.getFullYear(),
            })
        }

        if(firstDayOfWeek.getDay() !== 1){
            for(let i = 1; i < firstDayOfWeek.getDay(); i++){
                weekData.week_day_array.push(undefined)
            }
        }

        let currentWeek = this.getWeek(firstDayOfWeek)
        weekData.noWeek = currentWeek

        for(let i = 0; i <7; i++){
            let day = new Date(firstDayOfWeek.getTime() + (60 * 60 * 24 * 1000) * (i))

            if(currentWeek === this.getWeek(day)){
                weekData.week_day_array.push(day)
            }
        }

        this.week_data_array.push(weekData)

        //Get the next starting day of the following week
        let nextMondayTime = new Date(weekData.week_day_array[weekData.week_day_array.length - 1].getTime() + (60 * 60 * 24 * 1000))


        this.getWeekData(nextMondayTime, endDay)
    }

    trimPastWeeks = () => {
        let currentYear = new Date().getFullYear(),
            currentMonth = new Date().getMonth()


        let startTrimmingIndex = this.week_data_array.findIndex((data) => data.year === currentYear && data.month === monthNames[currentMonth])

        //startTrimmingIndex - 1 means we will get the monthAndYear text, since startTrimmingIndex will be the
        //very first day of the first week of the month. So before that index, is the monthAndYear text's object.
        this.week_data_array = [... this.week_data_array.slice(startTrimmingIndex - 1, this.week_data_array.length)]

    }

    markCurrentWeek = () => {
        this.week_data_array.every((data, index, arr) => {
            if (data.week_day_array) {
                let found = false

                data.week_day_array.every((day) => {
                    if (new Date(day).getTime() > this.currentTimeInMili) {
                        arr[index].isCurrentWeek = true
                        found = true
                        return false
                    }

                    return true
                })

                if (found) {
                    return false
                }
            }

            return true
        })

    }

    _onLayout = () => {
        let { schedule } = this.props.currentWeekTask

        if (schedule) {
            let found = false

            this.week_data_array.every((data, index) => {
                if (data.noWeek === schedule.week && data.monthIndex === schedule.month && data.year === schedule.year) {
                    this.scrollToWeekRow(index)
                    found = true
                    return false
                }

                return true
            })

            if (!found) {
                this.week_data_array.every((data, index) => {
                    if (data.isCurrentWeek) {
                        this.scrollToWeekRow(index)

                        return false
                    }

                    return true
                })
            }
        }

        else {
            this.week_data_array.every((data, index) => {
                if (data.isCurrentWeek) {
                    this.scrollToWeekRow(index)

                    return false
                }

                return true
            })
        }
    }

    save = () => {
        if (this.chosen_day > 0 && this.chosen_week > 0 && this.chosen_month > 0 && this.chosen_year > 0) {
            if (this.chosen_day < new Date().getDate() && this.chosen_month === new Date().getMonth() && this.chosen_year === new Date().getFullYear()) {
                this._updateStartingDate(new Date().getDate(), this.chosen_week, this.chosen_month, this.chosen_year)
            }

            else {
                this._updateStartingDate(this.chosen_day, this.chosen_week, this.chosen_month, this.chosen_year)
            }
        }
        this.props.disableAllTabs()
    }

    setChosenDate = (day, week, month, year) => {
        this.chosen_day = day
        this.chosen_week = week
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateStartingDate = (day, week, month, year) => {
        let startTime = trackingTime = new Date(
            new Date(
                new Date(
                    new Date().setDate(day)).setMonth(month)).setFullYear(year))
            .getTime()

        this.props.updateStartingDate({
            day,
            week,
            month,
            year,
            startTime,
            trackingTime,
        })
    }

    componentDidMount() {
        this.initWeeks()

        this.trimPastWeeks()

        this.markCurrentWeek()

        this.setState({
            week_data_array: [... this.week_data_array]
        })
    }

    render() {
        return (
            <>

                <TouchableHighlight
                    style={{
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                    underlayColor="gainsboro"
                    onPress={this.returnToCurrentMonth}
                >
                    <Text style={{ fontSize: 18 }}>{this.state.displaying_text_of_current_week}</Text>
                </TouchableHighlight>

                {/* Main content of week calendar */}
                <View style={{
                    flex: 1,
                    position: "relative",
                    paddingHorizontal: 15,
                    marginTop: 20,
                }}>
                    {/* Left highlighting color bar for week */}
                    <View style={{
                        width: 40,
                        flex: 1,
                        backgroundColor: '#E2E3E4',
                        borderRadius: 25,
                        marginTop: 40,
                    }}>

                    </View>

                    {/* Week Calendar */}
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 15,
                        right: 15,
                        bottom: 0,
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                height: 30,
                                marginBottom: 10,
                            }}
                        >
                            <DayInWeekHolder day='Week' />
                            <DayInWeekHolder day='M' />
                            <DayInWeekHolder day='T' />
                            <DayInWeekHolder day='W' />
                            <DayInWeekHolder day='T' />
                            <DayInWeekHolder day='F' />
                            <DayInWeekHolder day='S' />
                            <DayInWeekHolder day='S' />
                        </View>
                        <View
                            style={
                                {
                                    flex: 1,
                                    overflow: "hidden",
                                }
                            }
                        >
                            <FlatList
                                // getItemLayout = {this._getItemLayout}
                                keyExtractor={this._keyExtractor}
                                data={this.state.week_data_array}
                                removeClippedSubviews={true}
                                renderItem={this._renderItem}
                                extraData={this.state.currentWeekIndex}
                                initialNumToRender={13}
                                maxToRenderPerBatch={52}
                                windowSize={5}
                                ref={(c) => this._flatListRef = c}
                                onLayout={this._onLayout}
                            >

                            </FlatList>
                        </View>
                    </View>
                </View>

                {/* Add Repeat */}
                <TouchableHighlight
                    style={{
                        height: 40,
                        backgroundColor: "white",
                        justifyContent: "center",
                        borderTopWidth: 1,
                        borderTopColor: 'gainsboro',
                    }}

                    onPress={this._chooseRepeatOption}
                    underlayColor="gainsboro"
                >
                    <Text>
                        Add repeat
                </Text>
                </TouchableHighlight>
                <View
                    style={{
                        height: 60,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }}
                >
                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            X
                    </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 10
                        }}

                        onPress={this.save}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            OK
                    </Text>
                    </TouchableHighlight>
                </View>
            </>
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