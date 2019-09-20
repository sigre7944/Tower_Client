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

export default class TaskDetailModal extends Component {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    edit_task = this.props.task_data

    yes_delete_clicked = false

    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    state = {
        isOpened: false,
        isEditing: false,
        day_in_week_text: "",
        date_number: "",
        month_text: "",
        category: "",
        priority: "",
        repeat: "",
        goal: "",
        calendar_text: "",
        should_update: 0,

        toggle_delete: false,
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

    toggleEdit = (visible) => {
        this.setState(() => ({ isEditing: visible }));
    }

    handleTaskUpdate = () => {
        let edit_task = this.edit_task,
            date = new Date(edit_task.startTime),
            category = edit_task.category ? this.props.categories[edit_task.category].name : "",
            priority = edit_task.priority ? this.props.priorities[edit_task.priority.value].name : "",
            goal = edit_task.goal ? `${edit_task.goal.max} times` : "",
            calendar_text, repeat


        if (this.props.type === "day") {

            if (date) {
                calendar_text = `${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`
            }


            if (edit_task.repeat) {
                if (edit_task.repeat.type === "daily") {
                    repeat = `Every ${edit_task.repeat.interval.value} day(s)`
                }

                else if (edit_task.repeat.type === "weekly") {
                    repeat = `Every ${edit_task.repeat.interval.value} week(s)`
                }

                else {
                    repeat = `Every ${edit_task.repeat.interval.value} month(s)`
                }
            }

        }

        else if (this.props.type === "week") {

            if (date && edit_task.schedule) {
                calendar_text = `Week ${edit_task.schedule.week} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`
            }

            if (edit_task.repeat) {
                if (edit_task.repeat.type === "weekly-w") {
                    repeat = `Every ${edit_task.repeat.interval.value} week(s)`
                }

                else {
                    repeat = `Every ${edit_task.repeat.interval.value} month(s)`
                }
            }

        }

        else {
            if (edit_task.schedule) {
                calendar_text = `${this.monthNames[edit_task.schedule.month]} ${edit_task.schedule.year}`
            }

            if (edit_task.repeat) {
                repeat = `Every ${edit_task.repeat.interval.value} month(s)`
            }
        }

        this.setState({
            category,
            priority,
            repeat,
            goal,
            calendar_text
        })
    }

    componentDidMount() {
        this.handleTaskUpdate()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.task_data !== prevProps.task_data) {
            this.edit_task = this.props.task_data

            this.handleTaskUpdate()
        }

        if (this.state.toggle_delete !== prevProps.toggleDelete && this.yes_delete_clicked) {
            this.props.closeModal()
        }
    }


    dismissModal = () => {
        this.props.closeModal()
    }

    toggleDelete = () => {
        this.setState(prevState => ({
            toggle_delete: !prevState.toggle_delete
        }))
    }

    updateDeletionOnStatsData = (timestamp, priority_id, current_value) => {
        let stats_map = Map(this.props.stats),
            data = {}
        if (stats_map.has(timestamp)) {
            data = stats_map.get(timestamp)

            let { current } = data

            current[this.priority_order[priority_id]] -= current_value

            if (current[this.priority_order[priority_id]] < 0) {
                current[this.priority_order[priority_id]] = 0
            }

            data.current = current
        }

        return data
    }

    updateDeletionOnChartStatsData = (priority_id, chart_stats_map, timestamp, key, current_value) => {
        let data = {}

        if (chart_stats_map.has(timestamp)) {
            data = chart_stats_map.get(timestamp)

            if (data.hasOwnProperty(key)) {
                let { current } = data[key]

                current[this.priority_order[priority_id]] -= current_value

                if (current[this.priority_order[priority_id]] < 0) {
                    current[this.priority_order[priority_id]] = 0
                }

                data[key].current = current
            }
        }

        return data
    }

