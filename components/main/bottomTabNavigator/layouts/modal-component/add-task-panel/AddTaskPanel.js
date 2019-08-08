import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView
} from 'react-native';


let dayAnnotationColor = '#b0b0b0',
    weekAnnotationColor = '#9a9a9a',
    monthAnnotationColor = '#848484'

export default class AddTaskPanel extends Component {
    taskTextInputRef = React.createRef()

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        dayAnnotationColor: dayAnnotationColor,
        weekAnnotationColor: weekAnnotationColor,
        monthAnnotationColor: monthAnnotationColor,
        AddTaskPanelDisplayProperty: 'flex',
        keyboardHeight: 0,

        tag_data: []
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }

    disableAddTaskPanel = () => {
        this.setState({
            AddTaskPanelDisplayProperty: 'none'
        })
    }

    chooseDayAnno = () => {
        this.chooseAnnotation("day")
    }

    chooseWeekAnno = () => {
        this.chooseAnnotation("week")
    }

    chooseMonthAnno = () => {
        this.chooseAnnotation("month")
    }

    chooseAnnotation = (annotation) => {
        if (annotation === "day") {
            this.setState({
                dayAnnotationColor: "black",
                weekAnnotationColor: weekAnnotationColor,
                monthAnnotationColor: monthAnnotationColor,
            })

            this.props.updateType("UPDATE_NEW_DAY_TASK", annotation)

        }

        else if (annotation === "week") {
            this.setState({
                dayAnnotationColor: dayAnnotationColor,
                weekAnnotationColor: "black",
                monthAnnotationColor: monthAnnotationColor,
            })

            this.props.updateType("UPDATE_NEW_WEEK_TASK", annotation)
        }

        else {
            this.setState({
                dayAnnotationColor: dayAnnotationColor,
                weekAnnotationColor: weekAnnotationColor,
                monthAnnotationColor: "black",
            })

            this.props.updateType("UPDATE_NEW_MONTH_TASK", annotation)
        }

        this.props.setCurrentAnnotation(annotation)
    }

    toDoWhenWillShowKeyboard = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    }

    addTagDataToRender = (type, { startTime, schedule, repeat, end, category, priority, goal }) => {
        let tag_data = []

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
                    let value = repeat.interval.value / 86400 / 1000
                    tag_data.push(
                        <TagElement
                            key="tag-repeat"
                            content={`every ${value} day(s)`}
                        />
                    )
                }

                else if (repeat.type === "weekly") {
                    let value = repeat.interval.value / 86400 / 1000 / 7
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

            if(end){
                if(end.type === "never"){
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`never end`}
                        />
                    )
                }

                else if (end.type === "on"){
                    let end_date = new Date(end.endAt)
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end at ${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]}`}
                        />
                    )
                }

                else if (end.type === "after"){
                    tag_data.push(
                        <TagElement
                            key="tag-end"
                            content={`end after ${end.occurrence} occurrences`}
                        />
                    )
                }
            }

            if (category) {
                let cate = this.props.categories[category].name
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
                    let value = repeat.interval.value / 86400 / 1000 / 7
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

            if (category) {
                let cate = this.props.categories[category].name
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

            if (category) {
                let cate = this.props.categories[category].name
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
        // Load data from currentDayTask object first
        this.chooseAnnotation('day')

        this.addTagDataToRender("day", this.props.currentDayTask)

        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.toDoWhenWillShowKeyboard
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
            <KeyboardAvoidingView style={{
                position: "absolute",
                width: Dimensions.get('window').width,
                bottom: this.state.keyboardHeight,
                display: this.state.AddTaskPanelDisplayProperty,
                height: 300,
            }}>
                <View style={{
                    height: 100,
                    position: 'relative',
                    flexDirection: "row",
                }}>
                    <TouchableHighlight
                        style={{
                            position: 'absolute',
                            height: 100,
                            width: Dimensions.get('window').width,
                            backgroundColor: this.state.dayAnnotationColor,
                            borderTopLeftRadius: 20,
                        }}

                        onPress={this.chooseDayAnno}
                        underlayColor="transparent"
                    >
                        <Text style={{
                            color: "white",
                            marginTop: 10,
                            marginLeft: 50,
                            fontSize: 20,
                            fontWeight: "500",
                        }}>Day</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            position: 'absolute',
                            width: Dimensions.get('window').width * 2 / 3,
                            left: Dimensions.get('window').width * 1 / 3,
                            height: 100,
                            backgroundColor: this.state.weekAnnotationColor,
                            borderTopLeftRadius: 20,
                        }}

                        onPress={this.chooseWeekAnno}
                        underlayColor="transparent"
                    >
                        <Text style={{
                            color: "white",
                            marginTop: 10,
                            marginLeft: 50,
                            fontSize: 20,
                            fontWeight: "500",
                        }}>Week</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            width: Dimensions.get('window').width * 1 / 3,
                            left: Dimensions.get('window').width * 2 / 3,
                            height: 100,
                            backgroundColor: this.state.monthAnnotationColor,
                            borderTopLeftRadius: 20,
                        }}

                        onPress={this.chooseMonthAnno}
                        underlayColor="transparent"
                    >
                        <Text style={{
                            color: "white",
                            marginTop: 10,
                            marginLeft: 50,
                            fontSize: 20,
                            fontWeight: "500",
                        }}>Month</Text>
                    </TouchableHighlight>
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 250,
                    width: Dimensions.get('window').width,
                    backgroundColor: 'white',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingTop: 10,
                    paddingBottom: 50,
                    overflow: "scroll"
                }}>
                    <ScrollView>
                        <TaskTitleElement
                            setTaskTextInputRef={this.setTaskTextInputRef}
                            taskTextInputRef={this.taskTextInputRef}
                            currentAnnotation={this.props.currentAnnotation}
                            updateTitle={this.props.updateTitle}
                        />

                        <TaskDescriptionElement
                            currentAnnotation={this.props.currentAnnotation}
                            updateDescription={this.props.updateDescription}
                        />

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

                    </ScrollView>

                    <View style={{
                        position: "absolute",
                        bottom: 0,
                        height: 50,
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
                            chooseOption={this.props.addTaskButtonActionProp}
                            taskTextInputRef={this.taskTextInputRef}
                            disableAddTaskPanel={this.disableAddTaskPanel}
                            title="Ok"
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}




class TaskTitleElement extends React.PureComponent {
    constructor(props) {
        super(props)

        this.textInputRef = React.createRef()
    }

    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text
        })

    }

    setTaskTextInputRef = (ref) => {
        this.props.setTaskTextInputRef(ref)
        this.textInputRef = ref
    }

    _onLayout = () => {
        setTimeout(() => { this.textInputRef.focus() }, 50)

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            if (this.props.currentAnnotation === "day") {
                this.props.updateTitle("UPDATE_NEW_DAY_TASK", this.state.value)
            }

            else if (this.props.currentAnnotation === "week") {
                this.props.updateTitle("UPDATE_NEW_WEEK_TASK", this.state.value)
            }

            else if (this.props.currentAnnotation === "month") {
                this.props.updateTitle("UPDATE_NEW_MONTH_TASK", this.state.value)
            }
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: 20,
                marginTop: 10,
            }}>
                <Text
                    style={{
                        fontSize: 12,
                        color: 'gainsboro',
                    }}
                >
                    Task Title
                </Text>
                <TextInput
                    ref={this.setTaskTextInputRef}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        borderBottomColor: 'gainsboro',
                        borderBottomWidth: 1,

                    }}
                    placeholder="Add a task here"
                    autoCorrect={false}
                    value={this.state.value}
                    onChange={this._onChange}
                    onLayout={this._onLayout}
                />
            </View>
        )
    }
}

class TaskDescriptionElement extends React.PureComponent {
    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            if (this.props.currentAnnotation === "day") {
                this.props.updateDescription("UPDATE_NEW_DAY_TASK", this.state.value)
            }

            else if (this.props.currentAnnotation === "week") {
                this.props.updateDescription("UPDATE_NEW_WEEK_TASK", this.state.value)
            }

            else if (this.props.currentAnnotation === "month") {
                this.props.updateDescription("UPDATE_NEW_MONTH_TASK", this.state.value)
            }
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                margin: 20,
            }}>
                <Text style={{
                    fontSize: 12,
                    color: 'gainsboro',
                }}>
                    Task Description
                </Text>
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 16,
                        borderBottomColor: 'gainsboro',
                        borderBottomWidth: 1,
                    }}

                    placeholder="Add task description"
                    autoCorrect={false}
                    value={this.state.value}
                    onChange={this._onChange}
                />
            </View>
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

    _onPress = () => {
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

