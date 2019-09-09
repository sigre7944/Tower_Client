import React, { Component } from 'react'

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class WeekCalendar extends Component {
    numberOfYears = 10
    week_data_array = []

    currentDisplayingMonth = 0 //January's index is 0

    currentTimeInMili = new Date().getTime()

    year = new Date().getFullYear()
    month = new Date().getMonth()

    start_index = 0

    state = {

        currentWeekIndex: 0,
        lastWeekIndex: 0,

        displaying_text_of_current_week: '',

        should_flatlist_update: 0
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
                    setData={this.setData}
                />
            )
        }
    }

    scrollToWeekRow = (index) => {
        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ animated: true, offset: index * 40 - 40 * 2 })
        }

        this.chooseWeek(index)
    }

    chooseWeek = (index) => {
        let week_data = this.week_data_array[index],
            displaying_text_of_current_week = 'Week ' + week_data.noWeek + ' - ' + week_data.month + ' ' + week_data.year

        this.setState(prevState => ({
            lastWeekIndex: prevState.currentWeekIndex,
            currentWeekIndex: index,
            displaying_text_of_current_week: displaying_text_of_current_week,
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    returnToCurrentMonth = () => {
        if (this._flatListRef) {
            this._flatListRef.scrollToOffset({ animated: true, offset: 2 * 40 - 40 * 2 })
        }
    }

    getWeek = (date) => {
        let target = new Date(date);
        let dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        let firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    initWeeks = () => {
        this.getWeekData(new Date(this.year, this.month, 1), new Date(this.year, 11, 31), 1)
    }

    getWeekData = (firstDayOfWeek, endDay, noWeekInMonth) => {

        if (firstDayOfWeek.getTime() > endDay.getTime()) {
            return
        }

        // if (noWeekInMonth > 4) {
        //     noWeekInMonth = 4
        // }

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

            noWeekInMonth = 1
        }

        weekData.noWeekInMonth = noWeekInMonth

        if (firstDayOfWeek.getDay() !== 1) {
            for (let i = 1; i < firstDayOfWeek.getDay(); i++) {
                weekData.week_day_array.push(undefined)
            }
        }

        let currentWeek = this.getWeek(firstDayOfWeek)
        weekData.noWeek = currentWeek

        for (let i = 0; i < 7; i++) {
            let day = new Date(firstDayOfWeek.getTime() + (60 * 60 * 24 * 1000) * (i))

            if (currentWeek === this.getWeek(day)) {
                weekData.week_day_array.push(day)
            }
        }

        this.week_data_array.push(weekData)

        let nextMondayTime = new Date(weekData.week_day_array[weekData.week_day_array.length - 1])
        nextMondayTime.setDate(weekData.week_day_array[weekData.week_day_array.length - 1].getDate() + 1)

        this.getWeekData(nextMondayTime, endDay, noWeekInMonth + 1)
    }

    _onEndReached = () => {
        this.year += 1
        let weekData = this.week_data_array[this.week_data_array.length - 1]

        let nextMondayTime = new Date(weekData.week_day_array[weekData.week_day_array.length - 1])
        nextMondayTime.setDate(weekData.week_day_array[weekData.week_day_array.length - 1].getDate() + 1)

        this.getWeekData(nextMondayTime, new Date(this.year, 11, 31), 1)

        this.setState(prevState => ({
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    setData = (day, week, month, year, noWeekInMonth) => {
        this.props.setData(day, week, month, year, noWeekInMonth)
    }

    setStartIndex = (index) => {
        this.start_index = index

        this.chooseWeek(index)
    }

    _getItemLayout = (data, index) => ({
        length: 40,
        offset: index * 40,
        index
    })

    componentDidMount() {

        let { schedule } = this.props.task_data

        this.initWeeks()

        if (schedule.year > this.year) {
            this.year = schedule.year
            let weekData = this.week_data_array[this.week_data_array.length - 1]

            let nextMondayTime = new Date(weekData.week_day_array[weekData.week_day_array.length - 1])
            nextMondayTime.setDate(weekData.week_day_array[weekData.week_day_array.length - 1].getDate() + 1)

            this.getWeekData(nextMondayTime, new Date(this.year, 11, 31), 1)
        }

        this.week_data_array.every((data, index) => {
            if (data.noWeek === schedule.week && data.monthIndex === schedule.month && data.year === schedule.year) {
                this.setStartIndex(index)
                return false
            }

            return true
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.toggle_clear !== prevProps.toggle_clear) {
            let date = new Date()

            this.week_data_array.every((data, index) => {
                if (data.noWeek === this.getWeek(date) && data.monthIndex === date.getMonth() && data.year === date.getFullYear()) {
                    this.scrollToWeekRow(index)
                    return false
                }

                return true
            })
        }
    }

    render() {
        return (
            <>

                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                    underlayColor="gainsboro"
                    onPress={this.returnToCurrentMonth}
                >
                    <Text style={{ fontSize: 18 }}>{this.state.displaying_text_of_current_week}</Text>
                </TouchableOpacity>

                {/* Main content of week calendar */}
                <View style={{
                    // flex: 1,
                    height: 300,
                    width: 338,
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
                                keyExtractor={this._keyExtractor}
                                data={this.week_data_array}
                                renderItem={this._renderItem}
                                extraData={this.state.should_flatlist_update}
                                // removeClippedSubviews={true}
                                // windowSize={3}
                                // initialNumToRender={1}
                                // maxToRenderPerBatch={53}
                                onEndReachedThreshold={0.9}
                                onEndReached={this._onEndReached}
                                ref={(c) => this._flatListRef = c}
                                initialScrollIndex={this.start_index}
                                getItemLayout={this._getItemLayout}
                            >

                            </FlatList>
                        </View>
                    </View>
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

class MonthYearHolder extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                }}
            >
                <Text>{this.props.monthAndYear}</Text>
            </View>
        )
    }
}

class CalendarDisplayHolder extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.index === nextProps.currentWeekIndex || this.props.index === nextProps.lastWeekIndex
    }

    _scrollToWeekRow = () => {
        this.props.scrollToWeekRow(this.props.index)
        let { weekData } = this.props
        this.props.setData(weekData.day, weekData.noWeek, weekData.monthIndex, weekData.year, weekData.noWeekInMonth)
    }

    render() {
        return (
            <>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 40,
                    }}

                    onPress={this._scrollToWeekRow}
                    underlayColor={"gainsboro"}
                >
                    <>
                        <WeekNumberHolder
                            noWeek={this.props.weekData.noWeek}
                            currentWeekIndex={this.props.currentWeekIndex}
                            lastWeekIndex={this.props.lastWeekIndex}
                            index={this.props.index}
                        />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[0]} />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[1]} />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[2]} />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[3]} />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[4]} />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[5]} />
                        <DayHolder dayTimeInMili={this.props.weekData.week_day_array[6]} />
                    </>
                </TouchableOpacity>
            </>
        )
    }
}


class WeekNumberHolder extends React.PureComponent {

    state = {
        style: styles.unchosenWeek
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.index === nextProps.currentWeekIndex) {
            return ({
                style: styles.chosenWeek
            })
        }

        else if (nextProps.index === nextProps.lastWeekIndex) {
            return ({
                style: styles.unchosenWeek
            })
        }
        return null
    }

    render() {
        return (
            <View style={this.state.style}>
                <Text>
                    {this.props.noWeek}
                </Text>
            </View>
        )
    }
}

class DayHolder extends React.PureComponent {

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text>
                    {new Date(this.props.dayTimeInMili).getDate() ? new Date(this.props.dayTimeInMili).getDate() : null}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    unchosenWeek: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    chosenWeek: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gainsboro",
        borderRadius: 100,
    }
})