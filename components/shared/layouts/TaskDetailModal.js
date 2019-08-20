import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Dimensions, Image, TextInput, ScrollView, Platform, Modal as RNModal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import DayCalendar from '../calendar/day-calendar/DayCalendar.Container'
import WeekCalendar from '../calendar/week-calendar/WeekCalendar.Container'
import Category from '../category/Category.Container'
import Priority from '../priority/Priority.Container'
import Repeat from '../repeat/Repeat.Container'
import Goal from '../goal/Goal.Container'

export default class TaskDetailModal extends Component {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    edit_task = this.props.task_data

    state = {
        isOpened: false,
        isEditing: false,
        day_in_week_text: "",
        date_number: "",
        month_text: "",
        category: "",
        priority: "",
        repeat: "",
        goal: "",

        should_update: 0,
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    toggleEdit = (visible) => {
        this.setState(() => ({ isEditing: visible }));
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.isOpened !== prevProps.isOpened) {
            if (this.props.isOpened) {
                this.openModal()
            }
            else {
                this.closeModal()
            }
        }

        if (this.props.task_data !== prevProps.task_data) {
            this.edit_task = this.props.task_data

            let edit_task = this.edit_task,
                date = new Date(edit_task.startTime),
                day_in_week_text = this.daysInWeekText[date.getDay()],
                date_number = date.getDate(),
                month_text = this.monthNames[date.getMonth()],
                category = edit_task.category ? this.props.categories[edit_task.category].name : "",
                priority = edit_task.priority ? this.props.priorities[edit_task.priority.value].name : "",
                repeat,
                goal = edit_task.goal ? `${edit_task.goal.max} times` : ""

            if (edit_task.repeat) {
                if (edit_task.repeat.type === "daily") {
                    repeat = `Every ${edit_task.repeat.interval.value / (86400 * 1000)} day(s)`
                }

                else if (edit_task.repeat.type === "weekly") {
                    repeat = `Every ${edit_task.repeat.interval.value / (86400 * 1000 * 7)} week(s)`
                }

                else if (edit_task.repeat.type === "monthly") {
                    repeat = `Every ${edit_task.repeat.interval.value} month(s)`
                }
            }

            this.setState({
                day_in_week_text,
                date_number,
                month_text,
                category,
                priority,
                repeat,
                goal,
            })
        }
    }

    openModal = () => {
        this.refs.taskInfoModal.open()
    }

    closeModal = () => {
        this.refs.taskInfoModal.close()

    }

    onClose = () => {
        this.toggleEdit(false)
        this.props.closeModal()
    }


    render() {
        return (
            <Modal
                style={{ marginTop: 50, borderRadius: 10 }}
                backButtonClose={true}
                coverScreen={true}
                isOpen={this.props.isOpened}
                ref={'taskInfoModal'}
                swipeToClose={true}
                swipeArea={500}
                onClosed={this.onClose}
            >

                {!this.state.isEditing ?
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <View style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ alignSelf: 'stretch', flex: 1, zIndex: 10 }}>
                                <View>
                                    <Text style={{ textAlign: 'center' }}><FontAwesome name="minus" style={{ fontSize: 26, color: "grey" }} /></Text>
                                </View>
                                <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => () => this.closeModal()}>
                                        <FontAwesome name={'trash'} style={{ width: 50, height: 50, fontSize: 24, lineHeight: 50 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toggleEdit(true)}>
                                        <FontAwesome name={'edit'} style={{ width: 50, height: 50, fontSize: 24, lineHeight: 50 }} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <CheckBox
                                                center
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={this.props.checked}
                                            />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{this.edit_task.title}</Text>
                                        </View>
                                    </View>
                                    {
                                        this.edit_task.description && this.edit_task.description.length > 0 ?
                                            <View style={styles.container}>
                                                <View style={styles.head}>
                                                    <CheckBox
                                                        center
                                                        checkedIcon='dot-circle-o'
                                                        uncheckedIcon='circle-o'
                                                        checked={this.props.checked}
                                                    />
                                                </View>
                                                <View style={styles.body}>
                                                    <Text style={styles.text}>{this.edit_task.description}</Text>
                                                </View>
                                            </View>

                                            :

                                            <></>
                                    }
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'calendar'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{`${this.state.day_in_week_text} ${this.state.date_number} ${this.state.month_text}`}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'circle'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{this.state.category}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'warning'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{this.state.priority}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'warning'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{this.state.repeat}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'warning'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{this.state.goal}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'link'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>Link enabled</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :

                    <EditDetails
                        task_data={this.edit_task}
                        categories={this.props.categories}
                        priorities={this.props.priorities}
                        hideAction={this.toggleEdit}
                        updateEdittingTask={this.props.updateEdittingTask}
                    />
                }


