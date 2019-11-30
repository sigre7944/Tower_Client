import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Keyboard,
    ScrollView
} from 'react-native';

import { styles } from './styles/styles'

import { Map, List, fromJS } from 'immutable'
const uuidv1 = require('uuid')

export default class TitleAndDescriptionHolder extends React.PureComponent {

    render() {
        return (
            <View>
                <TaskTitleElement
                    title_value={this.props.addTaskTitle}
                    {...this.props}
                />

                {/* <View
                    style={{
                        flex: 1,
                        height: 1,
                        borderWidth: 0.5,
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        marginVertical: 15,
                        marginHorizontal: 20,
                    }}
                >

                </View> */}

                <TaskDescriptionElement
                    title_value={this.props.addTaskTitle}
                    description_value={this.props.addTaskDescription}
                    {...this.props}
                />
            </View>
        )
    }
}


class TaskTitleElement extends React.PureComponent {
    textInputRef = React.createRef()

    _onChange = (e) => {
        this.props.updateTitle(e.nativeEvent.text)
    }

    setTaskTextInputRef = (ref) => {
        this.props.setTaskTextInputRef(ref)
        this.textInputRef = ref
    }

    _onLayout = () => {
        setTimeout(() => { this.textInputRef.focus() }, 50)
    }

    _onSubmitEditing = () => {
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
            new_task_with_id.update("title", (value) => this.props.title_value.trim())
            new_task_with_id.update("description", (value) => this.props.description_value.trim())
            new_task_with_id.update("type", (value) => this.props.currentAnnotation)

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
                    updater: (value) => new_task_with_id.toMap()
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

            this.props._closeAddTaskPanel()
        }

        else {
            this.props._closeAddTaskPanel()
        }
    }

    render() {
        return (
            <View style={{
                height: 52,
                marginHorizontal: 20,
                marginTop: 13,
            }}>
                <Text
                    style={styles.title_description_text}
                >
                    Task Title
                </Text>
                <TextInput
                    ref={this.setTaskTextInputRef}
                    style={styles.title_description_text_input}
                    placeholder="Add a task here"
                    autoCorrect={false}
                    value={this.props.title_value}
                    onChange={this._onChange}
                    onLayout={this._onLayout}
                    returnKeyType="done"
                    onSubmitEditing={this._onSubmitEditing}
                />
            </View>
        )
    }
}

class TaskDescriptionElement extends React.PureComponent {

    _onChange = (e) => {
        this.props.updateDescription(e.nativeEvent.text)
    }

    _onSubmitEditing = () => {
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
            new_task_with_id.update("title", (value) => this.props.title_value.trim())
            new_task_with_id.update("description", (value) => this.props.description_value.trim())
            new_task_with_id.update("type", (value) => this.props.currentAnnotation)

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
                    updater: (value) => new_task_with_id.toMap()
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

            this.props._closeAddTaskPanel()
        }

        else {
            this.props._closeAddTaskPanel()
        }
    }

    render() {
        return (
            <View style={{
                height: 52,
                marginHorizontal: 20,
                marginTop: 15,
            }}>
                <Text
                    style={styles.title_description_text}
                >
                    Task Description
                </Text>
                <TextInput
                    style={styles.title_description_text_input}
                    placeholder="Add task description"
                    autoCorrect={false}
                    value={this.props.description_value}
                    onChange={this._onChange}
                    returnKeyType="done"
                    onSubmitEditing={this._onSubmitEditing}
                />
            </View>
        )
    }
}