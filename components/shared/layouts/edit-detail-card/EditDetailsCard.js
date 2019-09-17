import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ImageBackground, Dimensions, Image, TextInput, Modal as RNModal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import DayCalendar from '../calendar/day-calendar/DayCalendar.Container'
import WeekCalendar from '../calendar/week-calendar/WeekCalendar.Container'
import MonthCalendar from '../calendar/month-calendar/MonthCalendar.Container'
import Category from '../category/Category.Container'
import Priority from '../priority/Priority.Container'
import Repeat from '../repeat/Repeat.Container'
import Goal from '../goal/Goal.Container'

import { Map } from 'immutable'

export default class EditDetails extends React.PureComponent {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    edit_task = {}
    calendar_text = ""
    category = ""
    priority = ""
    priority_id = ""
    repeat = ""
    goal = ""

    category_key = ""

    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    state = {
        title_value: "",
        description_value: "",
        should_visible: false,

        edit_calendar: false,
        edit_category: false,
        edit_repeat: false,
        edit_priority: false,
        edit_goal: false,

        should_update: 0,

        agree_on_changing_priority_history: false
    }


    toggleAgreeOnChangingPriorityHistory = () => {
        this.setState(prevState => ({
            agree_on_changing_priority_history: !prevState.agree_on_changing_priority_history
        }))
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

    _onChangeTitle = (e) => {
        this.setState({
            title_value: e.nativeEvent.text
        })
    }

    _onChangeDescription = (e) => {
        this.setState({
            description_value: e.nativeEvent.text
        })
    }

    toggleShouldVisible = () => {
        this.setState(prevState => ({
            should_visible: !prevState.should_visible
        }))
    }

    disableAllTabBools = () => {
        this.setState({
            edit_calendar: false,
            edit_category: false,
            edit_repeat: false,
            edit_priority: false,
            edit_goal: false,
        })
    }

    toggleAction = (name) => {
        this.toggleShouldVisible()
        this.disableAllTabBools()

        if (name === "calendar") {
            this.setState({
                edit_calendar: true
            })
        }

        else if (name === "category") {
            this.setState({
                edit_category: true
            })
        }

        else if (name === "repeat") {
            this.setState({
                edit_repeat: true
            })
        }

        else if (name === "priority") {
            this.setState({
                edit_priority: true
            })
        }

        else {
            this.setState({
                edit_goal: true
            })
        }
    }

    setEditTask = (data) => {
        this.edit_task = { ... this.edit_task, ...data }

        this.renderData(this.edit_task)
    }

    // change the current property of today timestamp, previous timestamp untouched.
    updateOnStatsDataFromNowOn = (timestamp, new_priority_id, current_value) => {
        let stats_map = Map(this.props.stats),
            data = {}

        if (stats_map.has(timestamp)) {
            data = stats_map.get(timestamp)

            let { current } = data

            current[this.priority_order[this.priority_id]] -= current_value

            if (current[this.priority_order[this.priority_id]] < 0) {
                current[this.priority_order[this.priority_id]] = 0
            }

            current[this.priority_order[new_priority_id]] += current_value

            data.current = current
        }

        return data
    }

    // From now on
    updateOnChartStatsDataFromNowOn = (new_priority_id, chart_stats_map, timestamp, key, current_value) => {
        let data = {}

        if (chart_stats_map.has(timestamp)) {
            data = chart_stats_map.get(timestamp)

            if (data.hasOwnProperty(key)) {
                let { current } = data[key]

                current[this.priority_order[this.priority_id]] -= current_value

                if (current[this.priority_order[this.priority_id]] < 0) {
                    current[this.priority_order[this.priority_id]] = 0
                }

                current[this.priority_order[new_priority_id]] += current_value

                data[key].current = current
            }
        }

        return data
    }
    // Start from now on
    updatePriorityInCompletedTasksFromNowOn = (task_id, type, date, stats_timestamp, new_priority_value) => {
        let completed_tasks_map = Map(this.props.completed_tasks)

        if (completed_tasks_map.has(task_id)) {
            let completed_data = completed_tasks_map.get(task_id)

            if (type === "day") {
                if (completed_data.hasOwnProperty(stats_timestamp)) {
                    completed_data[stats_timestamp].priority_value = new_priority_value
                }
            }

            else if (type === "week") {
                let day_in_week = date.getDay()

                if (completed_data.hasOwnProperty(stats_timestamp)) {
                    completed_data[stats_timestamp].priority_value = new_priority_value

                    if (completed_data[stats_timestamp].hasOwnProperty("priority_value_array")) {
                        let { priority_value_array } = completed_data[stats_timestamp]

                        if (day_in_week === 0) {
                            priority_value_array[day_in_week] = new_priority_value
                        }

                        else {
                            for (let i = day_in_week; i <= 7; i++) {
                                let index = i % 7

                                priority_value_array[index] = new_priority_value
                            }
                        }


                        completed_data[stats_timestamp].priority_value_array = priority_value_array
                    }
                }
            }

            else {
                let day_in_month = date.getDate(),
                    last_day_in_month = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

                if (completed_data.hasOwnProperty(stats_timestamp)) {
                    completed_data[stats_timestamp].priority_value = new_priority_value

                    if (completed_data[stats_timestamp].hasOwnProperty("priority_value_array")) {
                        let { priority_value_array } = completed_data[stats_timestamp]

                        for (let i = day_in_month; i <= last_day_in_month; i++) {
                            let index = i - 1

                            priority_value_array[index] = new_priority_value
                        }

                        completed_data[stats_timestamp].priority_value_array = priority_value_array
                    }
                }
            }
        }
    }

    returnTaskGoalCurrentValue = (task_id, stats_timestamp) => {
        let completed_tasks_map = Map(this.props.completed_tasks)

        if (completed_tasks_map.has(task_id)) {
            let data = completed_tasks_map.get(task_id)
            if (data.hasOwnProperty(stats_timestamp)) {
                return data[stats_timestamp].current
            }
        }

        return 0
    }

    updateOnStatsAndChartsDataAllTime = (task_id, type, new_priority_value) => {
        let completed_tasks_map = Map(this.props.completed_tasks),
            stats_map = Map(this.props.stats),
            week_chart_stats_map = Map(this.props.week_chart_stats),
            month_chart_stats_map = Map(this.props.month_chart_stats),
            year_chart_stats_map = Map(this.props.year_chart_stats)

        if (completed_tasks_map.has(task_id)) {
            let completed_task_data = completed_tasks_map.get(task_id)

            for (let key in completed_task_data) {
                if (completed_task_data.hasOwnProperty(key) && key !== "id" && key !== "category" && key !== "priority_value") {
                    let completed_timestamp = parseInt(key),
                        completed_data = completed_task_data[key]

                    if (type === "day") {
                        let current_value = completed_data.current,
                            old_priority_value = completed_data.priority_value,
                            near_monday = this.getMonday(completed_timestamp),
                            day_in_week = new Date(completed_timestamp).getDay(),
                            year = new Date(completed_timestamp).getFullYear(),
                            month = new Date(completed_timestamp).getMonth(),
                            day = new Date(completed_timestamp).getDate(),
                            week_completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                            month_completed_timestamp = new Date(year, month).getTime()

                        if (stats_map.has(completed_timestamp)) {
                            let data = stats_map.get(completed_timestamp),
                                { current } = data

                            current[this.priority_order[new_priority_value]] += current_value

                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            data.current = current

                            stats_map.set(completed_timestamp, data)
                        }

                        if (week_chart_stats_map.has(week_completed_timestamp)) {
                            let data = week_chart_stats_map.get(week_completed_timestamp)

                            if (data.hasOwnProperty(day_in_week)) {
                                let { current } = data[day_in_week]

                                current[this.priority_order[new_priority_value]] += current_value

                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data[day_in_week].current = current

                                week_chart_stats_map.set(week_completed_timestamp, data)
                            }
                        }

                        if (month_chart_stats_map.has(month_completed_timestamp)) {
                            let data = month_chart_stats_map.get(month_completed_timestamp)

                            if (data.hasOwnProperty(day)) {
                                let { current } = data[day]

                                current[this.priority_order[new_priority_value]] += current_value

                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data[day].current = current

                                month_chart_stats_map.set(month_completed_timestamp, data)
                            }
                        }

                        if (year_chart_stats_map.has(year)) {
                            let data = year_chart_stats_map.get(year)

                            if (data.hasOwnProperty(month)) {
                                let { current } = data[month]

                                current[this.priority_order[new_priority_value]] += current_value

                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data[month].current = current

                                year_chart_stats_map.set(year, data)
                            }
                        }
                    }

                    else if (type === "week") {
                        if (completed_task_data[key].hasOwnProperty("day_completed_array") && completed_task_data[key].hasOwnProperty("priority_value_array")) {
                            let { day_completed_array, priority_value_array } = completed_task_data[key]

                            day_completed_array.forEach((value, index) => {
                                let i = index
                                if (i === 0) i = 7

                                let date = new Date(completed_timestamp + (i - 1) * 86400 * 1000),
                                    day = date.getDate(),
                                    month = date.getMonth(),
                                    year = date.getFullYear(),
                                    month_timestamp = new Date(year, month).getTime(),
                                    old_priority_value = priority_value_array[index]

                                if (stats_map.has(completed_timestamp)) {
                                    let stats_data = stats_map.get(completed_timestamp),
                                        { current } = stats_data

                                    current[this.priority_order[new_priority_value]] += value

                                    current[this.priority_order[old_priority_value]] -= value

                                    if (current[this.priority_order[old_priority_value]] < 0) {
                                        current[this.priority_order[old_priority_value]] = 0
                                    }

                                    stats_data.current = current

                                    stats_map.set(completed_timestamp, stats_data)
                                }

                                if (week_chart_stats_map.has(completed_timestamp)) {
                                    let data = week_chart_stats_map.get(completed_timestamp)

                                    if (data.hasOwnProperty(index)) {
                                        let { current } = data[index]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        data[index].current = current

                                        week_chart_stats_map.set(completed_timestamp, data)
                                    }
                                }

                                if (month_chart_stats_map.has(month_timestamp)) {
                                    let data = month_chart_stats_map.get(month_timestamp)

                                    if (data.hasOwnProperty(day)) {
                                        let { current } = data[day]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        data[day].current = current

                                        month_chart_stats_map.set(month_timestamp, data)
                                    }
                                }

                                if (year_chart_stats_map.has(year)) {
                                    let data = year_chart_stats_map.get(year)

                                    if (data.hasOwnProperty(month)) {
                                        let { current } = data[month]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        data[month].current = current

                                        year_chart_stats_map.set(year, data)
                                    }
                                }
                            })
                        }
                    }

                    else {
                        let completed_month = new Date(completed_timestamp).getMonth(),
                            completed_year = new Date(completed_timestamp).getFullYear()

                        if (completed_task_data[key].hasOwnProperty("day_completed_array") && completed_task_data[key].hasOwnProperty("priority_value_array")) {
                            if (completed_task_data[key].hasOwnProperty("day_completed_array") && completed_task_data[key].hasOwnProperty("priority_value_array")) {
                                let { day_completed_array, priority_value_array } = completed_task_data[key]

                                day_completed_array.forEach((value, index) => {
                                    let day = index + 1,
                                        date = new Date(completed_year, completed_month, day),
                                        near_monday = this.getMonday(date),
                                        completed_week_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                                        day_in_week = date.getDay(),
                                        old_priority_value = priority_value_array[index]


                                    if (stats_map.has(completed_timestamp)) {
                                        let stats_data = stats_map.get(completed_timestamp),
                                            { current } = stats_data

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        stats_data.current = current

                                        stats_map.set(completed_timestamp, stats_data)
                                    }

                                    if (week_chart_stats_map.has(completed_week_timestamp)) {
                                        let data = week_chart_stats_map.get(completed_week_timestamp)

                                        if (data.hasOwnProperty(day_in_week)) {
                                            let { current } = data[day_in_week]

                                            current[this.priority_order[new_priority_value]] += value

                                            current[this.priority_order[old_priority_value]] -= value

                                            if (current[this.priority_order[old_priority_value]] < 0) {
                                                current[this.priority_order[old_priority_value]] = 0
                                            }

                                            data[day_in_week].current = current

                                            week_chart_stats_map.set(completed_week_timestamp, data)
                                        }
                                    }


                                    if (month_chart_stats_map.has(completed_timestamp)) {
                                        let data = month_chart_stats_map.get(completed_timestamp)

                                        if (data.hasOwnProperty(day)) {
                                            let { current } = data[day]

                                            current[this.priority_order[new_priority_value]] += value

                                            current[this.priority_order[old_priority_value]] -= value

                                            if (current[this.priority_order[old_priority_value]] < 0) {
                                                current[this.priority_order[old_priority_value]] = 0
                                            }

                                            data[day].current = current

                                            month_chart_stats_map.set(completed_timestamp, data)
                                        }
                                    }

                                    if (year_chart_stats_map.has(completed_year)) {
                                        let data = year_chart_stats_map.get(completed_year)

                                        if (data.hasOwnProperty(completed_month)) {
                                            let { current } = data[completed_month]

                                            current[this.priority_order[new_priority_value]] += value

                                            current[this.priority_order[old_priority_value]] -= value

                                            if (current[this.priority_order[old_priority_value]] < 0) {
                                                current[this.priority_order[old_priority_value]] = 0
                                            }

                                            data[completed_month].current = current

                                            year_chart_stats_map.set(completed_year, data)
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            }
        }

        return ({
            stats: stats_map,

            week_chart_stats: week_chart_stats_map,
            month_chart_stats: month_chart_stats_map,
            year_chart_stats: year_chart_stats_map,
        })
    }

    doChangesOnStatsAndChartsFromNowOn = () => {

    }

    doChangesOnStatsAndChartsAllTime = () => {
        let stats,
            week_chart_stats,
            month_chart_stats,
            year_chart_stats,
            sending_obj = {}

        let result_obj = this.updateOnStatsAndChartsDataAllTime(this.edit_task.id, this.edit_task.type, this.edit_task.priority.value)

        stats = result_obj.stats.toMap()
        week_chart_stats = result_obj.week_chart_stats.toMap()
        month_chart_stats = result_obj.month_chart_stats.toMap()
        year_chart_stats = result_obj.year_chart_stats.toMap()

        sending_obj = {
            edit_task: this.edit_task,
            stats,
            week_chart_stats,
            month_chart_stats,
            year_chart_stats
        }
    }

    save = () => {
        let new_priority_id = this.edit_task.priority.value,
            new_category_key = this.edit_task.category,
            old_category_data = {},
            new_category_data = {},
            current_value = 0,
            should_update_category = false,
            update_category_data = {},
            should_update_stats = false,
            update_stats_data = {},
            update_chart_stats_data = {},
            should_update_chart_stats = {
                week: false,
                month: false,
                year: false
            },
            sending_obj = {
                edit_task: this.edit_task,
                should_update_category,
                update_category_data,
                should_update_stats,
                update_stats_data,
                should_update_chart_stats,
                update_chart_stats_data
            }

        // Only do update if the category is changed
        if (this.category_key !== new_category_key) {
            should_update_category = true

            //Decrease old category's quantity
            old_category_data = { ...this.props.categories[this.category_key] }
            old_category_data.quantity -= 1

            //Increase new category's quantity
            new_category_data = { ...this.props.categories[new_category_key] }
            new_category_data.quantity += 1

            if (new_category_data.quantity < 0) {
                new_category_data.quantity = 0
            }

            update_category_data = {
                new_category_key,
                new_category_data,
                old_category_key: this.category_key,
                old_category_data
            }

            sending_obj.should_update_category = should_update_category
            sending_obj.update_category_data = update_category_data
        }

        // do update on stats and chart_stats when priority is changed
        if (this.priority_id !== new_priority_id) {
            should_update_stats = true

            let stats_action_type = "",
                date = new Date(),
                stats_timestamp = 0,
                week_chart_timestamp = new Date(this.getMonday(date).getFullYear(), this.getMonday(date).getMonth(), this.getMonday(date).getDate()).getTime(),
                month_chart_timestamp = new Date(date.getFullYear(), date.getMonth()).getTime(),
                year_chart_timestamp = date.getFullYear()

            if (this.props.type === "day") {
                stats_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
                stats_action_type = "UPDATE_DAY_STATS"
            }

            else if (this.props.type === "week") {
                stats_timestamp = new Date(this.getMonday(date).getFullYear(), this.getMonday(date).getMonth(), this.getMonday(date).getDate()).getTime()
                stats_action_type = "UPDATE_WEEK_STATS"
            }

            else {
                stats_timestamp = new Date(date.getFullYear(), date.getMonth()).getTime()
                stats_action_type = "UPDATE_MONTH_STATS"
            }

            current_value = this.returnTaskGoalCurrentValue(this.edit_task.id, stats_timestamp)

            let stats_data = this.updateOnStatsDataFromNowOn(stats_timestamp, new_priority_id, current_value)

            // Only update if there is an existing obj.
            if (Object.keys(stats_data).length > 0) {
                should_update_stats = true
            }

            sending_obj.should_update_stats = should_update_stats

            update_stats_data = {
                stats_action_type,
                stats_timestamp,
                stats_data
            }

            let week_chart_stats_data = this.updateOnChartStatsDataFromNowOn(new_priority_id, Map(this.props.week_chart_stats), week_chart_timestamp, date.getDay(), current_value),
                month_chart_stats_data = this.updateOnChartStatsDataFromNowOn(new_priority_id, Map(this.props.month_chart_stats), month_chart_timestamp, date.getDate(), current_value),
                year_chart_stats_data = this.updateOnChartStatsDataFromNowOn(new_priority_id, Map(this.props.year_chart_stats), year_chart_timestamp, date.getMonth(), current_value)


            if (Object.keys(week_chart_stats_data).length > 0) {
                should_update_chart_stats.week = true
            }

            if (Object.keys(month_chart_stats_data).length > 0) {
                should_update_chart_stats.month = true
            }

            if (Object.keys(year_chart_stats_data).length > 0) {
                should_update_chart_stats.year = true
            }

            sending_obj.should_update_chart_stats = should_update_chart_stats

            update_chart_stats_data = {
                week_chart_stats_action_type: "UPDATE_WEEK_CHART_STATS",
                month_chart_stats_action_type: "UPDATE_MONTH_CHART_STATS",
                year_chart_stats_action_type: "UPDATE_YEAR_CHART_STATS",

                week_chart_timestamp,
                month_chart_timestamp,
                year_chart_timestamp,

                week_chart_stats_data,
                month_chart_stats_data,
                year_chart_stats_data
            }

            sending_obj.update_stats_data = update_stats_data
            sending_obj.update_chart_stats_data = update_chart_stats_data
        }

        this.props.editThunkFromNowOn(sending_obj)
        this.cancel()
    }

    cancel = () => {
        this.props.hideAction()
    }

    renderData = (edit_task) => {
        let { category, repeat, priority, goal, startTime, schedule } = edit_task

        let date = new Date(startTime)

        this.category = this.props.categories[category].name
        this.priority = this.props.priorities[priority.value].name
        this.goal = `${goal.max} times`

        if (this.props.type === "day") {

            this.calendar_text = `${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`

            if (repeat.type === "daily") {
                this.repeat = `Every ${repeat.interval.value} day(s)`
            }

            else if (repeat.type === "weekly") {
                this.repeat = `Every ${repeat.interval.value} week(s)`
            }

            else {
                this.repeat = `Every ${repeat.interval.value} month(s)`
            }
        }

        else if (this.props.type === "week") {

            this.calendar_text = `Week ${schedule.week} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`

            if (repeat.type === "weekly-w") {
                this.repeat = `Every ${repeat.interval.value} week(s)`
            }

            else {
                this.repeat = `Every ${repeat.interval.value} month(s)`
            }

        }

        else {
            this.calendar_text = `${this.monthNames[schedule.month]} ${schedule.year}`

            this.repeat = `Every ${repeat.interval.value} month(s)`

        }

        this.setState(prevState => ({
            should_update: prevState.should_update + 1,
        }))
    }

    componentDidMount() {
        this.edit_task = this.props.task_data

        this.category_key = this.edit_task.category
        this.priority_id = this.edit_task.priority.value

        let { title, description } = this.edit_task

        this.setState({
            title_value: title,
            description_value: description ? description : "",
        })

        this.renderData(this.edit_task)
    }

    render() {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 58,
                        paddingHorizontal: 30,
                        position: "relative",
                    }}
                >
                    <View
                        style={{
                            borderBottomColor: "gainsboro",
                            borderBottomWidth: 1,
                            height: 65,
                            marginBottom: 18,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                lineHeight: 15,
                                color: "rgba(0, 0, 0, 0.25)",
                                marginBottom: 5,
                            }}
                        >
                            Task Title
                            </Text>

                        <TextInput
                            style={{
                                height: 30,
                            }}

                            value={this.state.title_value}
                            onChange={this._onChangeTitle}
                        />
                    </View>

                    <View
                        style={{
                            borderBottomColor: "gainsboro",
                            borderBottomWidth: 1,
                            height: 65,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                lineHeight: 15,
                                color: "rgba(0, 0, 0, 0.25)",
                                marginBottom: 5,
                            }}
                        >
                            Task Description
                            </Text>

                        <TextInput
                            style={{
                                height: 30,
                            }}

                            value={this.state.description_value}
                            onChange={this._onChangeDescription}
                        />
                    </View>

                    <OptionButton
                        content={this.calendar_text}
                        text_color={"black"}
                        toggleAction={this.toggleAction}
                        name={"calendar"}
                    />
                    <OptionButton
                        content={this.category}
                        text_color={"red"}
                        toggleAction={this.toggleAction}
                        name={"category"}
                    />

                    <OptionButton
                        content={this.priority}
                        text_color={"red"}
                        toggleAction={this.toggleAction}
                        name={"priority"}
                    />

                    <OptionButton
                        content={this.repeat}
                        text_color={"black"}
                        toggleAction={this.toggleAction}
                        name={"repeat"}
                    />

                    <OptionButton
                        content={this.goal}
                        text_color={"black"}
                        toggleAction={this.toggleAction}
                        name={"goal"}
                    />

                    <View
                        style={{
                            position: "absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bottom: 100,
                            left: 30,
                            right: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 135,
                                height: 48,
                                borderRadius: 30,
                                backgroundColor: "gainsboro",
                                alignItems: "center",
                                justifyContent: "center",
                            }}

                            onPress={this.cancel}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                Cancel
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 135,
                                height: 48,
                                borderRadius: 30,
                                backgroundColor: "black",
                                alignItems: "center",
                                justifyContent: "center",
                            }}

                            onPress={this.save}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                Save
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <RNModal
                    visible={this.state.should_visible}
                    transparent={true}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <DismissArea
                            toggleShouldVisible={this.toggleShouldVisible}
                        />

                        <>
                            {
                                this.state.edit_calendar ?
                                    <CalendarEdit
                                        edit={true}
                                        task_data={this.edit_task}
                                        hideAction={this.toggleShouldVisible}
                                        setEditTask={this.setEditTask}
                                        type={this.props.type}
                                    />

                                    :

                                    <>
                                        {
                                            this.state.edit_category ?

                                                <Category
                                                    edit={true}
                                                    task_data={this.edit_task}
                                                    hideAction={this.toggleShouldVisible}
                                                    updateTask={this.setEditTask}
                                                />

                                                :

                                                <>
                                                    {
                                                        this.state.edit_priority ?

                                                            <Priority
                                                                agree_on_changing_priority_history={this.state.agree_on_changing_priority_history}
                                                                toggleAgreeOnChangingPriorityHistory={this.toggleAgreeOnChangingPriorityHistory}
                                                                edit={true}
                                                                task_data={this.edit_task}
                                                                hideAction={this.toggleShouldVisible}
                                                                updateTask={this.setEditTask}
                                                            />

                                                            :

                                                            <>
                                                                {
                                                                    this.state.edit_repeat ?

                                                                        <Repeat
                                                                            edit={true}
                                                                            task_data={this.edit_task}
                                                                            hideAction={this.toggleShouldVisible}
                                                                            updateTask={this.setEditTask}
                                                                            currentAnnotation={this.props.type}
                                                                        />

                                                                        :

                                                                        <>
                                                                            {
                                                                                this.state.edit_goal ?

                                                                                    <Goal
                                                                                        edit={true}
                                                                                        task_data={this.edit_task}
                                                                                        hideAction={this.toggleShouldVisible}
                                                                                        updateTask={this.setEditTask}
                                                                                        currentAnnotation={this.props.type}
                                                                                    />

                                                                                    :

                                                                                    <></>
                                                                            }
                                                                        </>
                                                                }
                                                            </>
                                                    }
                                                </>
                                        }

                                    </>


                            }
                        </>
                    </View>
                </RNModal>
            </>
        )
    }
}