            </Modal>
        )
    }
}

class EditDetails extends React.PureComponent {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    edit_task = {}
    day_in_week_text = ""
    date_number = ""
    month_text = ""
    category = ""
    priority = ""
    repeat = ""
    goal = ""

    state = {
        title_value: "",
        description_value: "",
        should_visible: false,

        edit_calendar: false,
        edit_category: false,
        edit_repeat: false,
        edit_priority: false,
        edit_goal: false,

        should_update: 0,
    }

    _onChangeTitle = (e) => {
        this.setState({
            title_value: e.nativeEvent.text
        })
    }

    _onChangeDescription = (e) => {
        this.setState({
            description_value: e.nativeEvent.text
        })
    }

    toggleShouldVisible = () => {
        this.setState(prevState => ({
            should_visible: !prevState.should_visible
        }))
    }

    disableAllTabBools = () => {
        this.setState({
            edit_calendar: false,
            edit_category: false,
            edit_repeat: false,
            edit_priority: false,
            edit_goal: false,
        })
    }

    toggleAction = (name) => {
        this.toggleShouldVisible()
        this.disableAllTabBools()

        if (name === "calendar") {
            this.setState({
                edit_calendar: true
            })
        }

        else if (name === "category") {
            this.setState({
                edit_category: true
            })
        }

        else if (name === "repeat") {
            this.setState({
                edit_repeat: true
            })
        }

        else if (name === "priority") {
            this.setState({
                edit_priority: true
            })
        }

        else {
            this.setState({
                edit_goal: true
            })
        }
    }

    setEditTask = (data) => {
        this.edit_task = { ... this.edit_task, ...data }

        this.renderData(this.edit_task)
    }

    save = () => {
        this.props.updateEdittingTask(this.edit_task)

        this.cancel()
    }

    cancel = () => {
        this.props.hideAction()
    }

    renderData = (edit_task) => {
        let { category, repeat, priority, goal, startTime } = edit_task

        let date = new Date(startTime)

        this.day_in_week_text = this.daysInWeekText[date.getDay()]
        this.date_number = date.getDate()
        this.month_text = this.monthNames[date.getMonth()]
        this.category = this.props.categories[category].name
        this.priority = this.props.priorities[priority.value].name
        this.goal = `${goal.max} times`

        if (repeat.type === "daily") {
            this.repeat = `Every ${repeat.interval.value / (86400 * 1000)} day(s)`
        }

        else if (repeat.type === "weekly") {
            this.repeat = `Every ${repeat.interval.value / (86400 * 1000 * 7)} week(s)`
        }

        else if (repeat.type === "monthly") {
            this.repeat = `Every ${repeat.interval.value} month(s)`
        }

        this.setState(prevState => ({
            should_update: prevState.should_update + 1,
        }))
    }

    componentDidMount() {
        this.edit_task = this.props.task_data

        let {title, description} = this.edit_task

        this.setState({
            title_value: title,
            description_value: description ? description: "",
        })

        this.renderData(this.edit_task)
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.props.task_data !== prevProps.task_data) {
        //     if (this.props.task_data.title && this.props.task_data.title.length > 0) {
        //         this.setState({
        //             title_value: this.props.task_data.title
        //         })
        //     }

        //     if (this.props.task_data.description && this.props.task_data.description.length > 0) {
        //         this.setState({
        //             description_value: this.props.task_data.description
        //         })
        //     }
        // }
    }

