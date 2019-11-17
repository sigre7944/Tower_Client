import React, { Component } from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    Modal,
    ScrollView,
    Animated,
    Easing
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

import DeleteModal from './delete-modal/DeleteModal.Container'

import TaskDetailEditModal from './task-detail-edit-modal/TaskDetailEditModal.Container'

const window_width = Dimensions.get("window").width
const window_height = Dimensions.get("window").height
const easing = Easing.inOut(Easing.linear)
const animation_duration = 250

export default class TaskDetailModal extends Component {

    anim_translate_y = new Animated.Value(window_height)

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
        is_delete_selected: false,
        is_edit_selected: false,
    }

    _appearAnim = () => {
        Animated.timing(
            this.anim_translate_y,
            {
                toValue: 0,
                duration: animation_duration,
                easing,
                useNativeDriver: true
            }
        ).start()
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

    _toggleDelete = () => {
        this.setState(prevState => ({
            is_delete_selected: !prevState.is_delete_selected
        }))
    }

    _agreeDelete = () => {
        this.yes_delete_clicked = true
    }

    componentDidMount() {
        this._appearAnim()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.is_delete_selected !== prevProps.is_delete_selected && this.yes_delete_clicked) {
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

                    <TouchableWithoutFeedback
                        onPress={this._dismissModal}
                    >

                        <View
                            style={{
                                flex: 1,
                                width: window_width,
                                backgroundColor: "black",
                                opacity: 0.2,
                            }}
                        >

                        </View>
                    </TouchableWithoutFeedback>

                    <Animated.View
                        style={{
                            position: "absolute",
                            top: 120,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            width: Dimensions.get("window").width,
                            backgroundColor: "white",
                            bottom: 0,
                            transform: [{ translateY: this.anim_translate_y }]
                        }}
                    >
                        {this.state.is_edit_selected ?
                            <TaskDetailEditModal
                                task_data={this.props.task_data}
                                _closeEdit={this._closeEdit}
                                _dismissModal={this._dismissModal}
                                type={this.props.type}
                            />
                            :
                            <>
                                {this.state.is_delete_selected ?
                                    <DeleteModal
                                        _toggleDelete={this._toggleDelete}
                                        task_data={this.props.task_data}
                                        type={this.props.type}
                                        _agreeDelete={this._agreeDelete}
                                        chosen_date_data={this.props.chosen_date_data}
                                    />

                                    :
                                    null
                                }

                                {/* minus sign - close modal */}
                                < TouchableOpacity
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
                                    _toggleDelete={this._toggleDelete}
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
                            </>
                        }
                    </Animated.View>
                </View>
            </Modal >
        )
    }
}


