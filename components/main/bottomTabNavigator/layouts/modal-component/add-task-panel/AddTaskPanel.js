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

import TaskAnnotationTypeHolder from './task-annotation-type-holder/TaskAnnotationTypeHolder.Container'
import TitleAndDescriptionHolder from './title-and-description-holder/TitleAndDescriptionHolder.Container'
import { Map } from 'immutable'

import { styles } from './styles/styles'

const uuidv1 = require('uuid')

export default class AddTaskPanel extends Component {
    taskTextInputRef = React.createRef()

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    translateY_value = new Animated.Value(0)
    opacity_value = new Animated.Value(0)

    state = {
        AddTaskPanelDisplayProperty: 'flex',
        tag_data: [],
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }


    disableAddTaskPanel = () => {
        this.setState({
            AddTaskPanelDisplayProperty: 'none'
        })
    }

    toDoWhenWillShowKeyboard = (e) => {
        Animated.parallel([
            Animated.timing(
                this.translateY_value,
                {
                    toValue: - e.endCoordinates.height,
                    duration: e.duration,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.opacity_value,
                {
                    toValue: 1,
                    duration: e.duration,
                    useNativeDriver: true
                }
            )
        ],
        ).start()
    }


    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000)).getDate()
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday = this.getMonday(date)
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    addTagDataToRender = (type, { startTime, schedule, repeat, end, category, priority, goal }) => {
        let tag_data = [],
            categories_map = Map(this.props.categories)

        if (type === "day") {
            if (schedule && startTime) {
                let date = new Date(startTime)
                tag_data.push(
                    <TagElement
                        key="tag-start-time"
                        content={`${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${this.monthNames[date.getMonth()]}`}
                    />
                )
            }

            if (repeat) {
                if (repeat.type === "daily") {
                    let value = repeat.interval.value
                    tag_data.push(
                        <TagElement
                            key="tag-repeat"
                            content={`every ${value} day(s)`}
                        />
                    )
                }

                else if (repeat.type === "weekly") {
                    let value = repeat.interval.value
                    tag_data.push(
                        <TagElement
                            key="tag-repeat"
                            content={`every ${value} week(s)`}
                        />
                    )
                }

                else if (repeat.type === "monthly") {
                    let value = repeat.interval.value
                    tag_data.push(
                        <TagElement
                            key="tag-repeat"
                            content={`every ${value} month(s)`}
                        />
                    )
                }


            }

            if (end) {
                if (end.type === "never") {
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`never end`}
                        />
                    )
                }

                else if (end.type === "on") {
                    let end_date = new Date(end.endAt)
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end at ${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]}`}
                        />
                    )
                }

                else if (end.type === "after") {
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end after ${end.occurrence} occurrences`}
                        />
                    )
                }
            }

            if (category) {
                let cate = categories_map.get(category).name
                tag_data.push(
                    <TagElement
                        key="tag-category"
                        content={`${cate}`}
                    />
                )
            }

            if (priority) {
                let prio = this.props.priorities[priority.value].name
                tag_data.push(
                    <TagElement
                        key="tag-priority"
                        content={`${prio}`}
                    />
                )

                if (parseInt(priority.reward) > 0) {
                    let { reward } = priority
                    tag_data.push(
                        <TagElement
                            key="tag-reward"
                            content={`${reward}`}
                        />
                    )
                }
            }

            if (goal) {
                let value = goal.max
                tag_data.push(
                    <TagElement
                        key="tag-goal"
                        content={`${value} time(s) per ${type}(s)`}
                    />
                )
            }
        }

        else if (type === "week") {
            if (schedule && startTime) {
                let end_day_of_week = new Date(startTime + 86400 * 1000 * 6),
                    date = new Date(startTime)
                tag_data.push(
                    <TagElement
                        key="tag-start-time"
                        content={`Week ${schedule.week} (${date.getDate()} ${this.month_names_in_short[date.getMonth()]} - ${end_day_of_week.getDate()} ${this.month_names_in_short[end_day_of_week.getMonth()]})`}
                    />
                )
            }

            if (repeat) {
                if (repeat.type === "weekly-w") {
                    let value = repeat.interval.value
                    tag_data.push(
                        <TagElement
                            key="tag-repeat"
                            content={`every ${value} week(s)`}
                        />
                    )
                }

                else if (repeat.type === "monthly-w") {
                    let value = repeat.interval.value
                    tag_data.push(
                        <TagElement
                            key="tag-repeat"
                            content={`every ${value} month(s)`}
                        />
                    )
                }
            }

            if (end) {
                if (end.type === "never") {
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`never end`}
                        />
                    )
                }

                else if (end.type === "on") {
                    let end_date = new Date(end.endAt)
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end at ${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]}`}
                        />
                    )
                }

                else if (end.type === "after") {
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end after ${end.occurrence} occurrences`}
                        />
                    )
                }
            }

            if (category) {
                let cate = categories_map.get(category).name
                tag_data.push(
                    <TagElement
                        key="tag-category"
                        content={`${cate}`}
                    />
                )
            }

            if (priority) {
                let prio = this.props.priorities[priority.value].name
                tag_data.push(
                    <TagElement
                        key="tag-priority"
                        content={`${prio}`}
                    />
                )

                if (parseInt(priority.reward) > 0) {
                    let { reward } = priority
                    tag_data.push(
                        <TagElement
                            key="tag-reward"
                            content={`${reward}`}
                        />
                    )
                }
            }

            if (goal) {
                let value = goal.max
                tag_data.push(
                    <TagElement
                        key="tag-goal"
                        content={`${value} time(s) per ${type}(s)`}
                    />
                )
            }
        }

        else if (type === "month") {
            if (schedule && startTime) {
                tag_data.push(
                    <TagElement
                        key="tag-start-time"
                        content={`${this.monthNames[schedule.month]} ${schedule.year}`}
                    />
                )
            }

            if (repeat) {
                let value = repeat.interval.value
                tag_data.push(
                    <TagElement
                        key="tag-repeat"
                        content={`every ${value} month(s)`}
                    />
                )
            }

            if (end) {
                if (end.type === "never") {
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`never end`}
                        />
                    )
                }

                else if (end.type === "on") {
                    let end_date = new Date(end.endAt)
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end at ${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]}`}
                        />
                    )
                }

                else if (end.type === "after") {
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end after ${end.occurrence} occurrences`}
                        />
                    )
                }
            }

            if (category) {
                let cate = categories_map.get(category).name
                tag_data.push(
                    <TagElement
                        key="tag-category"
                        content={`${cate}`}
                    />
                )
            }

            if (priority) {
                let prio = this.props.priorities[priority.value].name
                tag_data.push(
                    <TagElement
                        key="tag-priority"
                        content={`${prio}`}
                    />
                )

                if (parseInt(priority.reward) > 0) {
                    let { reward } = priority
                    tag_data.push(
                        <TagElement
                            key="tag-reward"
                            content={`${reward}`}
                        />
                    )
                }
            }

            if (goal) {
                let value = goal.max
                tag_data.push(
                    <TagElement
                        key="tag-goal"
                        content={`${value} time(s) per ${type}(s)`}
                    />
                )
            }
        }

        this.setState({
            tag_data: [...tag_data]
        })
    }

    componentDidMount() {
        // Load the current annotation from redux store
        if (this.props.currentAnnotation === "day") {
            this.addTagDataToRender("day", this.props.currentDayTask)
        }

        else if (this.props.currentAnnotation === "week") {
            this.addTagDataToRender("week", this.props.currentDayTask)
        }

        else if (this.props.currentAnnotation === "month") {
            this.addTagDataToRender("month", this.props.currentDayTask)
        }

        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.toDoWhenWillShowKeyboard,
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentAnnotation !== prevProps.currentAnnotation) {
            if (this.props.currentAnnotation === "day") {
                this.addTagDataToRender("day", this.props.currentDayTask)
            }

            else if (this.props.currentAnnotation === "week") {
                this.addTagDataToRender("week", this.props.currentWeekTask)
            }

            if (this.props.currentAnnotation === "month") {
                this.addTagDataToRender("month", this.props.currentMonthTask)
            }
        }

        else {
            if (this.props.currentAnnotation === "day") {
                if (this.props.currentDayTask !== prevProps.currentDayTask) {
                    this.addTagDataToRender("day", this.props.currentDayTask)
                }
            }

            else if (this.props.currentAnnotation === "week") {
                if (this.props.currentWeekTask !== prevProps.currentWeekTask) {
                    this.addTagDataToRender("week", this.props.currentWeekTask)
                }
            }

            if (this.props.currentAnnotation === "month") {
                if (this.props.currentMonthTask !== prevProps.currentMonthTask) {
                    this.addTagDataToRender("month", this.props.currentMonthTask)
                }
            }
        }
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', this.toDoWhenWillShowKeyboard)
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: "absolute",
                    width: Dimensions.get('window').width,
                    bottom: 0,
                    transform: [{ translateY: this.translateY_value }],
                    display: this.state.AddTaskPanelDisplayProperty,
                    height: 409,
                    backgroundColor: "white",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    opacity: this.opacity_value,
                    backgroundColor: "#FFFFFF",
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowRadius: 15,
                    shadowColor: "rgba(0, 0, 0, 0.06)"
                }}
            >
                <TaskAnnotationTypeHolder
                    setCurrentAnnotation={this.props.setCurrentAnnotation}
                    currentAnnotation={this.props.currentAnnotation}
                />

                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={{
                        flex: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <TitleAndDescriptionHolder
                        currentAnnotation={this.props.currentAnnotation}
                        setTaskTextInputRef={this.setTaskTextInputRef}
                    />

                    <View
                        style={{
                            flex: 2,
                        }}
                    >
                        <View
                            style={{
                                flexWrap: "wrap",
                                flexDirection: "row",
                                paddingHorizontal: 33,
                                paddingBottom: 20,
                            }}
                        >
                            {this.state.tag_data}
                        </View>

                    </View>

                </ScrollView>

                <View style={{
                    height: 57,
                    width: Dimensions.get("window").width,
                    borderTopWidth: 1,
                    borderTopColor: "black",
                    backgroundColor: "gainsboro",
                    flexDirection: 'row'
                }}>

                    <BottomOptionElement
                        chooseOption={this.props.chooseCalenderOption}
                        taskTextInputRef={this.taskTextInputRef}
                        disableAddTaskPanel={this.disableAddTaskPanel}
                        title="Cal"
                    />

                    <BottomOptionElement
                        chooseOption={this.props.chosenCategoryOption}
                        taskTextInputRef={this.taskTextInputRef}
                        disableAddTaskPanel={this.disableAddTaskPanel}
                        title="Cat"
                    />

                    <BottomOptionElement
                        chooseOption={this.props.choosePriorityOption}
                        taskTextInputRef={this.taskTextInputRef}
                        disableAddTaskPanel={this.disableAddTaskPanel}
                        title="Pri"
                    />

                    <BottomOptionElement
                        chooseOption={this.props.chooseGoalOption}
                        taskTextInputRef={this.taskTextInputRef}
                        disableAddTaskPanel={this.disableAddTaskPanel}
                        title="Goal"
                    />

                    <BottomOptionElement
                        chooseOption={this.props.toggleAddTask}
                        taskTextInputRef={this.taskTextInputRef}
                        disableAddTaskPanel={this.disableAddTaskPanel}
                        {... this.props}

                        title_value={this.props.addTaskTitle}
                        description_value={this.props.addTaskDescription}

                        updateTitle={this.props.updateTitle}
                        updateDescription={this.props.updateDescription}

                        title="Ok"
                    />
                </View>

            </Animated.View>
        )
    }
}



