import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    Modal,
    ScrollView
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { Map, List } from 'immutable'
import { styles } from './styles/styles';

import EditDeleteRow from './edit-delete-row/EditDeleteRow'
import TitleDescriptionRow from './title-description-row/TitleDescriptionRow'
import ScheduleRow from './schedule-row/ScheduleRow'
import CategoryRow from './category-row/CategoryRow'
import PriorityRow from './priority-row/PriorityRow'
import RepeatRow from './repeat-row/RepeatRow'
import EndRow from './end-row/EndRow'
import RewardRow from './reward-row/RewardRow'
import GoalRow from './goal-row/GoalRow'

import TaskDetailEditModal from './task-detail-edit-modal/TaskDetailEditModal.Container'

const window_width = Dimensions.get("window").width

export default class TaskDetailModal extends Component {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    short_daysInWeekText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


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
        should_update: 0,
        toggle_delete: false,
        is_edit_selected: false,
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

    _openEdit = () => {
        this.setState(() => ({ is_edit_selected: true }))
    }

    _closeEdit = () => {
        this.setState(() => ({ is_edit_selected: false }))
    }

    _dismissModal = () => {
        this.props.closeModal()
    }

    toggleDelete = () => {
        this.setState(prevState => ({
            toggle_delete: !prevState.toggle_delete
        }))
    }

