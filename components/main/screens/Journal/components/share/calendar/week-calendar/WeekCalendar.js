import React from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native'

import { Map } from 'immutable'

import { styles } from './styles/styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

const panel_width = 338
const margin_top_for_calendar_row = 20
const margin_top_for_month_year_text = 30
const calendar_total_height = margin_top_for_calendar_row * 6 + 32 * 6
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)

export default class WeekCalendar extends React.Component {
    chosen_day = -1
    chosen_week = -1
    chosen_month = -1
    chosen_year = -1
    chosen_noWeekInMonth = -1

    calendar_scale_value = new Animated.Value(0.3)
    calendar_opacity_value = new Animated.Value(0.3)

    save = () => {
        if (this.chosen_day > 0 && this.chosen_week > 0 && this.chosen_month > 0 && this.chosen_year > 0 && this.chosen_noWeekInMonth > 0) {
            this._updateTask(this.chosen_day, this.chosen_week, this.chosen_month, this.chosen_year, this.chosen_noWeekInMonth)
        }

        this.props.hideAction()
    }

    cancel = () => {
        this.props.hideAction()
    }

    setData = (day, month, year) => {
        this.chosen_day = day
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateTask = (day, month, year) => {
        this.props.updateTaskSchedule({
            day,
            month,
            year,
        })
    }

    animateCalendar = () => {
        Animated.parallel([
            Animated.timing(
                this.calendar_opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.calendar_scale_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    componentDidMount() {
        this.animateCalendar()
    }


    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: panel_width,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    flexDirection: "row",
                    overflow: "hidden",
                    transform: [{ scale: this.calendar_scale_value }],
                    opacity: this.calendar_opacity_value
                }}
            >
                <View>
                    {/* Main content of day calendar */}
                    <Calendar
                        edit={this.props.edit}
                        setData={this.setData}
                        task_data={this.props.task_data}
                    />

                    <View
                        style={styles.separating_line}
                    >
                    </View>

                    <View
                        style={{
                            marginTop: 28,
                            marginHorizontal: 30,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginBottom: 35,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.close_icon_holder}
                            onPress={this.cancel}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.save_icon_holder}
                            onPress={this.save}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }
}

class Calendar extends React.Component {
    year_in_between = 4
    current_day = new Date().getDate()
    current_year = new Date().getFullYear()
    current_month = new Date().getMonth()
    left_end_year = this.current_year - this.year_in_between
    right_end_year = this.current_year + this.year_in_between

    present_month_index = -1

    month_data = []

    start_index = 0

    state = {
        should_flatlist_update: 0,

        current_month_index: -1,
        last_month_index: -1,

        current_week_index: -1,
        last_week_index: -1
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

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000)).getDate()
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday = this.getMonday(date)
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    scrollToMonth = (month_index) => {
        if (this._flatlist) {
            this._flatlist.scrollToOffset({ animated: true, offset: month_index * panel_width })
        }
    }

    _setRef = (r) => this._flatlist = r

    chooseWeek = (month_index, week_index) => {
        this.setState(prevState => ({
            current_month_index: month_index,
            last_month_index: prevState.current_month_index,

            current_week_index: week_index,
            last_week_index: prevState.current_week_index,

            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    _keyExtractor = (item, index) => `week-type-calendar-month-${index}`

    _renderItem = ({ item, index }) => (
        <MonthHolder
            data={item}
            month_index={index}

            current_month_index={this.state.current_month_index}
            last_month_index={this.state.last_month_index}

            current_week_index={this.state.current_week_index}
            last_week_index={this.state.last_week_index}

            chooseWeek={this.chooseWeek}
            scrollToMonth={this.scrollToMonth}
            present_month_index={this.present_month_index}

            setData={this.props.setData}
            task_data={this.props.task_data}

            findMonthIndex={this.findMonthIndex}
            findDayIndex={this.findDayIndex}

            current_day={this.current_day}
            current_month={this.current_month}
            current_year={this.current_year}
        />
    )

    initMonthData = () => {
        let counter = 0

        for (let year = this.left_end_year; year <= this.right_end_year; year++) {
            for (let month = 0; month < 12; month++) {
                if (month === this.current_month && year === this.current_year) {
                    this.present_month_index = counter
                }

                this.month_data.push({
                    month,
                    year
                })

                counter += 1
            }
        }

        if (this.props.edit) {
            this.start_index = this.findStartIndexIfEdit()
        }

        else {
            this.start_index = this.findStartIndexIfNotEdit(this.props.task_data)
        }
    }

    _getItemLayout = (data, index) => ({
        length: panel_width,
        offset: panel_width * index,
        index
    })

    findStartIndexIfNotEdit = (task_data) => {
        let task_data_map = Map(task_data),
            month = task_data_map.getIn(["schedule", "month"]),
            year = task_data_map.getIn(["schedule", "year"]),
            week_index = task_data_map.getIn(["schedule", "noWeekInMonth"]) - 1,
            month_index = this.findMonthIndex(month, year)

        this.chooseWeek(month_index, week_index)

        return month_index
    }

    findStartIndexIfEdit = () => {
        let week_index = this.getNoWeekInMonth(new Date()) - 1,
            month_index = this.findMonthIndex(this.current_month, this.current_year)

        this.chooseWeek(month_index, week_index)

        return month_index
    }

    findMonthIndex = (month, year) => {
        return (year - this.left_end_year) * 12 + month
    }


    componentDidMount() {
        this.initMonthData()
    }

    render() {
        return (

            <View
                style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    position: "relative",
                }}
            >
                <View>
                    <FlatList
                        data={this.month_data}
                        extraData={this.state.should_flatlist_update}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        snapToInterval={338}
                        snapToAlignment="start"
                        getItemLayout={this._getItemLayout}
                        initialScrollIndex={this.start_index}
                        ref={this._setRef}
                        initialNumToRender={5}
                        windowSize={5}
                    />
                </View>
                <View
                    style={{
                        position: "absolute",
                        top: margin_top_for_month_year_text + 21 + margin_top_for_calendar_row,
                        flexDirection: "row",
                        alignItems: "center",
                        left: 5,
                        right: 5,
                    }}
                >
                    <WeekText text="Week" />
                    <DayText text="M" />
                    <DayText text="T" />
                    <DayText text="W" />
                    <DayText text="T" />
                    <DayText text="F" />
                    <DayText text="S" />
                    <DayText text="S" />
                </View>
            </View>
        )
    }
}

class MonthHolder extends React.Component {
    month_names = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    days_in_month_data = []

    weeks_in_month_data = []

    state = {
        should_flatlist_update: 0,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.month_index === nextProps.current_month_index || this.props.month_index === nextProps.last_month_index
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

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday = this.getMonday(date).getDate()
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7)).getDate()

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    _keyExtractor = (item, index) => `day-type-calendar-${item[0].week}-${item[0].month}-${item[0].year}-${index}`

    _renderItem = ({ item, index }) => {
        return (
            <WeekRowHolder
                week_data={item}
                week_index={index}
                chooseWeek={this.props.chooseWeek}
                month_index={this.props.month_index}
                findMonthIndex={this.props.findMonthIndex}
                scrollToMonth={this.props.scrollToMonth}
                current_week_index={this.props.current_week_index}
                last_week_index={this.props.last_week_index}
                present_month_index={this.props.present_month_index}
            />
        )
    }

    _returnToCurrentMonth = () => {
        this.props.scrollToMonth(this.props.present_month_index)
    }

    componentDidMount() {
        let { month, year } = this.props.data,
            first_day_of_month = new Date(year, month, 1),
            number_of_days_from_last_month = first_day_of_month.getDay() === 0 ? 6 : first_day_of_month.getDay() - 1,
            first_day_from_last_month = new Date(first_day_of_month),

            last_day_of_month = new Date(year, month + 1, 0),
            number_of_days_from_next_month = last_day_of_month.getDay() === 0 ? 0 : 7 - last_day_of_month.getDay(),
            last_day_from_next_month = new Date(last_day_of_month)


        first_day_from_last_month.setDate(first_day_of_month.getDate() - number_of_days_from_last_month)
        last_day_from_next_month.setDate(last_day_of_month.getDate() + number_of_days_from_next_month)

        let start_timestamp = first_day_from_last_month.getTime(),
            end_timestamp = this.getMonday(last_day_from_next_month).getTime(),
            tracking_timestamp = start_timestamp,
            number_of_weeks = Math.floor((end_timestamp - start_timestamp) / (7 * 86400 * 1000)) + 1

        for (let noWeekInMonth = 1; noWeekInMonth <= number_of_weeks; noWeekInMonth++) {
            let monday = this.getMonday(tracking_timestamp).getTime()

            let data = []

            data.push({
                week: this.getWeek(new Date(monday)),
                month: new Date(monday).getMonth(),
                year: new Date(monday).getFullYear(),
                noWeekInMonth: this.getNoWeekInMonth(new Date(monday))
            })

            for (let i = 0; i < 7; i++) {
                let date = new Date(i * 86400 * 1000 + monday)

                if (date.getMonth() !== month) {
                    data.push({
                        unchosen: true,
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    })
                }

                else {
                    data.push({
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    })
                }
            }

            this.weeks_in_month_data.push(data)

            let tracking_date = new Date(tracking_timestamp),
                new_tracking_date = tracking_date

            new_tracking_date.setDate(tracking_date.getDate() + 7)

            tracking_timestamp = new_tracking_date.getTime()
        }

        this.setState(prevState => ({
            should_flatlist_update: !prevState.should_flatlist_update + 1,
        }))
    }

    render() {
        return (
            <View
                style={{
                    width: panel_width,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        marginTop: margin_top_for_month_year_text,
                        flexDirection: "row",
                        alignItems: "center",
                    }}

                    onPress={this._returnToCurrentMonth}
                >
                    <Text
                        style={styles.month_text}
                    >
                        {this.month_names[this.props.data.month]}
                    </Text>

                    <Text
                        style={styles.year_text}
                    >
                        {this.props.data.year}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginTop: margin_top_for_calendar_row + 32,
                        height: calendar_total_height,
                    }}
                >
                    <FlatList
                        data={this.weeks_in_month_data}
                        extraData={this.state.should_flatlist_update}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }
}

class WeekRowHolder extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.week_index === nextProps.current_week_index && this.props.month_index === nextProps.current_month_index)
            || (this.props.week_index === nextProps.last_week_index && this.props.month_index === nextProps.current_month_index)
            || (this.props.week_index === nextProps.last_week_index && this.props.month_index === nextProps.last_month_index)
    }

    state = {
        should_flatlist_update: 0
    }

    _keyExtractor = (item, index) => `week-type-calendar-week-row-${item.week}-${item.day}-${item.month}-${item.year}`

    _renderItem = ({ item, index }) => {
        if (item.week) {
            return (
                <WeekHolder
                    week_row_data={item}
                />
            )
        }

        else {
            if (item.unchosen) {
                return (
                    <UnchosenDayHolder
                        week_row_data={item}
                    />
                )
            }

            else {
                return (
                    <DayHolder
                        week_row_data={item}
                    />
                )
            }
        }
    }


    render() {
        return (
            <TouchableOpacity
                style={{
                    width: panel_width - 10,
                    marginTop: margin_top_for_calendar_row,
                }}
            >
                <FlatList
                    data={this.props.week_data}
                    extraData={this.state.should_flatlist_update}
                    numColumns={8}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </TouchableOpacity>
        )
    }
}

