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

    _save = () => {
        let task_data_map = Map(this.props.task_data_map).asMutable()

        task_data_map.update("title", (value) => this.props.task_title.trim())
        task_data_map.update("description", (value) => this.props.task_description.trim())

        let old_category = Map(this.props.old_task_data_map).get("category"),
            new_category = task_data_map.get("category"),
            old_priority_value = Map(this.props.old_task_data_map).getIn(["priority", "value"]),
            new_priority_value = task_data_map.getIn(["priority", "value"]),
            type = this.props.type,
            sending_obj = {
                edited_task_data: {
                    type: "UPDATE_DAY_TASK",
                    keyPath: [task_data_map.get("id")],
                    notSetValue: {},
                    updater: (value) => task_data_map
                },

                old_category_data: {
                    keyPath: [old_category, "quantity"],
                    notSetValue: 0,
                    updater: (value) => value - 1 < 0 ? 0 : value - 1
                },

                new_category_data: {
                    keyPath: [new_category, "quantity"],
                    notSetValue: 0,
                    updater: (value) => value + 1
                },

                old_priority_data: {
                    keyPath: [old_priority_value, "tasks"],
                    notSetValue: [],
                    updater: (tasks) => {
                        return List(tasks).delete(List(tasks).findIndex((task_data, index, list) => task_data_map.get("id") === Map(task_data).get("id")))
                    }
                },

                new_priority_data: {
                    keyPath: [new_priority_value, "tasks"],
                    notSetValue: [],
                    updater: (tasks) => {
                        return List(tasks).push(fromJS({
                            id: task_data_map.get("id"),
                            category: new_category,
                        }))
                    }
                },

                new_completed_task_data: {
                    type: "UPDATE_COMPLETED_DAY_TASK",
                    keyPath: [task_data_map.get("id"), "category"],
                    notSetValue: "",
                    updater: (value) => new_category
                }
            }

        if (type === "week") {
            sending_obj.edited_task_data.type = "UPDATE_WEEK_TASK"
            sending_obj.new_completed_task_data.type = "UPDATE_COMPLETED_WEEK_TASK"
        }

        else if (type === "month") {
            sending_obj.edited_task_data.type = "UPDATE_MONTH_TASK"
            sending_obj.new_completed_task_data.type = "UPDATE_COMPLETED_MONTH_TASK"
        }

        this.props.updateEditedTask(sending_obj)
        this.props._closeEdit()
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