class TagElement extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    height: 37,
                    paddingHorizontal: 25,
                    marginRight: 11,
                    marginTop: 26,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "black",
                    borderRadius: 30,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 16
                    }}
                >
                    {this.props.content}
                </Text>
            </View>
        )
    }
}


class BottomOptionElement extends React.PureComponent {

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
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000)).getDate()
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday = this.getMonday(date)
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    _onPress = () => {
        if (this.props.addTaskThunk && this.props.title_value.length > 0) {
            let add_data = {},
                date = new Date(),
                reset_data = {},
                add_task_action = "",
                update_task_action = ""

            if (this.props.currentAnnotation === "day") {
                add_data = {
                    ... this.props.currentDayTask, ... {
                        createdAt: date.getTime(),
                        id: uuidv1(),
                        title: this.props.title_value,
                        description: this.props.description_value
                    }
                }

                add_task_action = "ADD_NEW_DAY_TASK"

                reset_data = {
                    title: "",
                    description: "",
                    startTime: date.getTime(),
                    trackingTime: date.getTime(),
                    type: "day",
                    schedule: {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    },
                    category: "cate_0",
                    repeat: {
                        type: "daily",
                        interval: {
                            value: 1
                        }
                    },
                    end: {
                        type: "never"
                    },
                    priority: {
                        value: "pri_01",
                        reward: 0,
                    },
                    goal: {
                        max: 1,
                    }
                }
                update_task_action = "UPDATE_NEW_DAY_TASK"
            }

            else if (this.props.currentAnnotation === "week") {

                add_data = {
                    ... this.props.currentWeekTask, ... {
                        createdAt: date.getTime(),
                        id: uuidv1(),
                        title: this.props.title_value,
                        description: this.props.description_value
                    }
                }

                add_task_action = "ADD_NEW_WEEK_TASK"

                reset_data = {
                    title: "",
                    description: "",
                    startTime: date.getTime(),
                    trackingTime: date.getTime(),
                    type: "week",
                    schedule: {
                        day: date.getDate(),
                        week: this.getWeek(date),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        noWeekInMonth: this.getNoWeekInMonth(date)
                    },
                    category: "cate_0",
                    repeat: {
                        type: "weekly-w",
                        interval: {
                            value: 1
                        }
                    },
                    end: {
                        type: "never"
                    },
                    priority: {
                        value: "pri_01",
                        reward: 0,
                    },
                    goal: {
                        max: 1,
                    }
                }

                update_task_action = "UPDATE_NEW_WEEK_TASK"
            }

            else if (this.props.currentAnnotation === "month") {

                add_data = {
                    ... this.props.currentMonthTask, ... {
                        createdAt: date.getTime(),
                        id: uuidv1(),
                        title: this.props.title_value,
                        description: this.props.description_value
                    }
                }

                add_task_action = "ADD_NEW_MONTH_TASK"

                reset_data = {
                    title: "",
                    description: "",
                    startTime: date.getTime(),
                    trackingTime: date.getTime(),
                    type: "month",
                    schedule: {
                        month: date.getMonth(),
                        year: date.getFullYear()
                    },
                    category: "cate_0",
                    repeat: {
                        type: "monthly-m",
                        interval: {
                            value: 1
                        }
                    },
                    end: {
                        type: "never"
                    },
                    priority: {
                        value: "pri_01",
                        reward: 0,
                    },
                    goal: {
                        max: 1,
                    }
                }

                update_task_action = "UPDATE_NEW_MONTH_TASK"
            }

            if (add_data.category) {
                let category_key = add_data.category
                let category_data = { ...Map(this.props.categories).get(category_key) }

                if (category_data.hasOwnProperty("quantity"))
                    category_data.quantity += 1
                else
                    category_data.quantity = 1

                let sending_obj = {
                    category_key,
                    category_data,
                    add_task_action,
                    add_data,
                    update_task_action,
                    reset_data,
                    description: "",
                    title: ""
                }

                this.props.addTaskThunk(sending_obj)
            }
        }

        this.props.chooseOption()
        this.props.taskTextInputRef.blur()
        this.props.disableAddTaskPanel()
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                }}

                onPress={this._onPress}
                activeOpacity={0.5}
                underlayColor="gainsboro"
            >
                <Text>{this.props.title}</Text>
            </TouchableHighlight>
        )
    }
}

