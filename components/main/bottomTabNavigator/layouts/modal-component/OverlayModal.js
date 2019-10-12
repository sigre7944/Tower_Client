import React, { Component } from 'react'

import {
    View,
    Modal,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

import AddTaskPanel from './add-task-panel/AddTaskPanel.Container'
import Calendar from './calendar/Calendar'

import Category from '../../../../shared/category/Category.Container'
import Goal from '../../../../shared/goal/Goal.Container'
import Priority from '../../../../shared/priority/Priority.Container'

import { Map, fromJS } from 'immutable'

class DismissElement extends React.PureComponent {
    _onPress = () => {
        if (this.props.addTaskMenuChosen) {
            this.props.toggleAddTask()
        }

        this.props.disableAllTabs()
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this._onPress}
            >
                <View style={{
                    flex: 1,
                    width: Dimensions.get("window").width,
                    backgroundColor: "#000000",
                    opacity: 0.2,
                }}>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

export default class OverlayModal extends Component {

    state = {
        currentAnnotation: 'day',
        calendarChosen: false,
        categoryChosen: false,
        priorityChosen: false,
        goalChosen: false,
        addTaskMenuChosen: true,

        shouldCallBackKeyboard: false
    }

    setCurrentAnnotation = (annotation) => {
        this.setState({ currentAnnotation: annotation })
    }

    disableAllTabs = () => {
        this.setState({
            calendarChosen: false,
            categoryChosen: false,
            priorityChosen: false,
            goalChosen: false,
            addTaskMenuChosen: true,
        })
    }

    chooseCalenderOption = () => {
        this.setState(prevState => ({
            calendarChosen: !prevState.calendarChosen,
            categoryChosen: false,
            priorityChosen: false,
            goalChosen: false,
            addTaskMenuChosen: false,
        }))
    }

    chooseGoalOption = () => {
        this.setState(prevState => ({
            calendarChosen: false,
            goalChosen: !prevState.goalChosen,
            categoryChosen: false,
            priorityChosen: false,
            addTaskMenuChosen: false,
        }))
    }

    chosenCategoryOption = () => {
        this.setState(prevState => ({
            calendarChosen: false,
            goalChosen: false,
            priorityChosen: false,
            categoryChosen: !prevState.categoryChosen,
            addTaskMenuChosen: false,
        }))
    }

    choosePriorityOption = () => {
        this.setState(prevState => ({
            calendarChosen: false,
            categoryChosen: false,
            priorityChosen: !prevState.priorityChosen,
            goalChosen: false,
            addTaskMenuChosen: false,
        }))
    }

    getWeek = (date) => {
        var target = new Date(date);
        var dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
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
        let nearest_monday = this.getMonday(date).getDate()
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7)).getDate()

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    componentDidMount() {
        let currentDayTask = Map(this.props.currentDayTask)
        if (!currentDayTask.has("startTime") ||
            !currentDayTask.has("trackingTime") ||
            !currentDayTask.has("schedule") ||
            !currentDayTask.has("category") ||
            !currentDayTask.has("repeat") ||
            !currentDayTask.has("end") ||
            !currentDayTask.has("priority") ||
            !currentDayTask.has("goal")) {
            let date = new Date(),
                timestamp = date.getTime(),
                type = "UPDATE_NEW_DAY_TASK"

            let sending_obj = {
                type,

                startTime_data: {
                    keyPath: ["startTime"],
                    notSetValue: timestamp,
                    updater: (value) => timestamp
                },
                trackingTime_data: {
                    keyPath: ["trackingTime"],
                    notSetValue: timestamp,
                    updater: (value) => timestamp
                },
                schedule_data: {
                    keyPath: ["schedule"],
                    notSetValue: fromJS({
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    }),
                    updater: (value) => fromJS({
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    })
                },
                category_data: {
                    keyPath: ["category"],
                    notSetValue: "cate_0",
                    updater: (value) => "cate_0"
                },
                repeat_data: {
                    keyPath: ["repeat"],
                    notSetValue: fromJS({
                        type: "daily",
                        interval: {
                            value: 1
                        }
                    }),
                    updater: (value) => fromJS({
                        type: "daily",
                        interval: {
                            value: 1
                        }
                    })
                },
                end_data: {
                    keyPath: ["end"],
                    notSetValue: fromJS({
                        type: "never"
                    }),
                    updater: (value) => fromJS({
                        type: "never"
                    })
                },
                priority_data: {
                    keyPath: ["priority"],
                    notSetValue: fromJS({
                        value: "pri_01",
                        reward: 0,
                    }),
                    updater: (value) => fromJS({
                        value: "pri_01",
                        reward: 0,
                    })
                },
                goal_data: {
                    keyPath: ["goal"],
                    notSetValue: fromJS({
                        max: 1,
                        current: 0
                    }),
                    updater: (value) => fromJS({
                        max: 1,
                        current: 0
                    })
                },
            }
            
            this.props.updateThunk(sending_obj)
        }

        let currentWeekTask = this.props.currentWeekTask

        // if (!currentWeekTask.startTime || !currentWeekTask.schedule || !currentWeekTask.trackingTime
        //     || !currentWeekTask.repeat || !currentWeekTask.end || !currentWeekTask.category || !currentWeekTask.priority || !currentWeekTask.goal) {
        //     let data = {},
        //         date = new Date(),
        //         week = this.getWeek(date)

        //     data.startTime = date.getTime()
        //     data.trackingTime = data.startTime
        //     data.schedule = {
        //         day: this.getMonday(date).getDate(),
        //         week,
        //         month: this.getMonday(date).getMonth(),
        //         year: this.getMonday(date).getFullYear(),
        //         noWeekInMonth: this.getNoWeekInMonth(date),
        //     }
        //     data.category = "cate_0"
        //     data.repeat = {
        //         type: "weekly-w",
        //         interval: {
        //             value: 1
        //         }
        //     }
        //     data.end = {
        //         type: "never"
        //     }
        //     data.priority = {
        //         value: "pri_01",
        //         reward: 0,
        //     }
        //     data.goal = {
        //         max: 1,
        //         current: 0
        //     }

        //     this.props.updateAccordingTask("UPDATE_NEW_WEEK_TASK", data)
        // }

        let currentMonthTask = this.props.currentMonthTask

        // if (!currentMonthTask.startTime || !currentMonthTask.schedule || !currentMonthTask.trackingTime
        //     || !currentMonthTask.repeat || !currentMonthTask.end || !currentMonthTask.category || !currentMonthTask.priority || !currentMonthTask.goal) {
        //     let data = {},
        //         date = new Date()


        //     data.startTime = date.getTime()
        //     data.trackingTime = data.startTime
        //     data.schedule = {
        //         month: date.getMonth(),
        //         year: date.getFullYear()
        //     }
        //     data.category = "cate_0"
        //     data.repeat = {
        //         type: "monthly-m",
        //         interval: {
        //             value: 1
        //         }
        //     }
        //     data.end = {
        //         type: "never"
        //     }
        //     data.priority = {
        //         value: "pri_01",
        //         reward: 0,
        //     }
        //     data.goal = {
        //         max: 1,
        //         current: 0
        //     }

        //     this.props.updateAccordingTask("UPDATE_NEW_MONTH_TASK", data)
        // }
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
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <DismissElement
                        toggleAddTask={this.props.toggleAddTask}
                        disableAllTabs={this.disableAllTabs}
                        addTaskMenuChosen={this.state.addTaskMenuChosen}

                    />

                    {
                        this.state.addTaskMenuChosen ?
                            <AddTaskPanel
                                chooseCalenderOption={this.chooseCalenderOption}
                                chosenCategoryOption={this.chosenCategoryOption}
                                chooseGoalOption={this.chooseGoalOption}
                                choosePriorityOption={this.choosePriorityOption}

                                setCurrentAnnotation={this.setCurrentAnnotation}
                                currentAnnotation={this.state.currentAnnotation}

                                toggleAddTask={this.props.toggleAddTask}
                            />
                            :

                            <>
                                {/* Calendar Panel */}
                                {this.state.calendarChosen ?
                                    <Calendar
                                        currentAnnotation={this.state.currentAnnotation}
                                        calendarChosen={this.state.calendarChosen}

                                        disableAllTabs={this.disableAllTabs}
                                    />

                                    :

                                    <>
                                        {/* Category Panel */}
                                        {this.state.categoryChosen ?
                                            <Category
                                                currentAnnotation={this.state.currentAnnotation}
                                                edit={false}
                                                hideAction={this.disableAllTabs}
                                            />
                                            :

                                            <>
                                                {/* Repeat Panel */}
                                                {this.state.goalChosen ?
                                                    <Goal
                                                        currentAnnotation={this.state.currentAnnotation}
                                                        edit={false}
                                                        hideAction={this.disableAllTabs}
                                                    />

                                                    :

                                                    <>
                                                        {/* Priority Panel */}
                                                        {this.state.priorityChosen ?
                                                            <Priority
                                                                currentAnnotation={this.state.currentAnnotation}
                                                                edit={false}
                                                                hideAction={this.disableAllTabs}
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
                </View>
            </Modal>
        )
    }
}