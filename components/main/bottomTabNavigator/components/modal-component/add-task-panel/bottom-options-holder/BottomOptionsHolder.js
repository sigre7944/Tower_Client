import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Keyboard,
    ScrollView
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faCalendarAlt,
    faList,
    faExclamationTriangle,
    faCheck,
    faRedoAlt
} from '@fortawesome/free-solid-svg-icons'

import { primary_color } from "../../../../../../shared/styles/style";

import { styles } from "./styles/styles";

import { Map, List, fromJS } from 'immutable'

const uuidv1 = require('uuid')

export default class BottomOptionsHolder extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    height: 57,
                    width: Dimensions.get("window").width,
                    backgroundColor: "white",
                    flexDirection: 'row',
                    shadowOffset: {
                        width: 0,
                        height: -4,
                    },
                    shadowRadius: 7,
                    shadowColor: "black",
                    shadowOpacity: 0.03,
                }}
            >
                <BottomOptionElement
                    chooseOption={this.props.chooseCalenderOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faCalendarAlt}
                />

                <BottomOptionElement
                    chooseOption={this.props.chooseRepeatOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faRedoAlt}
                />

                <BottomOptionElement
                    chooseOption={this.props.chosenCategoryOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faList}
                />

                <BottomOptionElement
                    chooseOption={this.props.choosePriorityOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faExclamationTriangle}
                />

                <BottomConfirmElement
                    chooseOption={this.props.toggleAddTask}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    {... this.props}

                    title_value={this.props.addTaskTitle}
                    description_value={this.props.addTaskDescription}

                    icon={faCheck}
                />
            </View>
        )
    }
}


class BottomOptionElement extends React.PureComponent {

    _onPress = () => {
        this.props.chooseOption()
        this.props.disableAddTaskPanel()
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.option_container}
                onPress={this._onPress}
            >
                <FontAwesomeIcon
                    icon={this.props.icon}
                    color={primary_color}
                    size={16}
                />
            </TouchableOpacity>
        )
    }
}

class BottomConfirmElement extends React.PureComponent {

    _createTask = () => {
        if (this.props.title_value.length > 0) {
            let task_id = `day-task-${uuidv1()}`,
                reset_new_task_type = "RESET_NEW_DAY_TASK",
                add_task_type = "UPDATE_DAY_TASK"

            if (this.props.currentAnnotation === "week") {
                task_id = `week-task-${uuidv1()}`
                reset_new_task_type = "RESET_NEW_WEEK_TASK"
                add_task_type = "UPDATE_WEEK_TASK"
            }

            else if (this.props.currentAnnotation === "month") {
                task_id = `month-task-${uuidv1()}`
                reset_new_task_type = "RESET_NEW_MONTH_TASK"
                add_task_type = "UPDATE_MONTH_TASK"
            }

            let new_task = Map(this.props.task_data)
            let category_id = new_task.get("category")

            let new_task_with_id = Map(this.props.task_data).asMutable()
            new_task_with_id.update("id", (value) => task_id)
            new_task_with_id.update("title", (value) => this.props.title_value)
            new_task_with_id.update("description", (value) => this.props.description_value)

            let priority_value = Map(this.props.task_data).getIn(["priority", "value"]),
                priority_data = fromJS({
                    id: task_id,
                    category: category_id
                })

            let sending_obj = {
                add_task_data: {
                    type: add_task_type,
                    keyPath: [task_id],
                    notSetValue: {},
                    updater: (value) => new_task_with_id
                },

                category_data: {
                    keyPath: [category_id, "quantity"],
                    notSetValue: {},
                    updater: (value) => value + 1
                },

                reset_new_task_type,

                priority_data: {
                    keyPath: [priority_value, "tasks"],
                    notSetValue: [],
                    updater: (tasks) => List(tasks).push(priority_data)
                }
            }

            this.props.addTaskThunk(sending_obj)

            this.props.toggleAddTask()
        }

        else {
            this.props.toggleAddTask()
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.confirm_container}

                onPress={this._createTask}
            >
                <FontAwesomeIcon
                    icon={this.props.icon}
                    color={"white"}
                    size={16}
                />
            </TouchableOpacity>
        )
    }
}