    updateDeletionOnCategoryData = (category_id) => {
        let { categories } = this.props,
            data = {}

        if (categories.hasOwnProperty(category_id)) {
            data = categories[category_id]

            let { quantity } = data

            quantity -= 1

            if (quantity < 0) {
                quantity = 0
            }

            data.quantity = quantity
        }

        return data
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

    delete = () => {
        let completed_task_action_type = "",
            uncompleted_task_action_type = "",
            stats_action_type = "",
            date = new Date(),
            stats_timestamp = 0,
            stats_data = {},
            sending_obj = {},
            should_update_stats = true,
            update_stats_data = {},
            should_update_chart_stats = {
                week: true,
                month: true,
                year: true
            },
            update_chart_stats_data = {},
            id = this.edit_task.id,
            priority_id = this.edit_task.priority.value,
            current_value = 0,
            category_data = this.updateDeletionOnCategoryData(this.edit_task.category),
            category_obj = {
                id: this.edit_task.category,
                data: category_data
            }

        if (this.props.type === "day") {
            completed_task_action_type = "DELETE_COMPLETED_DAY_TASK"
            uncompleted_task_action_type = "DELETE_DAY_TASK"
            stats_action_type = "UPDATE_DAY_STATS"
            stats_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
        }

        else if (this.props.type === "week") {
            completed_task_action_type = "DELETE_COMPLETED_WEEK_TASK"
            uncompleted_task_action_type = "DELETE_WEEK_TASK"
            stats_action_type = "UPDATE_WEEK_STATS"
            stats_timestamp = new Date(this.getMonday(date).getFullYear(), this.getMonday(date).getMonth(), this.getMonday(date).getDate()).getTime()
        }

        else {
            completed_task_action_type = "DELETE_COMPLETED_MONTH_TASK"
            uncompleted_task_action_type = "DELETE_MONTH_TASK"
            stats_action_type = "UPDATE_MONTH_STATS"
            stats_timestamp = new Date(date.getFullYear(), date.getMonth()).getTime()
        }

        current_value = this.returnTaskGoalCurrentValue(id, stats_timestamp)
        stats_data = this.updateDeletionOnStatsData(stats_timestamp, priority_id, current_value)

        if (Object.keys(stats_data).length === 0) {
            should_update_stats = false
        }

        update_stats_data = {
            stats_action_type,
            stats_timestamp,
            stats_data
        }

        let week_chart_timestamp = new Date(this.getMonday(date).getFullYear(), this.getMonday(date).getMonth(), this.getMonday(date).getDate()).getTime(),
            month_chart_timestamp = new Date(date.getFullYear(), date.getMonth()).getTime(),
            year_chart_timestamp = date.getFullYear(),
            week_chart_stats_data = this.updateDeletionOnChartStatsData(priority_id, this.props.week_chart_stats, week_chart_timestamp, date.getDay(), current_value),
            month_chart_stats_data = this.updateDeletionOnChartStatsData(priority_id, this.props.month_chart_stats, month_chart_timestamp, date.getDate(), current_value),
            year_chart_stats_data = this.updateDeletionOnChartStatsData(priority_id, this.props.year_chart_stats, year_chart_timestamp, date.getMonth(), current_value)

        if (Object.keys(week_chart_stats_data).length === 0) {
            should_update_chart_stats.week = false
        }

        if (Object.keys(month_chart_stats_data).length === 0) {
            should_update_chart_stats.month = false
        }

        if (Object.keys(year_chart_stats_data).length === 0) {
            should_update_chart_stats.year = false
        }

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


        sending_obj = {
            completed_task_action_type,
            uncompleted_task_action_type,
            id,
            should_update_stats,
            update_stats_data,
            should_update_chart_stats,
            update_chart_stats_data,
            category_obj
        }


        this.props.deleteTaskThunk(sending_obj)

        this.props.resetTaskData()
        this.toggleDelete()
        this.yes_delete_clicked = true
    }


    render() {
        return (
            <RNModal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative"
                    }}
                >

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: Dimensions.get("window").width,
                            backgroundColor: "black",
                            opacity: 0.5,
                        }}

                        onPress={this.dismissModal}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            top: 50,
                            borderRadius: 10,
                            width: Dimensions.get("window").width,
                            backgroundColor: "white",
                            bottom: 0,
                        }}
                    >

                        {!this.state.isEditing ?
                            <>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    <View style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'flex-end' }}>
                                        <View style={{ alignSelf: 'stretch', flex: 1, zIndex: 10 }}>
                                            <View>
                                                <Text style={{ textAlign: 'center' }}><FontAwesome name="minus" style={{ fontSize: 26, color: "grey" }} /></Text>
                                            </View>
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-start' }}>
                                                <TouchableOpacity onPress={this.toggleDelete}>
                                                    <FontAwesome name={'trash'} style={{ width: 50, height: 50, fontSize: 24, lineHeight: 50 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.toggleEdit(true)}>
                                                    <FontAwesome name={'edit'} style={{ width: 50, height: 50, fontSize: 24, lineHeight: 50 }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <CheckBox
                                                            center
                                                            checkedIcon='dot-circle-o'
                                                            uncheckedIcon='circle-o'
                                                            checked={this.props.checked}
                                                        />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>{this.edit_task.title}</Text>
                                                    </View>
                                                </View>
                                                {
                                                    this.edit_task.description && this.edit_task.description.length > 0 ?
                                                        <View style={styles.container}>
                                                            <View style={styles.head}>
                                                                <CheckBox
                                                                    center
                                                                    checkedIcon='dot-circle-o'
                                                                    uncheckedIcon='circle-o'
                                                                    checked={this.props.checked}
                                                                />
                                                            </View>
                                                            <View style={styles.body}>
                                                                <Text style={styles.text}>{this.edit_task.description}</Text>
                                                            </View>
                                                        </View>

                                                        :

                                                        <></>
                                                }
                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <FontAwesome name={'calendar'} style={styles.icon} />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>{this.state.calendar_text}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <FontAwesome name={'circle'} style={styles.icon} />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>{this.state.category}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <FontAwesome name={'warning'} style={styles.icon} />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>{this.state.priority}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <FontAwesome name={'warning'} style={styles.icon} />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>{this.state.repeat}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <FontAwesome name={'warning'} style={styles.icon} />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>{this.state.goal}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.container}>
                                                    <View style={styles.head}>
                                                        <FontAwesome name={'link'} style={styles.icon} />
                                                    </View>
                                                    <View style={styles.body}>
                                                        <Text style={styles.text}>Link enabled</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {this.state.toggle_delete ?
                                    <RNModal
                                        transparent={true}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                position: "relative",
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    flex: 1,
                                                    backgroundColor: "black",
                                                    width: Dimensions.get("window").width,
                                                    opacity: 0.5,
                                                }}

                                                onPress={this.toggleDelete}
                                            >
                                            </TouchableOpacity>

                                            <View
                                                style={{
                                                    borderRadius: 11,
                                                    height: 200,
                                                    width: 300,
                                                    backgroundColor: "white",
                                                    position: "absolute",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 10,
                                                }}
                                            >
                                                <Text>
                                                    Are you certain to delete this task?
                                        </Text>

                                                <View
                                                    style={{
                                                        marginTop: 20,
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        style={{
                                                            width: 70,
                                                            height: 30,
                                                            borderRadius: 10,
                                                            backgroundColor: "gainsboro",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            marginHorizontal: 20,
                                                        }}

                                                        onPress={this.toggleDelete}
                                                    >
                                                        <Text>
                                                            No
                                                </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={{
                                                            width: 70,
                                                            height: 30,
                                                            borderRadius: 10,
                                                            backgroundColor: "black",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            marginHorizontal: 20,
                                                        }}

                                                        onPress={this.delete}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "white"
                                                            }}
                                                        >
                                                            Yes
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>

                                    </RNModal>

                                    :

                                    null
                                }
                            </>
                            :

                            <EditDetails
                                task_data={this.edit_task}
                                categories={this.props.categories}
                                priorities={this.props.priorities}
                                stats={this.props.stats}
                                completed_tasks={this.props.completed_tasks}
                                week_chart_stats={this.props.week_chart_stats}
                                month_chart_stats={this.props.month_chart_stats}
                                year_chart_stats={this.props.year_chart_stats}
                                hideAction={this.toggleEdit}
                                editThunk={this.props.editThunk}
                                type={this.props.type}
                            />
                        }

                    </View>

                </View>
            </RNModal>
        )
    }
}

