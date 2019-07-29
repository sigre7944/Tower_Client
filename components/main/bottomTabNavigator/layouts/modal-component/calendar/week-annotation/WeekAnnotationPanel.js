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

    state = {
        currentMonth: 'This month',
        nextMonthColor: 'white',
        nextMonthTextColor: 'gray',
        thisMonthColor: 'black',
        thisMonthTextColor: 'white',

        currentWeekIndex: 0,
        lastWeekIndex: 0,

        displaying_text_of_current_week: ''
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
                    updateStartingDate={this.props.updateStartingDate}
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

        this.setState((state, props) => ({
            lastWeekIndex: state.currentWeekIndex,
            currentWeekIndex: index,
            displaying_text_of_current_week: displaying_text_of_current_week
        }))

        this.props.updateCurrentWeekInMonth(week_data)

    }

    returnToCurrentMonth = () => {
        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ animated: true, offset: 2 * 40 - 40 * 2 })
        }

    }

    initWeeks = () => {
        let year = new Date().getFullYear()

        this.getWeekData(new Date(year, 0, 1), new Date(year + this.numberOfYears, 11, 31), 1)
    }



    trimPastWeeks = () => {
        let currentYear = new Date().getFullYear(),
            currentMonth = new Date().getMonth()


        let startTrimmingIndex = this.week_data_array.findIndex((data) => data.year === currentYear && data.month === monthNames[currentMonth])

        //startTrimmingIndex - 1 means we will get the monthAndYear text, since startTrimmingIndex will be the
        //very first day of the first week of the month. So before that index, is the monthAndYear text's object.
        this.week_data_array = [... this.week_data_array.slice(startTrimmingIndex - 1, this.week_data_array.length)]

    }

    getWeekData = (firstDayOfWeek, endDay, noWeek, noWeekInMonth) => {

        if (firstDayOfWeek.getTime() > endDay.getTime()) {
            return
        }

        let weekData = {
            noWeek: 0,
            week_day_array: new Array(7),
            month: monthNames[firstDayOfWeek.getMonth()],
            monthIndex: firstDayOfWeek.getMonth(),
            year: firstDayOfWeek.getFullYear(),
            day: firstDayOfWeek.getDate(),
            noWeekInMonth: 0
        }

        //If noWeek = 53 meaning turn to the new year => reset to 1
        if (noWeek === 53) {
            noWeek = 1
        }

        //Get monthAndYear text to seperate months
        if (firstDayOfWeek.getMonth() !== this.currentDisplayingMonth) {
            this.currentDisplayingMonth = firstDayOfWeek.getMonth()
            this.week_data_array.push({
                monthAndYear: monthNames[firstDayOfWeek.getMonth()] + " " + firstDayOfWeek.getFullYear(),
            })
            noWeekInMonth = 1
        }

        //When firstDayOfWeek is not Monday, meaning it starts the new year
        if (firstDayOfWeek.getDay() !== 1) {
            let firstDayOfWeekInWeekDay = firstDayOfWeek.getDay() === 0 ? 7 : firstDayOfWeek.getDay() //Sunday will have an index of 7 instead of 0

            weekData.noWeek = 1

            for (let i = firstDayOfWeekInWeekDay; i <= 7; i++) {
                if (i === firstDayOfWeekInWeekDay)
                    weekData.week_day_array[i - 1] = new Date(firstDayOfWeek.getTime())

                else
                    weekData.week_day_array[i - 1] = new Date(firstDayOfWeek.getTime() + (60 * 60 * 24 * 1000) * (i - firstDayOfWeekInWeekDay))
            }
        }

        //When firstDayOfWeek is Monday, meaning it is still in the current year
        else {
            weekData.noWeek = noWeek
            weekData.noWeekInMonth = noWeekInMonth

            for (let i = firstDayOfWeek.getDay(); i <= 7; i++) {
                weekData.week_day_array[i - 1] = new Date(firstDayOfWeek.getTime() + (60 * 60 * 24 * 1000) * (i - 1))
            }
        }

        this.week_data_array.push(weekData)

        //Get the last day of week to calculate the next Monday
        let nextMondayTime = new Date(weekData.week_day_array[6].getTime() + (60 * 60 * 24 * 1000))


        this.getWeekData(nextMondayTime, endDay, weekData.noWeek + 1, weekData.noWeekInMonth + 1)
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
        
    }

    componentDidMount() {
        this.initWeeks()

        this.trimPastWeeks()

        this.markCurrentWeek()

        this.week_data_array.every((data, index) => {
            if (data.isCurrentWeek) {
                this.scrollToWeekRow(index)

                return false
            }

            return true
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
                                data={this.week_data_array}
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