class WeekHolder extends React.Component {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    height: 32,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>
                    {this.props.week_row_data.week}
                </Text>
            </View>
        )
    }
}

class DayHolder extends React.Component {

    state = {
        round_day_container_style: styles.not_chosen_round_day_container,
        day_text_style: styles.not_chosen_day_text
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.current_day_index === this.props.day_index && nextProps.current_month_index === this.props.month_index)
            || (nextProps.last_day_index === this.props.day_index && nextProps.last_month_index === this.props.month_index)
            || (nextProps.last_day_index === this.props.day_index && nextProps.current_month_index === this.props.month_index)
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.current_day_index === nextProps.day_index && nextProps.current_month_index === nextProps.month_index) {
    //         if (nextProps.data.day === nextProps.current_day &&
    //             nextProps.data.month === nextProps.current_month &&
    //             nextProps.data.year === nextProps.current_year
    //         ) {
    //             return ({
    //                 round_day_container_style: styles.chosen_round_day_container,
    //                 day_text_style: styles.chosen_day_text
    //             })
    //         }
    //         return ({
    //             round_day_container_style: styles.chosen_round_day_container,
    //             day_text_style: styles.chosen_day_text
    //         })
    //     }

    //     else if (nextProps.last_day_index === nextProps.day_index && nextProps.last_month_index === nextProps.month_index) {
    //         if (nextProps.data.day === nextProps.current_day &&
    //             nextProps.data.month === nextProps.current_month &&
    //             nextProps.data.year === nextProps.current_year
    //         ) {
    //             return ({
    //                 round_day_container_style: styles.not_chosen_round_day_container,
    //                 day_text_style: styles.chosen_day_text
    //             })
    //         }
    //         return ({
    //             round_day_container_style: styles.not_chosen_round_day_container,
    //             day_text_style: styles.not_chosen_day_text
    //         })
    //     }

    //     else if (nextProps.last_day_index === nextProps.day_index && nextProps.current_month_index === nextProps.month_index) {
    //         if (nextProps.data.day === nextProps.current_day &&
    //             nextProps.data.month === nextProps.current_month &&
    //             nextProps.data.year === nextProps.current_year
    //         ) {
    //             return ({
    //                 round_day_container_style: styles.not_chosen_round_day_container,
    //                 day_text_style: styles.chosen_day_text
    //             })
    //         }
    //         return ({
    //             round_day_container_style: styles.not_chosen_round_day_container,
    //             day_text_style: styles.not_chosen_day_text
    //         })
    //     }

    //     else {
    //         if (nextProps.data.day === nextProps.current_day &&
    //             nextProps.data.month === nextProps.current_month &&
    //             nextProps.data.year === nextProps.current_year
    //         ) {
    //             return ({
    //                 round_day_container_style: styles.not_chosen_round_day_container,
    //                 day_text_style: styles.chosen_day_text
    //             })
    //         }
    //     }

    //     return null
    // }

    render() {
        return (
            <View
                style={styles.day_holder_container}
            >
                <View
                    style={this.state.round_day_container_style}
                >
                    <Text
                        style={this.state.day_text_style}
                    >
                        {this.props.week_row_data.day}
                    </Text>
                </View>
            </View>
        )
    }
}

class UnchosenDayHolder extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <View
                style={styles.day_holder_container}
            >
                <Text
                    style={styles.cannot_choose_day_text}
                >
                    {this.props.week_row_data.day}
                </Text>
            </View>
        )
    }
}


class DayText extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    height: 32,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={styles.day_text_absolute}
                >
                    {this.props.text}
                </Text>
            </View>
        )
    }
}


class WeekText extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    height: 32,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={styles.week_text_absolute}
                >
                    {this.props.text}
                </Text>
            </View>
        )
    }
}