class EditDetails extends React.PureComponent {

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

    updateOnStatsAndChartsDataAllTime = (task_id, type, new_priority_value) => {
        let completed_tasks_map = this.props.completed_tasks.asMutable(),
            stats_map = this.props.stats.asMutable(),
            week_chart_stats_map = this.props.week_chart_stats.asMutable(),
            month_chart_stats_map = this.props.month_chart_stats.asMutable(),
            year_chart_stats_map = this.props.year_chart_stats.asMutable()

        if (completed_tasks_map.has(task_id)) {
            let completed_task_data = completed_tasks_map.get(task_id)

            completed_task_data.keySeq().forEach((key) => {
                if (key !== "id" && key !== "category" && key !== "priority_value") {
                    let completed_timestamp = parseInt(key),
                        completed_data = completed_task_data.get(key)

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
                            let data = { ...stats_map.get(completed_timestamp) },
                                current = [...data.current]

                            current[this.priority_order[new_priority_value]] += current_value

                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            data.current = current

                            stats_map.set(completed_timestamp, data)
                        }

                        if (week_chart_stats_map.has(week_completed_timestamp)) {
                            let chart_data = { ...week_chart_stats_map.get(week_completed_timestamp) }

                            if (chart_data.hasOwnProperty(day_in_week)) {
                                let data = { ...chart_data[day_in_week] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value

                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[day_in_week] = data

                                week_chart_stats_map.set(week_completed_timestamp, chart_data)
                            }
                        }

                        if (month_chart_stats_map.has(month_completed_timestamp)) {
                            let chart_data = { ...month_chart_stats_map.get(month_completed_timestamp) }

                            if (chart_data.hasOwnProperty(day)) {
                                let data = { ...chart_data[day] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value

                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[day] = data

                                month_chart_stats_map.set(month_completed_timestamp, chart_data)
                            }
                        }

                        if (year_chart_stats_map.has(year)) {
                            let chart_data = { ...year_chart_stats_map.get(year) }

                            if (chart_data.hasOwnProperty(month)) {
                                let data = { ...chart_data[month] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value

                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[month] = data

                                year_chart_stats_map.set(year, chart_data)
                            }
                        }
                    }

                    else if (type === "week") {
                        if (completed_task_data.get(key).hasOwnProperty("day_completed_array") && completed_task_data.get(key).hasOwnProperty("priority_value_array")) {
                            let { day_completed_array, priority_value_array } = completed_task_data.get(key)

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
                                    let chart_data = { ...week_chart_stats_map.get(completed_timestamp) }

                                    if (chart_data.hasOwnProperty(index)) {
                                        let data = { ...chart_data[index] },
                                            current = [...data.current]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        data.current = current
                                        chart_data[index] = data

                                        week_chart_stats_map.set(completed_timestamp, chart_data)
                                    }
                                }

                                if (month_chart_stats_map.has(month_timestamp)) {
                                    let chart_data = { ...month_chart_stats_map.get(month_timestamp) }

                                    if (chart_data.hasOwnProperty(day)) {
                                        let data = { ...chart_data[day] },
                                            current = [...data.current]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        data.current = current
                                        chart_data[day] = data

                                        month_chart_stats_map.set(month_timestamp, chart_data)
                                    }
                                }

                                if (year_chart_stats_map.has(year)) {
                                    let chart_data = { ...year_chart_stats_map.get(year) }

                                    if (chart_data.hasOwnProperty(month)) {
                                        let data = { ...chart_data[month] },
                                            current = [...data.current]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        data.current = current
                                        chart_data[month] = data

                                        year_chart_stats_map.set(year, chart_data)
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
                                        let stats_data = { ...stats_map.get(completed_timestamp) },
                                            current = [...stats_data.current]

                                        current[this.priority_order[new_priority_value]] += value

                                        current[this.priority_order[old_priority_value]] -= value

                                        if (current[this.priority_order[old_priority_value]] < 0) {
                                            current[this.priority_order[old_priority_value]] = 0
                                        }

                                        stats_data.current = current

                                        stats_map.set(completed_timestamp, stats_data)
                                    }

                                    if (week_chart_stats_map.has(completed_week_timestamp)) {
                                        let chart_data = { ...week_chart_stats_map.get(completed_week_timestamp) }

                                        if (chart_data.hasOwnProperty(day_in_week)) {
                                            let data = { ...chart_data[day_in_week] },
                                                current = [...data.current]

                                            current[this.priority_order[new_priority_value]] += value

                                            current[this.priority_order[old_priority_value]] -= value

                                            if (current[this.priority_order[old_priority_value]] < 0) {
                                                current[this.priority_order[old_priority_value]] = 0
                                            }

                                            data.current = current

                                            chart_data[day_in_week] = data

                                            week_chart_stats_map.set(completed_week_timestamp, chart_data)
                                        }
                                    }


                                    if (month_chart_stats_map.has(completed_timestamp)) {
                                        let chart_data = { ...month_chart_stats_map.get(completed_timestamp) }

                                        if (chart_data.hasOwnProperty(day)) {
                                            let data = { ...chart_data[day] },
                                                current = [...data.current]

                                            current[this.priority_order[new_priority_value]] += value

                                            current[this.priority_order[old_priority_value]] -= value

                                            if (current[this.priority_order[old_priority_value]] < 0) {
                                                current[this.priority_order[old_priority_value]] = 0
                                            }

                                            data.current = current

                                            chart_data[day] = data

                                            month_chart_stats_map.set(completed_timestamp, chart_data)
                                        }
                                    }

                                    if (year_chart_stats_map.has(completed_year)) {
                                        let chart_data = { ...year_chart_stats_map.get(completed_year) }

                                        if (chart_data.hasOwnProperty(completed_month)) {
                                            let data = { ...chart_data[completed_month] },
                                                current = [...data.current]

                                            current[this.priority_order[new_priority_value]] += value

                                            current[this.priority_order[old_priority_value]] -= value

                                            if (current[this.priority_order[old_priority_value]] < 0) {
                                                current[this.priority_order[old_priority_value]] = 0
                                            }

                                            data.current = current

                                            chart_data[completed_month] = data

                                            year_chart_stats_map.set(completed_year, chart_data)
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            })
        }

        return ({
            stats: stats_map,
            week_chart_stats: week_chart_stats_map,
            month_chart_stats: month_chart_stats_map,
            year_chart_stats: year_chart_stats_map,
        })
    }

    updateOnStatsAndChartDataFromToday = (task_id, type, new_priority_value, date) => {
        let completed_tasks_map = this.props.completed_tasks,
            stats_map = this.props.stats.asMutable(),
            week_chart_stats_map = this.props.week_chart_stats.asMutable(),
            month_chart_stats_map = this.props.month_chart_stats.asMutable(),
            year_chart_stats_map = this.props.year_chart_stats.asMutable(),
            completed_timestamp,

            return_stats_data,
            return_week_chart_stats_data,
            return_month_chart_stats_data,
            return_year_chart_stats_data


        if (completed_tasks_map.has(task_id)) {
            let completed_task = completed_tasks_map.get(task_id)

            if (type === "day") {
                completed_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

                if (completed_task.has(completed_timestamp)) {
                    let current_value = completed_task.get(completed_timestamp).current,
                        old_priority_value = completed_task.get(completed_timestamp).priority_value,
                        near_monday = this.getMonday(date),
                        week_completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                        day_in_week = date.getDay(),
                        month_completed_timestamp = new Date(date.getFullYear(), date.getMonth()).getTime(),
                        completed_year = date.getFullYear(),
                        day_in_month = date.getDate(),
                        completed_month = date.getMonth()

                    if (stats_map.has(completed_timestamp)) {
                        let stats_data = { ...stats_map.get(completed_timestamp) },
                            current = [...stats_data.current]

                        current[this.priority_order[new_priority_value]] += current_value
                        current[this.priority_order[old_priority_value]] -= current_value

                        if (current[this.priority_order[old_priority_value]] < 0) {
                            current[this.priority_order[old_priority_value]] = 0
                        }

                        stats_data.current = current

                        return_stats_data = {
                            data: stats_data,
                            timestamp: completed_timestamp
                        }
                    }

                    if (week_chart_stats_map.has(week_completed_timestamp)) {
                        let chart_data = { ...week_chart_stats_map.get(week_completed_timestamp) }

                        if (chart_data.hasOwnProperty(day_in_week)) {
                            let data = { ...chart_data[day_in_week] },
                                current = [...data.current]

                            current[this.priority_order[new_priority_value]] += current_value
                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            data.current = current

                            chart_data[day_in_week] = data

                            return_week_chart_stats_data = {
                                timestamp: week_completed_timestamp,
                                data: chart_data
                            }
                        }
                    }

                    if (month_chart_stats_map.has(month_completed_timestamp)) {
                        let chart_data = { ...month_chart_stats_map.get(month_completed_timestamp) }

                        if (chart_data.hasOwnProperty(day_in_month)) {
                            let data = { ...chart_data[day_in_month] },
                                current = [...data.current]

                            current[this.priority_order[new_priority_value]] += current_value
                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            data.current = current

                            chart_data[day_in_month] = data

                            return_month_chart_stats_data = {
                                timestamp: month_completed_timestamp,
                                data: chart_data
                            }
                        }
                    }

                    if (year_chart_stats_map.has(completed_year)) {
                        let chart_data = { ...year_chart_stats_map.get(completed_year) }

                        if (chart_data.hasOwnProperty(completed_month)) {
                            let data = { ...chart_data[completed_month] },
                                current = [...data.current]

                            current[this.priority_order[new_priority_value]] += current_value
                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            data.current = current

                            chart_data[completed_month] = data

                            return_year_chart_stats_data = {
                                timestamp: completed_year,
                                data: chart_data
                            }
                        }
                    }
                }
            }

            else if (type === "week") {
                let near_monday = this.getMonday(date)
                completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime()

                if (completed_task.has(completed_timestamp)) {
                    if (completed_task.get(completed_timestamp).hasOwnProperty("day_completed_array") && completed_task.get(completed_timestamp).hasOwnProperty("priority_value_array")) {
                        let { day_completed_array, priority_value_array } = completed_task.get(completed_timestamp),
                            day_in_week = date.getDay(),
                            day_in_month = date.getDate(),
                            completed_month = date.getMonth(),
                            completed_year = date.getFullYear(),
                            month_completed_timestamp = new Date(completed_year, completed_month).getTime(),
                            current_value = day_completed_array[day_in_week],
                            old_priority_value = priority_value_array[day_in_week]

                        if (stats_map.has(completed_timestamp)) {
                            let stats_data = { ...stats_map.get(completed_timestamp) },
                                current = [...stats_data.current]

                            current[this.priority_order[new_priority_value]] += current_value
                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            stats_data.current = current

                            return_stats_data = {
                                data: stats_data,
                                timestamp: completed_timestamp
                            }
                        }

                        if (week_chart_stats_map.has(completed_timestamp)) {
                            let chart_data = { ...week_chart_stats_map.get(completed_timestamp) }

                            if (chart_data.hasOwnProperty(day_in_week)) {
                                let data = { ...chart_data[day_in_week] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value
                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[day_in_week] = data

                                return_week_chart_stats_data = {
                                    data: chart_data,
                                    timestamp: completed_timestamp
                                }
                            }
                        }

                        if (month_chart_stats_map.has(month_completed_timestamp)) {
                            let chart_data = { ...month_chart_stats_map.get(month_completed_timestamp) }

                            if (chart_data.hasOwnProperty(day_in_month)) {
                                let data = { ...chart_data[day_in_month] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value
                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[day_in_month] = data

                                return_month_chart_stats_data = {
                                    data: chart_data,
                                    timestamp: month_completed_timestamp
                                }
                            }
                        }

                        if (year_chart_stats_map.has(completed_year)) {
                            let chart_data = { ...year_chart_stats_map.get(completed_year) }

                            if (chart_data.hasOwnProperty(completed_month)) {
                                let data = { ...chart_data[completed_month] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value
                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[completed_month] = data

                                return_year_chart_stats_data = {
                                    data: chart_data,
                                    timestamp: completed_year
                                }
                            }
                        }
                    }
                }
            }

            else {
                completed_timestamp = new Date(date.getFullYear(), date.getMonth()).getTime()

                if (completed_task.has(completed_timestamp)) {
                    if (completed_task.get(completed_timestamp).hasOwnProperty("day_completed_array") && completed_task.get(completed_timestamp).hasOwnProperty("priority_value_array")) {
                        let { day_completed_array, priority_value_array } = completed_data[completed_timestamp],
                            day = date.getDate(),
                            completed_year = date.getFullYear(),
                            completed_month = date.getMonth(),
                            near_monday = this.getMonday(date),
                            week_completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                            day_in_week = date.getDay(),
                            old_priority_value = priority_value_array[day - 1],
                            current_value = day_completed_array[day - 1]

                        if (stats_map.has(completed_timestamp)) {
                            let stats_data = { ...stats_map.get(completed_timestamp) },
                                current = [...stats_data.current]

                            current[this.priority_order[new_priority_value]] += current_value
                            current[this.priority_order[old_priority_value]] -= current_value

                            if (current[this.priority_order[old_priority_value]] < 0) {
                                current[this.priority_order[old_priority_value]] = 0
                            }

                            stats_data.current = current

                            return_stats_data = {
                                data: stats_data,
                                timestamp: completed_timestamp
                            }
                        }

                        if (week_chart_stats_map.has(week_completed_timestamp)) {
                            let chart_data = { ...week_chart_stats_map.get(week_completed_timestamp) }

                            if (chart_data.hasOwnProperty(day_in_week)) {
                                let data = { ...chart_data[day_in_week] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value
                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[day_in_week] = data

                                return_week_chart_stats_data = {
                                    data: chart_data,
                                    timestamp: week_completed_timestamp
                                }
                            }
                        }

                        if (month_chart_stats_map.has(completed_timestamp)) {
                            let chart_data = { ...month_chart_stats_map.get(completed_timestamp) }

                            if (chart_data.hasOwnProperty(day_in_month)) {
                                let data = { ...chart_data[day_in_month] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value
                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[day_in_month] = data

                                return_month_chart_stats_data = {
                                    data: chart_data,
                                    timestamp: completed_timestamp
                                }
                            }
                        }

                        if (year_chart_stats_map.has(completed_year)) {
                            let chart_data = { ...year_chart_stats_map.get(completed_year) }

                            if (chart_data.hasOwnProperty(completed_month)) {
                                let data = { ...chart_data[completed_month] },
                                    current = [...data.current]

                                current[this.priority_order[new_priority_value]] += current_value
                                current[this.priority_order[old_priority_value]] -= current_value

                                if (current[this.priority_order[old_priority_value]] < 0) {
                                    current[this.priority_order[old_priority_value]] = 0
                                }

                                data.current = current

                                chart_data[completed_month] = data

                                return_year_chart_stats_data = {
                                    data: chart_data,
                                    timestamp: completed_year
                                }
                            }
                        }
                    }
                }
            }
        }

        return ({
            return_stats_data,
            return_week_chart_stats_data,
            return_month_chart_stats_data,
            return_year_chart_stats_data
        })
    }

    doChangesOnCompletedTaskFromToday = (task_id, type, new_priority_value, date) => {
        let completed_tasks_map = this.props.completed_tasks,
            completed_timestamp,
            completed_data

        if (type === "day") {
            completed_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

            if (completed_tasks_map.has(task_id)) {
                completed_data = completed_tasks_map.get(task_id).toMap().asMutable()

                completed_data.set("priority_value", new_priority_value)

                if (completed_data.has(completed_timestamp)) {
                    let data = { ...completed_data.get(completed_timestamp) }
                    data.priority_value = new_priority_value
                    completed_tasks_map.set(task_id, data)
                }
            }
        }

        else if (type === "week") {
            let near_monday = this.getMonday(date),
                day_in_week = date.getDay()

            completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime()

            if (completed_tasks_map.has(task_id)) {
                completed_data = completed_tasks_map.get(task_id).toMap().asMutable()

                completed_data.set("priority_value", new_priority_value)

                if (completed_data.has(completed_timestamp)) {
                    let data = { ...completed_data.get(completed_timestamp) },
                        priority_value_array = [...data.priority_value_array]

                    if (day_in_week === 0) {
                        priority_value_array[day_in_week] = new_priority_value
                    }

                    else {
                        for (let i = day_in_week; i <= 7; i++) {
                            priority_value_array[day_in_week % 7] = new_priority_value
                        }
                    }

                    data.priority_value_array = priority_value_array

                    completed_tasks_map.set(task_id, data)

                }
            }
        }

        else {
            let day_in_month = date.getDate(),
                month = date.getMonth(),
                year = date.getFullYear(),
                last_day_in_month = new Date(year, month + 1, 0).getDate()

            completed_timestamp = new Date(year, month).getTime()

            if (completed_tasks_map.has(task_id)) {
                completed_data = completed_tasks_map.get(task_id).toMap().asMutable()

                completed_data.set("priority_value", new_priority_value)

                if (completed_data.has(completed_timestamp)) {
                    let data = { ...completed_data.get(completed_timestamp) },
                        priority_value_array = [...data.priority_value_array]

                    for (let i = day_in_month; i <= last_day_in_month; i++) {
                        priority_value_array[i] = new_priority_value
                    }

                    data.priority_value_array = priority_value_array

                    completed_tasks_map.set(task_id, data)
                }
            }
        }

        return completed_data
    }

    doChangesOnCompletedTaskAllTime = (task_id, type, new_priority_value) => {
        let completed_tasks_map = this.props.completed_tasks.asMutable()

        if (completed_tasks_map.has(task_id)) {
            let completed_data = completed_tasks_map.get(task_id).asMutable()

            completed_data.set("priority_value", new_priority_value)

            completed_data.keySeq().forEach((key) => {
                if (key !== "id" && key !== "category" && key !== "priority_value") {
                    let data = { ...completed_data.get(key) }

                    if (type === "day") {
                        data.priority_value = new_priority_value
                    }

                    else {
                        if (data.hasOwnProperty("priority_value_array")) {
                            let priority_value_array = [...data.priority_value_array]

                            data.priority_value_array = priority_value_array.fill(new_priority_value)
                        }
                    }

                    completed_data.set(key, data)
                }
            })

            completed_tasks_map.set(task_id, completed_data)
        }

        return completed_tasks_map
    }

    save = () => {
        let new_priority_id = this.edit_task.priority.value,
            new_category_key = this.edit_task.category,
            should_update_category = false,
            update_category_data = {},
            stats_action_type = "",
            completed_task_action_type = "",
            sending_obj = {
                edit_task: this.edit_task,
                should_update_category,
                update_category_data,
                stats_action_type,
            },
            date = new Date()

        // Only do update if the category is changed
        if (this.category_key !== new_category_key) {
            should_update_category = true

            //Decrease old category's quantity
            let old_category_data = { ...this.props.categories[this.category_key] }
            old_category_data.quantity -= 1

            //Increase new category's quantity
            let new_category_data = { ...this.props.categories[new_category_key] }
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
            // Apply all time
            if (this.state.agree_on_changing_priority_history) {
                sending_obj.should_update_from_now = false

                if (this.edit_task.type === "day") {
                    stats_action_type = "RETURN_NEW_DAY_STATS"
                    completed_task_action_type = "RETURN_NEW_COMPLETED_DAY_TASKS"
                }

                else if (this.edit_task.type === "week") {
                    stats_action_type = "RETURN_NEW_WEEK_STATS"
                    completed_task_action_type = "RETURN_NEW_COMPLETED_WEEK_TASKS"
                }

                else {
                    stats_action_type = "RETURN_NEW_MONTH_STATS"
                    completed_task_action_type = "RETURN_NEW_COMPLETED_MONTH_TASKS"
                }

                sending_obj.stats_action_type = stats_action_type

                let result_obj = this.updateOnStatsAndChartsDataAllTime(this.edit_task.id, this.edit_task.type, new_priority_id),
                    completed_tasks = this.doChangesOnCompletedTaskAllTime(this.edit_task.id, this.edit_task.type, new_priority_id)

                sending_obj.stats_data = {
                    action_type: stats_action_type,
                    data: result_obj.stats
                }

                sending_obj.week_chart_stats_data = {
                    data: result_obj.week_chart_stats
                }

                sending_obj.month_chart_stats_data = {
                    data: result_obj.month_chart_stats
                }

                sending_obj.year_chart_stats_data = {
                    data: result_obj.year_chart_stats
                }

                sending_obj.completed_tasks_data = {
                    action_type: completed_task_action_type,
                    data: completed_tasks
                }
            }

            else {
                sending_obj.should_update_from_now = true

                if (this.edit_task.type === "day") {
                    stats_action_type = "UPDATE_DAY_STATS"
                    completed_task_action_type = "UPDATE_COMPLETED_DAY_TASK"
                }

                else if (this.edit_task.type === "week") {
                    stats_action_type = "UPDATE_WEEK_STATS"
                    completed_task_action_type = "UPDATE_COMPLETED_WEEK_TASK"
                }

                else {
                    stats_action_type = "UPDATE_MONTH_STATS"
                    completed_task_action_type = "UPDATE_COMPLETED_MONTH_TASK"
                }

                sending_obj.stats_action_type = stats_action_type

                let result_obj = this.updateOnStatsAndChartDataFromToday(this.edit_task.id, this.edit_task.type, new_priority_id, date),
                    completed_tasks = this.doChangesOnCompletedTaskFromToday(this.edit_task.id, this.edit_task.type, new_priority_id, date)

                sending_obj.stats_data = {
                    action_type: stats_action_type,
                    timestamp: result_obj.return_stats_data.timestamp,
                    data: result_obj.return_stats_data.data
                }

                sending_obj.week_chart_stats_data = result_obj.return_week_chart_stats_data
                sending_obj.month_chart_stats_data = result_obj.return_month_chart_stats_data
                sending_obj.year_chart_stats_data = result_obj.return_year_chart_stats_data

                sending_obj.completed_tasks_data = {
                    action_type: completed_task_action_type,
                    data: completed_tasks
                }
            }
        }

        this.props.editThunk(sending_obj)

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

class OptionButton extends React.PureComponent {

    _onPress = () => {
        this.props.toggleAction(this.props.name)
    }

    render() {
        return (
            <View
                style={{
                    borderBottomColor: "gainsboro",
                    borderBottomWidth: 1,
                    height: 65,
                    justifyContent: "center"
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 30,
                    }}

                    onPress={this._onPress}
                >
                    <Text
                        style={{
                            color: this.props.text_color
                        }}
                    >
                        {this.props.content}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class CalendarEdit extends React.PureComponent {

    day_data = {}

    week_data = {}

    month_data = {}

    state = {
        toggle_clear: false
    }

    setDayData = (day, month, year) => {
        this.day_data = { day, month, year }
    }

    setWeekData = (day, week, month, year, noWeekInMonth) => {
        this.week_data = { day, week, month, year, noWeekInMonth }
    }

    setMonthData = (month, year) => {
        this.month_data = { month, year }
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
        let nearest_monday = this.getMonday(date)
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    save = () => {
        let data = {}

        if (this.props.type === "day") {
            if (this.day_data.day > 0 && this.day_data.month > 0 && this.day_data.year > 0) {
                let current = new Date()
                if (this.day_data.day < current.getDate() && this.day_data.month === current.getMonth() && this.day_data.year === current.getFullYear()) {
                    data.startTime = current.getTime()
                    data.trackingTime = data.startTime
                    data.schedule = {
                        day: current.getDate(),
                        month: this.day_data.month,
                        year: this.day_data.year
                    }
                }

                else {
                    data.startTime = new Date(new Date(new Date((new Date().setMonth(this.day_data.month))).setDate(this.day_data.day)).setFullYear(this.day_data.year)).getTime()
                    data.trackingTime = data.startTime
                    data.schedule = {
                        day: this.day_data.day,
                        month: this.day_data.month,
                        year: this.day_data.year
                    }
                }
            }
        }

        else if (this.props.type === "week") {
            if (this.week_data.day > 0 && this.week_data.week > 0 && this.week_data.month > 0 && this.week_data.year > 0) {
                let current = new Date()

                if (this.week_data.week < this.getWeek(current) && this.week_data.month === current.getMonth() && this.week_data.year === current.getFullYear()) {
                    data.startTime = this.getMonday(current).getTime()
                    data.trackingTime = data.startTime
                    data.schedule = {
                        week: this.getWeek(current),
                        day: this.getMonday(current).getDate(),
                        month: this.week_data.month,
                        year: this.week_data.year,
                        noWeekInMonth: this.getNoWeekInMonth(current)
                    }
                }

                else {
                    data.startTime = new Date(new Date(new Date((new Date().setMonth(this.week_data.month))).setDate(this.week_data.day)).setFullYear(this.week_data.year)).getTime()
                    data.trackingTime = data.startTime
                    data.schedule = {
                        week: this.week_data.week,
                        day: this.week_data.day,
                        month: this.week_data.month,
                        year: this.week_data.year,
                        noWeekInMonth: this.week_data.noWeekInMonth
                    }
                }
            }
        }

        else {
            if (this.month_data.month > 0 && this.month_data.year > 0) {
                let current = new Date()
                if (this.month_data.month < current.getMonth() && this.month_data.year === current.getFullYear()) {
                    data.startTime = new Date(new Date(new Date((new Date().setMonth(current.getMonth()))).setDate(1)).setFullYear(this.month_data.year)).getTime()
                    data.trackingTime = data.startTime
                    data.schedule = {
                        month: current.getMonth(),
                        year: this.month_data.year,
                    }
                }

                else {
                    data.startTime = new Date(new Date(new Date((new Date().setMonth(this.month_data.month))).setDate(1)).setFullYear(this.month_data.year)).getTime()
                    data.trackingTime = data.startTime
                    data.schedule = {
                        month: this.month_data.month,
                        year: this.month_data.year,
                    }
                }
            }
        }

        this.props.setEditTask(data)

        this.props.hideAction()
    }

    cancel = () => {
        this.props.hideAction()
    }

    clear = () => {
        this.setState(prevState => ({
            toggle_clear: !prevState.toggle_clear
        }))

        let date = new Date()
        this.setData(date.getDate(), date.getMonth(), date.getFullYear())
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: 338,
                    height: 346,
                    backgroundColor: 'white',
                    borderRadius: 10,
                }}
            >
                {this.props.type === "day" ?
                    < DayCalendar
                        {... this.props}
                        toggle_clear={this.state.toggle_clear}
                        setData={this.setDayData}
                    />
                    :
                    <>
                        {
                            this.props.type === "week" ?
                                <WeekCalendar
                                    {... this.props}
                                    toggle_clear={this.state.toggle_clear}
                                    setData={this.setWeekData}
                                />

                                :

                                <MonthCalendar
                                    {... this.props}
                                    toggle_clear={this.state.toggle_clear}
                                    setData={this.setMonthData}
                                />
                        }
                    </>
                }


                <View
                    style={{
                        height: 60,
                        backgroundColor: 'white',
                        flexDirection: "row",
                        marginBottom: 10,
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}

                        onPress={this.clear}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            Clear
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}

                        onPress={this.cancel}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            X
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
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
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class DismissArea extends React.PureComponent {
    _onPress = () => {
        this.props.toggleShouldVisible()
    }
    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    width: Dimensions.get("window").width,
                    opacity: 0.5
                }}

                onPress={this._onPress}
            >

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: 'grey',
        borderLeftWidth: 3,
        marginBottom: 4
    },
    containerEdit: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around'
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1
    },
    descriptionText: {
        lineHeight: 25,
        fontSize: 16
    },
    descriptionAmount: {
        lineHeight: 25,
        opacity: 0.5
    },
    share: {
        width: 50,
        height: 60,
    },
    colorBox: {
        width: 50,
        height: 60
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        lineHeight: 50
    },
    head: {
        width: 50,
        height: 50
    },
    body: {
        lineHeight: 50
    },
    text: {
        lineHeight: 45
    }
});


