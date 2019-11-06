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

import { Map, fromJS } from 'immutable'

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
    chosen_monday = -1
    chosen_sunday = -1
    chosen_week = -1
    chosen_start_month = -1
    chosen_end_month = -1
    chosen_selected_month = -1
    chosen_start_year = -1
    chosen_end_year = -1
    chosen_selected_year = -1
    chosen_start_noWeekInMonth = -1
    chosen_end_noWeekInMonth = -1

    calendar_scale_value = new Animated.Value(0.3)
    calendar_opacity_value = new Animated.Value(0.3)

    save = () => {

        if (this.chosen_monday > 0
            && this.chosen_sunday > 0
            && this.chosen_week > 0
            && this.chosen_start_month > 0
            && this.chosen_end_month > 0
            && this.chosen_selected_month > 0
            && this.chosen_start_year > 0
            && this.chosen_end_year > 0
            && this.chosen_selected_year > 0
            && this.chosen_start_noWeekInMonth > 0
            && this.chosen_end_noWeekInMonth > 0) {

            if (this.props.edit) {
                let keyPath = ["schedule"],
                    notSetValue = {},
                    updater = (value) => fromJS({
                        monday: this.chosen_monday,
                        sunday: this.chosen_sunday,
                        week: this.chosen_week,
                        start_month: this.chosen_start_month,
                        end_month: this.chosen_end_month,
                        chosen_month: this.chosen_selected_month,
                        start_year: this.chosen_start_year,
                        end_year: this.chosen_end_year,
                        chosen_year: this.chosen_selected_year,
                        start_noWeekInMonth: this.chosen_start_noWeekInMonth,
                        end_noWeekInMonth: this.chosen_end_noWeekInMonth
                    })

                this.props._editFieldData(keyPath, notSetValue, updater)
            }

            else {
                this._updateTask(
                    this.chosen_monday,
                    this.chosen_sunday,
                    this.chosen_week,
                    this.chosen_start_month,
                    this.chosen_end_month,
                    this.chosen_selected_month,
                    this.chosen_start_year,
                    this.chosen_end_year,
                    this.chosen_selected_year,
                    this.chosen_start_noWeekInMonth,
                    this.chosen_end_noWeekInMonth
                )
            }
        }


        this.props.hideAction()
    }

    cancel = () => {
        this.props.hideAction()
    }

    setData = (monday, sunday, week, start_month, end_month, chosen_month, start_year, end_year, chosen_year, start_noWeekInMonth, end_noWeekInMonth) => {
        this.chosen_monday = monday
        this.chosen_sunday = sunday
        this.chosen_week = week
        this.chosen_start_month = start_month
        this.chosen_end_month = end_month
        this.chosen_selected_month = chosen_month
        this.chosen_start_year = start_year
        this.chosen_end_year = end_year
        this.chosen_selected_year = chosen_year
        this.chosen_start_noWeekInMonth = start_noWeekInMonth
        this.chosen_end_noWeekInMonth = end_noWeekInMonth
    }

    _updateTask = (monday, sunday, week, start_month, end_month, chosen_month, start_year, end_year, chosen_year, start_noWeekInMonth, end_noWeekInMonth) => {
        this.props.updateTaskSchedule({
            monday, sunday, week, start_month, end_month, chosen_month, start_year, end_year, chosen_year, start_noWeekInMonth, end_noWeekInMonth
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
                        edit_task_data={this.props.edit_task_data}
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
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday_timestamp = this.getMonday(date).getTime()
        let first_monday_of_month_timestamp = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

        return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
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
            this.start_index = this.findStartIndex(this.props.edit_task_data)
        }

        else {
            this.start_index = this.findStartIndex(this.props.task_data)
        }
    }

    _getItemLayout = (data, index) => ({
        length: panel_width,
        offset: panel_width * index,
        index
    })

    findStartIndex = (task_data) => {
        if (task_data) {
            let task_data_map = Map(task_data),
                chosen_month = task_data_map.getIn(["schedule", "chosen_month"]),
                chosen_year = task_data_map.getIn(["schedule", "chosen_year"]),
                start_month = task_data_map.getIn(["schedule", "start_month"]),
                end_month = task_data_map.getIn(["schedule", "end_month"]),
                start_year = task_data_map.getIn(["schedule", "start_year"]),
                end_year = task_data_map.getIn(["schedule", "end_year"]),
                week_index = task_data_map.getIn(["schedule", "start_noWeekInMonth"]),
                month_index = this.findMonthIndex(chosen_month, chosen_year)

            if (chosen_month === start_month) {
                week_index = task_data_map.getIn(["schedule", "start_noWeekInMonth"]) - 1
            }

            else if (chosen_month === end_month) {
                week_index = task_data_map.getIn(["schedule", "end_noWeekInMonth"]) - 1
            }

            this.chooseWeek(month_index, week_index)

            return month_index
        }

        else {
            let week_index = this.getNoWeekInMonth(new Date()) - 1,
                month_index = this.findMonthIndex(this.current_month, this.current_year)

            this.chooseWeek(month_index, week_index)

            return month_index
        }
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
        let nearest_monday_timestamp = this.getMonday(date).getTime()
        let first_monday_of_month_timestamp = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

        return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
    }

    _keyExtractor = (item, index) => `day-type-calendar-${item[0].week}-${item[0].month}-${item[0].year}-${index}`

    _renderItem = ({ item, index }) => {
        return (
            <WeekRowHolder
                week_data={item}
                week_index={index}

                chooseWeek={this.props.chooseWeek}
                month_index={this.props.month_index}

                current_month_index={this.props.current_month_index}
                last_month_index={this.props.last_month_index}

                current_week_index={this.props.current_week_index}
                last_week_index={this.props.last_week_index}

                setData={this.props.setData}
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
                day: new Date(monday).getDate(),
                month,
                year,
                noWeekInMonth
            })

            for (let i = 0; i < 7; i++) {
                let date = new Date(i * 86400 * 1000 + monday)

                if (date.getMonth() !== month) {
                    data.push({
                        unchosen: true,
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        noWeekInMonth: this.getNoWeekInMonth(date),
                    })
                }

                else {
                    data.push({
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        noWeekInMonth: this.getNoWeekInMonth(date),
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
            should_flatlist_update: prevState.should_flatlist_update + 1,
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.month_index === this.props.current_month_index && this.props.current_week_index !== prevProps.current_week_index) {
            this.setState(prevState => ({
                should_flatlist_update: prevState.should_flatlist_update + 1,
            }))
        }

        if (this.props.month_index === this.props.last_month_index && this.props.current_month_index !== prevProps.current_month_index) {
            this.setState(prevState => ({
                should_flatlist_update: prevState.should_flatlist_update + 1,
            }))
        }
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

    state = {
        is_chosen: false,
        is_present: false,
        container_style: styles.not_chosen_week_row_container,
        should_flatlist_update: 0,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.week_index === nextProps.current_week_index && this.props.month_index === nextProps.current_month_index)
            || (this.props.week_index === nextProps.last_week_index && this.props.month_index === nextProps.current_month_index)
            || (this.props.week_index === nextProps.last_week_index && this.props.month_index === nextProps.last_month_index)
            || (this.state.should_flatlist_update !== nextState.should_flatlist_update)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.week_index === nextProps.current_week_index && nextProps.month_index === nextProps.current_month_index) {
            return ({
                container_style: styles.chosen_week_row_container,
                should_flatlist_update: prevState.should_flatlist_update + 1,
                is_chosen: true
            })
        }

        else if (nextProps.week_index === nextProps.last_week_index && nextProps.month_index === nextProps.current_month_index) {
            return ({
                container_style: styles.not_chosen_week_row_container,
                should_flatlist_update: prevState.should_flatlist_update + 1,
                is_chosen: false
            })
        }

        else if (nextProps.week_index === nextProps.last_week_index && nextProps.month_index === nextProps.last_month_index) {
            return ({
                container_style: styles.not_chosen_week_row_container,
                should_flatlist_update: prevState.should_flatlist_update + 1,
                is_chosen: false
            })
        }

        return null
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
        let nearest_monday_timestamp = this.getMonday(date).getTime()
        let first_monday_of_month_timestamp = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

        return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
    }

    _keyExtractor = (item, index) => `week-type-calendar-week-row-${item.week}-${item.day}-${item.month}-${item.year}`

    _renderItem = ({ item, index }) => {
        if (item.week) {
            return (
                <WeekHolder
                    week_row_data={item}
                    is_chosen={this.state.is_chosen}
                />
            )
        }

        else {
            if (item.unchosen) {
                return (
                    <UnchosenDayHolder
                        week_row_data={item}
                        is_chosen={this.state.is_chosen}
                    />
                )
            }

            else {
                return (
                    <DayHolder
                        week_row_data={item}
                        is_chosen={this.state.is_chosen}
                        is_present={this.state.is_present}
                    />
                )
            }
        }
    }

    _chooseWeekRow = () => {
        let { week, month: chosen_month, year: chosen_year } = this.props.week_data[0]
        let { day: monday, month: start_month, year: start_year, noWeekInMonth: start_noWeekInMonth } = this.props.week_data[1]
        let { day: sunday, month: end_month, year: end_year, noWeekInMonth: end_noWeekInMonth } = this.props.week_data[this.props.week_data.length - 1]
        this.props.setData(monday, sunday, week, start_month, end_month, chosen_month, start_year, chosen_year, end_year, start_noWeekInMonth, end_noWeekInMonth)

        this.props.chooseWeek(this.props.month_index, this.props.week_index)
    }

    componentDidMount() {
        let date = new Date(),
            monday = this.getMonday(date),
            day = monday.getDate(),
            week = this.getWeek(monday),
            month = monday.getMonth(),
            year = monday.getFullYear(),
            noWeekInMonth = this.getNoWeekInMonth(monday)

        if (day === this.props.week_data[0].day
            && week === this.props.week_data[0].week
            && month === this.props.week_data[0].month
            && year === this.props.week_data[0].year
            && noWeekInMonth === this.props.week_data[0].noWeekInMonth) {

            this.setState(prevState => ({
                is_present: true,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={this.state.container_style}
                onPress={this._chooseWeekRow}
            >
                <FlatList
                    data={this.props.week_data}
                    extraData={this.state.should_flatlist_update}
                    numColumns={8}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    scrollEnabled={false}
                />
            </TouchableOpacity>
        )
    }
}

class WeekHolder extends React.Component {

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
                    style={styles.week_text}
                >
                    {this.props.week_row_data.week}
                </Text>
            </View>
        )
    }
}

class DayHolder extends React.PureComponent {

    state = {
        round_day_container_style: styles.not_chosen_round_day_container,
    }

    render() {
        let day_text_style = styles.not_chosen_day_text
        if (this.props.is_present) {
            day_text_style = styles.chosen_day_text
        }
        else {
            if (this.props.is_chosen) {
                day_text_style = styles.chosen_day_text
            }

            else {
                day_text_style = styles.not_chosen_day_text
            }
        }

        return (
            <View
                style={styles.day_holder_container}
            >
                <View
                    style={this.state.round_day_container_style}
                >
                    <Text
                        style={day_text_style}
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