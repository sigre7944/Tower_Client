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

import { styles } from './styles/styles'
import { Map, fromJS, List } from 'immutable'
const window_width = Dimensions.get("window").width

export default class SaveButton extends React.PureComponent {

    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    state = {
        should_affect_history: false
    }

    _updateDayStatsWhenDoAffectHistory = () => {
        let returning_day_stats_map = Map(this.props.day_stats).asMutable(),
            day_stats_map = Map(this.props.day_stats),
            completed_day_tasks = Map(this.props.completed_day_tasks),
            new_priority_value = Map(this.props.task_data_map).getIn(["priority", "value"]),
            task_id = Map(this.props.task_data_map).get("id")

        day_stats_map.keySeq().forEach((timestamp, index) => {
            let current_goal_value = 0,
                old_priority_value = ""

            if (completed_day_tasks.hasIn([task_id, timestamp, "current"])) {
                current_goal_value = completed_day_tasks.getIn([task_id, timestamp, "current"])
                old_priority_value = completed_day_tasks.getIn([task_id, timestamp, "priority_value"])

                if (returning_day_stats_map.hasIn([timestamp, "current"])) {
                    returning_day_stats_map.updateIn([timestamp, "current"], (current) => {
                        return List(current).update(this.priority_order[old_priority_value], (value) => value - current_goal_value < 0 ? 0 : value - current_goal_value)
                    })

                    returning_day_stats_map.updateIn([timestamp, "current"], (current) => {
                        return List(current).update(this.priority_order[new_priority_value], (value) => value + current_goal_value)
                    })
                }
            }
        })

        return returning_day_stats_map.toMap()
    }

    _updateWeekStatsWhenDoAffectHistory = () => {
        let returning_week_stats_map = Map(this.props.week_stats).asMutable(),
            week_stats_map = Map(this.props.week_stats),
            completed_week_tasks = Map(this.props.completed_week_tasks),
            new_priority_value = Map(this.props.task_data_map).getIn(["priority", "value"]),
            task_id = Map(this.props.task_data_map).get("id")

        week_stats_map.keySeq().forEach((timestamp, index) => {

            if (completed_week_tasks.hasIn([task_id, timestamp, "day_completed_array"])
                && completed_week_tasks.hasIn([task_id, timestamp, "priority_value_array"])) {

                let day_completed_array = List(completed_week_tasks.getIn([task_id, timestamp, "day_completed_array"])),
                    priority_value_array = List(completed_week_tasks.getIn([task_id, timestamp, "priority_value_array"]))

                day_completed_array.forEach((completed_value, index) => {
                    let old_priority_value = List(priority_value_array).get(index)

                    if (returning_week_stats_map.hasIn([timestamp, "current"])) {
                        returning_week_stats_map.updateIn([timestamp, "current"], (current) => {
                            return List(current).update(this.priority_order[old_priority_value], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                        })

                        returning_day_stats_map.updateIn([timestamp, "current"], (current) => {
                            return List(current).update(this.priority_order[new_priority_value], (value) => value + completed_value)
                        })
                    }
                })
            }
        })

        return returning_week_stats_map
    }

    _updateMonthStatsWhenDoAffectHistory = () => {
        let returning_month_stats_map = Map(this.props.month_stats).asMutable(),
            month_stats_map = Map(this.props.month_stats),
            completed_month_tasks = Map(this.props.completed_month_tasks),
            new_priority_value = Map(this.props.task_data_map).getIn(["priority", "value"]),
            task_id = Map(this.props.task_data_map).get("id")

        month_stats_map.keySeq().forEach((timestamp, index) => {

            if (completed_month_tasks.hasIn([task_id, timestamp, "day_completed_array"])
                && completed_month_tasks.hasIn([task_id, timestamp, "priority_value_array"])) {

                let day_completed_array = List(completed_month_tasks.getIn([task_id, timestamp, "day_completed_array"])),
                    priority_value_array = List(completed_month_tasks.getIn([task_id, timestamp, "priority_value_array"]))

                day_completed_array.forEach((completed_value, index) => {
                    let old_priority_value = List(priority_value_array).get(index)

                    if (returning_month_stats_map.hasIn([timestamp, "current"])) {
                        returning_month_stats_map.updateIn([timestamp, "current"], (current) => {
                            return List(current).update(this.priority_order[old_priority_value], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                        })

                        returning_day_stats_map.updateIn([timestamp, "current"], (current) => {
                            return List(current).update(this.priority_order[new_priority_value], (value) => value + completed_value)
                        })
                    }
                })
            }
        })

        return returning_month_stats_map
    }

    _updateWhenDoAffectHistory = () => {
        let old_task_data_map = Map(this.props.old_task_data_map),
            task_data_map = Map(this.props.task_data_map)

    }

    _save = () => {

    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}

                onPress={this._save}
            >
                <Text
                    style={styles.text}
                >
                    SAVE
                </Text>
            </TouchableOpacity>
        )
    }
}

class ShouldAffectHistory extends React.PureComponent {
    render() {
        return (
            <Modal>
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
                            opacity: 0.2,
                        }}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            width: 200,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            backgroundColor: "white"
                        }}
                    >

                    </View>
                </View>
            </Modal>
        )
    }
}