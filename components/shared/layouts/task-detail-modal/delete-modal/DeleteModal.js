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
    ScrollView,
    Animated,
    Easing
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { Map, List } from 'immutable'
import { styles } from './styles/styles';

const window_width = Dimensions.get("window").width
const window_height = Dimensions.get("window").height
const easing = Easing.inOut(Easing.linear)
const animation_duration = 250

export default class DeleteModal extends Component {
    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
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

    _updateNewData = () => {
        let returning_stats_map = Map(this.props.stats).asMutable(),
            completed_tasks_map = Map(this.props.completed_tasks),
            task_id = Map(this.props.task_data).get("id"),
            returning_week_chart_stats_map = Map(this.props.week_chart_stats).asMutable(),
            returning_month_chart_stats_map = Map(this.props.month_chart_stats).asMutable(),
            returning_year_chart_stats_map = Map(this.props.year_chart_stats).asMutable(),
            type = this.props.type

        Map(completed_tasks_map.get(task_id)).keySeq((key, index) => {
            if (key !== "id" && key !== "current_priority_value") {
                let completed_priority_array = List(completed_tasks_map.getIn([task_id, key, "completed_priority_array"]))

                if (returning_stats_map.hasIn([key, "current"])) {
                    completed_priority_array.forEach((completed_value, priority_index) => {
                        returning_stats_map.updateIn([key, "current"], (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value))
                    })
                }

                let timestamp = parseInt(key)

                if (type === "day") {
                    let day_in_week_toString = new Date(timestamp).getDay().toString(),
                        day_in_month_toString = new Date(timestamp).getDate().toString(),
                        month = new Date(timestamp).getMonth().toString(),
                        month_toString = month.toString(),
                        year = new Date(timestamp).getFullYear(),
                        year_toString = year.toString(),
                        monday = this.getMonday(new Date(timestamp)),
                        week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime().toString(),
                        month_timestamp_toString = new Date(year, month).getTime().toString()

                    completed_priority_array.forEach((completed_value, priority_index) => {
                        if (returning_week_chart_stats_map.hasIn([week_timestamp_toString, day_in_week_toString, "current"])) {
                            returning_week_chart_stats_map.updateIn(
                                [week_timestamp_toString, day_in_week_toString, "current"],
                                (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                            )
                        }

                        if (returning_month_chart_stats_map.hasIn([month_timestamp_toString, day_in_month_toString, "current"])) {
                            returning_month_chart_stats_map.updateIn(
                                [month_timestamp_toString, day_in_month_toString, "current"],
                                (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                            )
                        }

                        if (returning_year_chart_stats_map.hasIn([year_toString, month_toString, "current"])) {
                            returning_year_chart_stats_map.updateIn(
                                [year_toString, month_toString, "current"],
                                (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                            )
                        }
                    })

                }

                else if (type === "week") {
                    let week_timestamp_toString = key

                    completed_priority_array.forEach((completed_value_array, day_in_week_index) => {
                        if (day_in_week_index === 0) {
                            day_in_week_index = 7
                        }

                        let day_in_week_toString = (parseInt(day_in_week_index) % 7).toString(),
                            date = new Date(timestamp + (day_in_week_index - 1) * 86400 * 1000),
                            day_in_month_toString = date.getDate().toString(),
                            month = date.getMonth(),
                            month_toString = month.toString(),
                            year = date.getFullYear(),
                            year_toString = year.toString(),
                            month_timestamp_toString = new Date(year, month).getTime()

                        List(completed_value_array).forEach((completed_value, priority_index) => {
                            if (returning_week_chart_stats_map.hasIn([week_timestamp_toString, day_in_week_toString, "current"])) {
                                returning_week_chart_stats_map.updateIn(
                                    [week_timestamp_toString, day_in_week_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }

                            if (returning_month_chart_stats_map.hasIn([month_timestamp_toString, day_in_month_toString, "current"])) {
                                returning_month_chart_stats_map.updateIn(
                                    [month_timestamp_toString, day_in_month_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }

                            if (returning_year_chart_stats_map.hasIn([year_toString, month_toString, "current"])) {
                                returning_year_chart_stats_map.updateIn(
                                    [year_toString, month_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }
                        })
                    })
                }

                else {
                    let month_timestamp_toString = key

                    completed_priority_array.forEach((completed_value_array, day_in_month_index) => {
                        let day_in_month = parseInt(day_in_month_index) + 1,
                            day_in_month_toString = day_in_month.toString(),
                            date = new Date(month_timestamp_toString),
                            day_in_week_toString = date.getDay().toString(),
                            month = date.getMonth(),
                            month_toString = date.getMonth().toString(),
                            year = date.getFullYear(),
                            year_toString = date.getFullYear().toString(),
                            monday = this.getMonday(new Date(year, month, day_in_month)),
                            week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime()

                        List(completed_value_array).forEach((completed_value, priority_index) => {
                            if (returning_week_chart_stats_map.hasIn([week_timestamp_toString, day_in_week_toString, "current"])) {
                                returning_week_chart_stats_map.updateIn(
                                    [week_timestamp_toString, day_in_week_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }

                            if (returning_month_chart_stats_map.hasIn([month_timestamp_toString, day_in_month_toString, "current"])) {
                                returning_month_chart_stats_map.updateIn(
                                    [month_timestamp_toString, day_in_month_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }

                            if (returning_year_chart_stats_map.hasIn([year_toString, month_toString, "current"])) {
                                returning_year_chart_stats_map.updateIn(
                                    [year_toString, month_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }
                        })
                    })
                }
            }
        })

        return ({
            returning_stats_map: returning_stats_map,
            returning_week_chart_stats_map: returning_week_chart_stats_map,
            returning_month_chart_stats_map: returning_month_chart_stats_map,
            returning_year_chart_stats_map: returning_year_chart_stats_map
        })
    }

    _deleteTaskAndHistory = () => {
        let task_id = Map(this.props.task_data).get("id"),
            task_category = Map(this.props.task_data).get("category"),
            task_priority_value = Map(this.props.task_data).getIn(["priority", "value"]),
            new_data = this._updateNewData(),
            type = this.props.type,
            sending_data = {
                delete_task_data: {
                    type: "DELETE_DAY_TASK",
                    id: task_id,
                },
                update_category_data: {
                    keyPath: [task_category, "quantity"],
                    notSetValue: 0,
                    updater: (value) => value - 1 < 0 ? 0 : value - 1
                },
                update_priority_data: {
                    keyPath: [task_priority_value, "tasks"],
                    notSetValue: [],
                    updater: (tasks) => List(tasks).delete(List(tasks).findIndex((id) => task_id === id))
                },
                delete_completed_task_data: {
                    type: "DELETE_COMPLETED_DAY_TASK",
                    id: task_id
                },

                return_new_stats_data: {
                    type: "RETURN_NEW_DAY_STATS",
                    data: new_data.returning_stats_map
                },

                return_new_week_chart_stats_data: {
                    type: "RETURN_NEW_WEEK_CHART_STATS",
                    data: new_data.returning_week_chart_stats_map
                },
                return_new_month_chart_stats_data: {
                    type: "RETURN_NEW_WEEK_CHART_STATS",
                    data: new_data.returning_month_chart_stats_map
                },
                return_new_year_chart_stats_data: {
                    type: "RETURN_NEW_WEEK_CHART_STATS",
                    data: new_data.returning_year_chart_stats_map
                },
            }

        if (type === "week") {
            sending_data.delete_task_data.type = "DELETE_WEEK_TASK"
            sending_data.delete_completed_task_data.type = "DELETE_COMPLETED_WEEK_TASK"
            sending_data.return_new_stats_data.type = "RETURN_NEW_WEEK_STATS"
        }

        else if (type === "month") {
            sending_data.delete_task_data.type = "DELETE_MONTH_TASK"
            sending_data.delete_completed_task_data.type = "DELETE_COMPLETED_MONTH_TASK"
            sending_data.return_new_stats_data.type = "RETURN_NEW_MONTH_STATS"
        }

        this.props.deleteTaskAndHistoryThunk(sending_data)
        this.props._agreeDelete()
        this.props._toggleDelete()
    }

    _deleteOnlyTask = () => {
        let task_id = Map(this.props.task_data).get("id"),
            task_category = Map(this.props.task_data).get("category"),
            task_priority_value = Map(this.props.task_data).getIn(["priority", "value"]),
            type = this.props.type,
            sending_data = {
                delete_task_data: {
                    type: "DELETE_DAY_TASK",
                    id: task_id,
                },
                update_category_data: {
                    keyPath: [task_category, "quantity"],
                    notSetValue: 0,
                    updater: (value) => value - 1 < 0 ? 0 : value - 1
                },
                update_priority_data: {
                    keyPath: [task_priority_value, "tasks"],
                    notSetValue: [],
                    updater: (tasks) => List(tasks).delete(List(tasks).findIndex((id) => task_id === id))
                },
                delete_completed_task_data: {
                    type: "DELETE_COMPLETED_DAY_TASK",
                    id: task_id
                },
            }

        if (type === "week") {
            sending_data.delete_task_data.type = "DELETE_WEEK_TASK"
            sending_data.delete_completed_task_data.type = "DELETE_COMPLETED_WEEK_TASK"
        }

        else if (type === "month") {
            sending_data.delete_task_data.type = "DELETE_MONTH_TASK"
            sending_data.delete_completed_task_data.type = "DELETE_COMPLETED_MONTH_TASK"
        }

        this.props.deleteOnlyTaskThunk(sending_data)
        this.props._agreeDelete()
        this.props._toggleDelete()
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: window_width,
                            backgroundColor: "black",
                            opacity: 0.2
                        }}

                        onPress={this.props._toggleDelete}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            borderRadius: 20,
                            width: 330,
                            backgroundColor: "white",
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={styles.text}
                        >
                            Are you sure you want to delete this task?
                        </Text>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#ff3006",
                                marginTop: 20,
                            }}

                            onPress={this._deleteTaskAndHistory}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "white" } }}
                            >
                                {"DELETE TASK & HISTORY"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#ffb948",
                                marginTop: 20,
                            }}

                            onPress={this._deleteOnlyTask}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "white" } }}
                            >
                                {"DELETE ONLY TASK"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                            }}

                            onPress={this.props._toggleDelete}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "#6E6E6E" } }}
                            >
                                {"CANCEL"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}