    render() {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 58,
                        paddingHorizontal: 30,
                        position: "relative",
                    }}
                >
                    <View
                        style={{
                            borderBottomColor: "gainsboro",
                            borderBottomWidth: 1,
                            height: 65,
                            marginBottom: 18,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                lineHeight: 15,
                                color: "rgba(0, 0, 0, 0.25)",
                                marginBottom: 5,
                            }}
                        >
                            Task Title
                            </Text>

                        <TextInput
                            style={{
                                height: 30,
                            }}

                            value={this.state.title_value}
                            onChange={this._onChangeTitle}
                        />
                    </View>

                    <View
                        style={{
                            borderBottomColor: "gainsboro",
                            borderBottomWidth: 1,
                            height: 65,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                lineHeight: 15,
                                color: "rgba(0, 0, 0, 0.25)",
                                marginBottom: 5,
                            }}
                        >
                            Task Description
                            </Text>

                        <TextInput
                            style={{
                                height: 30,
                            }}

                            value={this.state.description_value}
                            onChange={this._onChangeDescription}
                        />
                    </View>

                    <OptionButton
                        content={`${this.day_in_week_text} ${this.date_number} ${this.month_text}`}
                        text_color={"black"}
                        toggleAction={this.toggleAction}
                        name={"calendar"}
                    />
                    <OptionButton
                        content={this.category}
                        text_color={"red"}
                        toggleAction={this.toggleAction}
                        name={"category"}
                    />

                    <OptionButton
                        content={this.priority}
                        text_color={"red"}
                        toggleAction={this.toggleAction}
                        name={"priority"}
                    />

                    <OptionButton
                        content={this.repeat}
                        text_color={"black"}
                        toggleAction={this.toggleAction}
                        name={"repeat"}
                    />

                    <OptionButton
                        content={this.goal}
                        text_color={"black"}
                        toggleAction={this.toggleAction}
                        name={"goal"}
                    />

                    <View
                        style={{
                            position: "absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bottom: 100,
                            left: 30,
                            right: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 135,
                                height: 48,
                                borderRadius: 30,
                                backgroundColor: "gainsboro",
                                alignItems: "center",
                                justifyContent: "center",
                            }}

                            onPress={this.cancel}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                Cancel
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 135,
                                height: 48,
                                borderRadius: 30,
                                backgroundColor: "black",
                                alignItems: "center",
                                justifyContent: "center",
                            }}

                            onPress={this.save}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                Save
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <RNModal
                    visible={this.state.should_visible}
                    transparent={true}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <DismissArea
                            toggleShouldVisible={this.toggleShouldVisible}
                        />

                        <>
                            {
                                this.state.edit_calendar ?
                                    <CalendarEdit
                                        edit={true}
                                        task_data={this.edit_task}
                                        hideAction={this.toggleShouldVisible}
                                        setEditTask={this.setEditTask}
                                    />

                                    :

                                    <>
                                        {
                                            this.state.edit_category ?

                                                <Category
                                                    edit={true}
                                                    task_data={this.edit_task}
                                                    hideAction={this.toggleShouldVisible}
                                                    updateTask={this.setEditTask}
                                                />

                                                :

                                                <>
                                                    {
                                                        this.state.edit_priority ?

                                                            <Priority
                                                                edit={true}
                                                                task_data={this.edit_task}
                                                                hideAction={this.toggleShouldVisible}
                                                                updateTask={this.setEditTask}
                                                            />

                                                            :

                                                            <>
                                                                {
                                                                    this.state.edit_repeat ?

                                                                        <Repeat
                                                                            edit={true}
                                                                            task_data={this.edit_task}
                                                                            hideAction={this.toggleShouldVisible}
                                                                            updateTask={this.setEditTask}
                                                                            currentAnnotation={"day"}
                                                                        />

                                                                        :

                                                                        <>
                                                                            {
                                                                                this.state.edit_goal ?

                                                                                    <Goal
                                                                                        edit={true}
                                                                                        task_data={this.edit_task}
                                                                                        hideAction={this.toggleShouldVisible}
                                                                                        updateTask={this.setEditTask}
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
                        </>
                    </View>
                </RNModal>
            </>
        )
    }
}

class OptionButton extends React.PureComponent {

    _onPress = () => {
        this.props.toggleAction(this.props.name)
    }

    render() {
        return (
            <View
                style={{
                    borderBottomColor: "gainsboro",
                    borderBottomWidth: 1,
                    height: 65,
                    justifyContent: "center"
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 30,
                    }}

                    onPress={this._onPress}
                >
                    <Text
                        style={{
                            color: this.props.text_color
                        }}
                    >
                        {this.props.content}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class CalendarEdit extends React.PureComponent {

    chosen_day = -1
    chosen_month = -1
    chosen_year = -1

    setData = (day, month, year) => {
        this.chosen_day = day
        this.chosen_month = month
        this.chosen_year = year
    }

    state = {
        toggle_clear: false
    }

    save = () => {
        let data = {}
        if (this.chosen_day > 0 && this.chosen_month > 0 && this.chosen_year > 0) {
            if (this.chosen_day < new Date().getDate() && this.chosen_month === new Date().getMonth() && this.chosen_year === new Date().getFullYear()) {
                data.startTime = new Date().getTime()
                data.trackingTime = data.startTime
                data.schedule = {
                    day: new Date().getDate(),
                    month: this.chosen_month,
                    year: this.chosen_year
                }
            }

            else {
                data.startTime = new Date(new Date(new Date((new Date().setMonth(this.chosen_month))).setDate(this.chosen_day)).setFullYear(this.chosen_year)).getTime()
                data.trackingTime = data.startTime
                data.schedule = {
                    day: this.chosen_day,
                    month: this.chosen_month,
                    year: this.chosen_year
                }
            }
        }

        this.props.setEditTask(data)

        this.props.hideAction()
    }

    cancel = () => {
        this.props.hideAction()
    }

    clear = () => {
        this.setState(prevState => ({
            toggle_clear: !prevState.toggle_clear
        }))

        let date = new Date()
        this.setData(date.getDate(), date.getMonth(), date.getFullYear())
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: 338,
                    height: 346,
                    backgroundColor: 'white',
                    borderRadius: 10,
                }}
            >
                <DayCalendar
                    {... this.props}
                    toggle_clear={this.state.toggle_clear}
                    setData={this.setData}
                    edit={true}
                />

                <View
                    style={{
                        height: 60,
                        backgroundColor: 'white',
                        flexDirection: "row",
                        marginBottom: 10,
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}

                        onPress={this.clear}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            Clear
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}
                        
                        onPress={this.cancel}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            X
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 10
                        }}

                        onPress={this.save}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class DismissArea extends React.PureComponent {
    _onPress = () => {
        this.props.toggleShouldVisible()
    }
    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    width: Dimensions.get("window").width,
                    opacity: 0.5
                }}

                onPress={this._onPress}
            >

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: 'grey',
        borderLeftWidth: 3,
        marginBottom: 4
    },
    containerEdit: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around'
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1
    },
    descriptionText: {
        lineHeight: 25,
        fontSize: 16
    },
    descriptionAmount: {
        lineHeight: 25,
        opacity: 0.5
    },
    share: {
        width: 50,
        height: 60,
    },
    colorBox: {
        width: 50,
        height: 60
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        lineHeight: 50
    },
    head: {
        width: 50,
        height: 50
    },
    body: {
        lineHeight: 50
    },
    text: {
        lineHeight: 45
    }
});