    updateTaskDeletionOnStatsAllTime = (task_id, type) => {
        let stats = Map(this.props.stats).asMutable(),
            completed_tasks = Map(this.props.completed_tasks)

        if (completed_tasks.has(task_id)) {
            let completed_data = Map(completed_tasks.get(task_id))

            completed_data.keySeq().forEach((key) => {
                if (key !== "id" && key !== "category" && key !== "priority_value") {
                    let completed_timestamp = parseInt(key)

                    if (stats.has(completed_timestamp)) {
                        if (type === "day") {
                            let priority_value = completed_data.getIn([key, "priority_value"]),
                                current_value = completed_data.getIn([key, "current"])

                            stats.updateIn([completed_timestamp, "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                            })
                        }

                        else if (type === "week") {
                            let day_completed_array = List(completed_data.getIn([key, "day_completed_array"])),
                                priority_value_array = List(completed_data.getIn([key, "priority_value_array"]))

                            day_completed_array.forEach((completed_value, index) => {
                                if (completed_value > 0) {
                                    stats.updateIn([completed_timestamp, "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value_array.get(index)], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                    })
                                }
                            })
                        }

                        else {
                            let day_completed_array = List(completed_data.getIn([key, "day_completed_array"])),
                                priority_value_array = List(completed_data.getIn([key, "priority_value_array"]))

                            day_completed_array.forEach((completed_value, index) => {
                                if (completed_value > 0) {
                                    stats.updateIn([completed_timestamp, "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value_array.get(index)], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                    })
                                }
                            })
                        }
                    }
                }
            })
        }

        return stats
    }

    updateTaskDeletionOnChartStatsAllTime = (task_id, type) => {
        let week_chart_stats = Map(this.props.week_chart_stats).asMutable(),
            month_chart_stats = Map(this.props.month_chart_stats).asMutable(),
            year_chart_stats = Map(this.props.year_chart_stats).asMutable(),
            completed_tasks = Map(this.props.completed_tasks)

        if (completed_tasks.has(task_id)) {
            let completed_data = Map(completed_tasks.get(task_id))

            completed_data.keySeq().forEach((key) => {
                if (key !== "id" && key !== "category" && key !== "priority_value") {
                    let completed_timestamp = parseInt(key)

                    if (type === "day") {
                        let priority_value = completed_data.getIn([key, "priority_value"]),
                            current_value = completed_data.getIn([key, "current"]),
                            near_monday = this.getMonday(completed_timestamp),
                            week_completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                            day_in_week = new Date(completed_timestamp).getDay(),
                            day_in_month = new Date(completed_timestamp).getDate(),
                            completed_month = new Date(completed_timestamp).getMonth(),
                            completed_year = new Date(completed_timestamp).getFullYear(),
                            month_completed_timestamp = new Date(completed_year, completed_month).getTime()

                        if (week_chart_stats.hasIn([week_completed_timestamp, day_in_week.toString(), "current"])) {
                            week_chart_stats.updateIn([week_completed_timestamp, day_in_week.toString(), "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                            })
                        }

                        if (month_chart_stats.hasIn([month_completed_timestamp, day_in_month.toString(), "current"])) {
                            month_chart_stats.updateIn([month_completed_timestamp, day_in_month.toString(), "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                            })
                        }

                        if (year_chart_stats.hasIn([completed_year, completed_month.toString(), "current"])) {
                            year_chart_stats.updateIn([completed_year, completed_month.toString(), "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                            })
                        }
                    }

                    else if (type === "week") {
                        let priority_value_array = List(completed_data.getIn([key, "priority_value_array"])),
                            day_completed_array = List(completed_data.getIn([key, "day_completed_array"]))

                        day_completed_array.forEach((completed_value, index) => {
                            if (completed_value > 0) {
                                let i = index
                                if (i === 0) i = 7

                                let date = new Date(completed_timestamp + (i - 1) * 86400 * 1000),
                                    day_in_month = date.getDate(),
                                    month = date.getMonth(),
                                    year = date.getFullYear(),
                                    month_timestamp = new Date(year, month).getTime(),
                                    priority_value = priority_value_array.get(index)


                                if (week_chart_stats.hasIn([completed_timestamp, index.toString(), "current"])) {
                                    week_chart_stats.updateIn([completed_timestamp, index.toString(), "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                    })
                                }

                                if (month_chart_stats.hasIn([month_timestamp, day_in_month.toString(), "current"])) {
                                    month_chart_stats.updateIn([month_timestamp, day_in_month.toString(), "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                                    })
                                }

                                if (year_chart_stats.hasIn([year, month.toString(), "current"])) {
                                    year_chart_stats.updateIn([year, month.toString(), "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                                    })
                                }
                            }
                        })

                    }

                    else {
                        let priority_value_array = List(completed_data.getIn([key, "priority_value_array"])),
                            day_completed_array = List(completed_data.getIn([key, "day_completed_array"])),
                            completed_month = new Date(completed_timestamp).getMonth(),
                            completed_year = new Date(completed_timestamp).getFullYear()

                        day_completed_array.forEach((completed_value, index) => {
                            if (completed_value > 0) {
                                let day = index + 1,
                                    date = new Date(completed_year, completed_month, day),
                                    near_monday = this.getMonday(date),
                                    completed_week_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                                    day_in_week = date.getDay(),
                                    priority_value = priority_value_array.get(index)


                                if (week_chart_stats.hasIn([completed_week_timestamp, day_in_week.toString(), "current"])) {
                                    week_chart_stats.updateIn([completed_week_timestamp, day_in_week.toString(), "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                    })
                                }

                                if (month_chart_stats.hasIn([completed_timestamp, day.toString(), "current"])) {
                                    month_chart_stats.updateIn([completed_timestamp, day.toString(), "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                                    })
                                }

                                if (year_chart_stats.hasIn([completed_year, completed_month.toString(), "current"])) {
                                    year_chart_stats.updateIn([completed_year, completed_month.toString(), "current"], (value) => {
                                        return List(value).update(this.priority_order[priority_value], (v) => v - current_value < 0 ? 0 : v - current_value)
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }

        return ({
            week_chart_stats,
            month_chart_stats,
            year_chart_stats
        })
    }

    updateTaskDeletionOnCategory = (category) => {
        let categories = Map(this.props.categories),
            data = {}

        if (categories.has(category)) {
            data = { ...categories.get(category) }
            if (data.hasOwnProperty("quantity")) {
                data.quantity -= 1

                if (data.quantity < 0) {
                    data.quantity = 0
                }
            }
        }

        return data
    }

    delete = () => {
        let sending_obj = {
            category_obj: {
                id: this.edit_task.category,
                data: this.updateTaskDeletionOnCategory(this.edit_task.category)
            },
            task_id: this.edit_task.id,
            stats: {}
        }

        if (this.props.type === "day") {
            sending_obj.completed_task_action_type = "DELETE_COMPLETED_DAY_TASK"
            sending_obj.task_action_type = "DELETE_DAY_TASK"
            sending_obj.stats.action_type = "RETURN_NEW_DAY_STATS"
        }

        else if (this.props.type === "week") {
            sending_obj.completed_task_action_type = "DELETE_COMPLETED_WEEK_TASK"
            sending_obj.task_action_type = "DELETE_WEEK_TASK"
            sending_obj.stats.action_type = "RETURN_NEW_WEEK_STATS"
        }

        else {
            sending_obj.completed_task_action_type = "DELETE_COMPLETED_MONTH_TASK"
            sending_obj.task_action_type = "DELETE_MONTH_TASK"
            sending_obj.stats.action_type = "RETURN_NEW_MONTH_STATS"
        }

        sending_obj.stats.data = this.updateTaskDeletionOnStatsAllTime(this.edit_task.id, this.props.type)
        sending_obj.chart_stats = this.updateTaskDeletionOnChartStatsAllTime(this.edit_task.id, this.props.type)

        this.props.deleteTaskThunk(sending_obj)

        this.props.resetTaskData()
        this.toggleDelete()
        this.yes_delete_clicked = true
    }

    componentDidMount() {
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.toggle_delete !== prevProps.toggleDelete && this.yes_delete_clicked) {
            this.props.closeModal()
        }
    }

    render() {
        let task_data_map = Map(this.props.task_data),
            task_title = task_data_map.get("title"),
            task_description = task_data_map.get("description"),
            type = this.props.type,
            task_schedule = task_data_map.get("schedule"),
            task_schedule_text = "",
            categories_map = Map(this.props.categories),
            task_category = task_data_map.get("category"),
            task_category_name = categories_map.getIn([task_category, "name"]),
            task_category_color = categories_map.getIn([task_category, "color"]),
            priorities_map = Map(this.props.priorities),
            task_priority_value = task_data_map.getIn(["priority", "value"]),
            task_priority_color = priorities_map.getIn([task_priority_value, "color"]),
            task_priority_name = priorities_map.getIn([task_priority_value, "name"]),
            task_repeat = task_data_map.get("repeat"),
            task_repeat_type = task_data_map.getIn(["repeat", "type"]),
            task_repeat_value = task_data_map.getIn(["repeat", "interval", "value"]),
            task_repeat_text = "",
            task_end = task_data_map.get("end"),
            task_end_type = task_data_map.getIn(["end", "type"]),
            task_end_text = "",
            task_reward_text = Map(task_data_map).getIn(["reward", "value"]),
            task_goal_text = `${Map(task_data_map).getIn(["goal", "max"])} time per occurrence`

        if (type === "day") {
            let day = parseInt(Map(task_schedule).get("day")),
                month = parseInt(Map(task_schedule).get("month")),
                year = parseInt(Map(task_schedule).get("year")),
                date = new Date(year, month, day)

            task_schedule_text = `${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${this.monthNames[date.getMonth()]} ${year}`

            if (task_repeat_type === "weekly") {
                let days_in_week = List(Map(task_repeat).getIn(["interval", "daysInWeek"])).toArray(),
                    string = ""

                days_in_week.forEach((value, index) => {
                    if (value) {
                        let day_index = index + 1 === 7 ? 0 : index + 1

                        string += this.short_daysInWeekText[day_index] + ", "
                    }
                })

                if (string !== "" || string.length > 0) {
                    string = "(" + string.substring(0, string.length - 2) + ")"
                }

                task_repeat_text = `every ${task_repeat_value} week ${string}`
            }

            else {
                task_repeat_text = task_repeat_type === "daily" ? `every ${task_repeat_value} day` : `every ${task_repeat_value} month`
            }
        }

        else if (type === "week") {
            let week = Map(task_schedule).get("week"),
                monday = Map(task_schedule).get("monday"),
                start_month = parseInt(Map(task_schedule).get("start_month")),
                sunday = Map(task_schedule).get("sunday"),
                end_month = parseInt(Map(task_schedule).get("end_month")),
                start_year = Map(task_schedule).get("start_year"),
                end_year = Map(task_schedule).get("end_year")

            task_schedule_text = `Week ${week} (${monday} ${this.month_names_in_short[start_month]} ${start_year} - ${sunday} ${this.month_names_in_short[end_month]} ${end_year})`

            if (task_repeat_type === "weekly-m") {
                let no_week_in_month = parseInt(Map(task_repeat).getIn(["interval", "noWeekInMonth"])),
                    nth_week_array = ["1st", "2nd", "3rd", "4th"]

                if (no_week_in_month > 4) {
                    no_week_in_month = 4
                }

                task_repeat_text = `${nth_week_array[no_week_in_month - 1]} week every ${task_repeat_value} month`
            }

            else {
                task_repeat_text = `every ${task_repeat_value} week`
            }
        }

        else {
            let month = Map(task_schedule).get("month"),
                year = Map(task_schedule).get("year")

            task_schedule_text = `${this.monthNames[month]} ${year}`

            task_repeat_text = `every ${task_repeat_value} month`
        }


        if (task_end_type === "never") {
            task_end_text = "Never"
        }

        else if (task_end_type === "on") {
            let end_date = new Date(parseInt(Map(task_end).get("endAt")))

            task_end_text = `${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]} ${end_date.getFullYear()}`
        }

        else {
            let occurrences = Map(task_end).get("occurrence")

            task_end_text = `${occurrences} occurrence`
        }

        return (
            <Modal
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
                            width: window_width,
                            backgroundColor: "black",
                            opacity: 0.2,
                        }}

                        onPress={this._dismissModal}
                    >

                    </TouchableOpacity>

                    {this.state.is_edit_selected ?
                        <TaskDetailEditModal
                            task_data={this.props.task_data}
                            _closeEdit={this._closeEdit}
                            _dismissModal={this._dismissModal}
                            type={this.props.type}
                        />
                        :

                        <View
                            style={{
                                position: "absolute",
                                top: 60,
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                                width: Dimensions.get("window").width,
                                backgroundColor: "white",
                                bottom: 0,
                            }}
                        >
                            {/* minus sign - close modal */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginTop: 5,
                                }}

                                onPress={this._dismissModal}
                            >
                                <View
                                    style={styles.minus}
                                >

                                </View>
                            </TouchableOpacity>


                            <EditDeleteRow
                                _openEdit={this._openEdit}
                                _closeEdit={this._closeEdit}
                            />

                            <ScrollView>
                                <TitleDescriptionRow
                                    title={task_title}
                                    description={task_description}
                                />

                                <ScheduleRow
                                    schedule_text={task_schedule_text}
                                />

                                <CategoryRow
                                    category_name={task_category_name}
                                    category_color={task_category_color}
                                />

                                <PriorityRow
                                    priority_color={task_priority_color}
                                    priority_name={task_priority_name}
                                />

                                <RepeatRow
                                    repeat_text={task_repeat_text}
                                />

                                <EndRow
                                    end_text={task_end_text}
                                />

                                <RewardRow
                                    reward_text={task_reward_text}
                                />

                                <GoalRow
                                    goal_text={task_goal_text}
                                />
                            </ScrollView>
                        </View>
                    }
                </View>
            </Modal>
        )
    }
}


