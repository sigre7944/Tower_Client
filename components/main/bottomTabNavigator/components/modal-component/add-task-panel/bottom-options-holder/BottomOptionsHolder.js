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
    faFlag,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { primary_color } from "../../../../../../shared/styles/style";

import { styles } from "./styles/styles";

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
                    chooseOption={this.props.chosenCategoryOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faList}
                />

                <BottomOptionElement
                    chooseOption={this.props.choosePriorityOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faExclamationTriangle}
                />

                <BottomOptionElement
                    chooseOption={this.props.chooseGoalOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faFlag}
                />

                <BottomConfirmElement
                    chooseOption={this.props.toggleAddTask}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    {... this.props}

                    title_value={this.props.addTaskTitle}
                    description_value={this.props.addTaskDescription}

                    updateTitle={this.props.updateTitle}
                    updateDescription={this.props.updateDescription}

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

    render() {
        return (
            <TouchableOpacity
                style={styles.confirm_container}
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

// class BottomOptionElement extends React.PureComponent {
//     getWeek = (date) => {
//         let target = new Date(date);
//         let dayNr = (date.getDay() + 6) % 7;
//         target.setDate(target.getDate() - dayNr + 3);
//         let firstThursday = target.valueOf();
//         target.setMonth(0, 1);
//         if (target.getDay() != 4) {
//             target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
//         }
//         return 1 + Math.ceil((firstThursday - target) / 604800000);
//     }

//     getMonday = (date) => {
//         let dayInWeek = new Date(date).getDay()
//         let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
//         return new Date(new Date(date).getTime() - (diff * 86400 * 1000)).getDate()
//     }

//     getNoWeekInMonth = (date) => {
//         let nearest_monday = this.getMonday(date)
//         let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

//         return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
//     }

//     _onPress = () => {
//         if (this.props.addTaskThunk && this.props.title_value.length > 0) {
//             let add_data = {},
//                 date = new Date(),
//                 reset_data = {},
//                 add_task_action = "",
//                 update_task_action = ""

//             if (this.props.currentAnnotation === "day") {
//                 add_data = {
//                     ... this.props.currentDayTask, ... {
//                         createdAt: date.getTime(),
//                         id: uuidv1(),
//                         title: this.props.title_value,
//                         description: this.props.description_value
//                     }
//                 }

//                 add_task_action = "ADD_NEW_DAY_TASK"

//                 reset_data = {
//                     title: "",
//                     description: "",
//                     startTime: date.getTime(),
//                     trackingTime: date.getTime(),
//                     type: "day",
//                     schedule: {
//                         day: date.getDate(),
//                         month: date.getMonth(),
//                         year: date.getFullYear()
//                     },
//                     category: "cate_0",
//                     repeat: {
//                         type: "daily",
//                         interval: {
//                             value: 1
//                         }
//                     },
//                     end: {
//                         type: "never"
//                     },
//                     priority: {
//                         value: "pri_01",
//                         reward: 0,
//                     },
//                     goal: {
//                         max: 1,
//                     }
//                 }
//                 update_task_action = "UPDATE_NEW_DAY_TASK"
//             }

//             else if (this.props.currentAnnotation === "week") {

//                 add_data = {
//                     ... this.props.currentWeekTask, ... {
//                         createdAt: date.getTime(),
//                         id: uuidv1(),
//                         title: this.props.title_value,
//                         description: this.props.description_value
//                     }
//                 }

//                 add_task_action = "ADD_NEW_WEEK_TASK"

//                 reset_data = {
//                     title: "",
//                     description: "",
//                     startTime: date.getTime(),
//                     trackingTime: date.getTime(),
//                     type: "week",
//                     schedule: {
//                         day: date.getDate(),
//                         week: this.getWeek(date),
//                         month: date.getMonth(),
//                         year: date.getFullYear(),
//                         noWeekInMonth: this.getNoWeekInMonth(date)
//                     },
//                     category: "cate_0",
//                     repeat: {
//                         type: "weekly-w",
//                         interval: {
//                             value: 1
//                         }
//                     },
//                     end: {
//                         type: "never"
//                     },
//                     priority: {
//                         value: "pri_01",
//                         reward: 0,
//                     },
//                     goal: {
//                         max: 1,
//                     }
//                 }

//                 update_task_action = "UPDATE_NEW_WEEK_TASK"
//             }

//             else if (this.props.currentAnnotation === "month") {

//                 add_data = {
//                     ... this.props.currentMonthTask, ... {
//                         createdAt: date.getTime(),
//                         id: uuidv1(),
//                         title: this.props.title_value,
//                         description: this.props.description_value
//                     }
//                 }

//                 add_task_action = "ADD_NEW_MONTH_TASK"

//                 reset_data = {
//                     title: "",
//                     description: "",
//                     startTime: date.getTime(),
//                     trackingTime: date.getTime(),
//                     type: "month",
//                     schedule: {
//                         month: date.getMonth(),
//                         year: date.getFullYear()
//                     },
//                     category: "cate_0",
//                     repeat: {
//                         type: "monthly-m",
//                         interval: {
//                             value: 1
//                         }
//                     },
//                     end: {
//                         type: "never"
//                     },
//                     priority: {
//                         value: "pri_01",
//                         reward: 0,
//                     },
//                     goal: {
//                         max: 1,
//                     }
//                 }

//                 update_task_action = "UPDATE_NEW_MONTH_TASK"
//             }

//             if (add_data.category) {
//                 let category_key = add_data.category
//                 let category_data = { ...Map(this.props.categories).get(category_key) }

//                 if (category_data.hasOwnProperty("quantity"))
//                     category_data.quantity += 1
//                 else
//                     category_data.quantity = 1

//                 let sending_obj = {
//                     category_key,
//                     category_data,
//                     add_task_action,
//                     add_data,
//                     update_task_action,
//                     reset_data,
//                     description: "",
//                     title: ""
//                 }

//                 this.props.addTaskThunk(sending_obj)
//             }
//         }

//         this.props.chooseOption()
//         this.props.taskTextInputRef.blur()
//         this.props.disableAddTaskPanel()
//     }

//     render() {
//         return (
//             <TouchableOpacity
//                 style={{
//                     flex: 1,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: 10,
//                 }}

//                 onPress={this._onPress}
//                 activeOpacity={0.5}
//                 underlayColor="gainsboro"
//             >

//                 <FontAwesomeIcon 
//                     icon={faCalendarAlt}
//                     color={primary_color}
//                 />
//             </TouchableOpacity>
//         )
//     }
// }