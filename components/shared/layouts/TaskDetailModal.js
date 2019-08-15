import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Dimensions, Image, TextInput, ScrollView, Platform, Modal as RNModal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import DayCalendar from '../calendar/day-calendar/DayCalendar'
import Category from '../category/Category.Container'


export default class TaskDetailModal extends Component {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        isOpened: false,
        isEditing: false,
        title_value: "",
        description_value: "",
        should_visible: false,
        edit_calendar: false,
        edit_category: false,
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    toggleEdit = (visible) => {
        this.setState(() => ({ isEditing: visible }));
    }

    componentDidMount = () => {
        //this.props.setRef(this.refs.modalRef)

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
            if (this.props.task_data.title && this.props.task_data.title.length > 0) {
                this.setState({
                    title_value: this.props.task_data.title
                })
            }

            if (this.props.task_data.description && this.props.task_data.description.length > 0) {
                this.setState({
                    description_value: this.props.task_data.description
                })
            }
        }

        if (this.state.isEditing && this.state.isEditing !== prevState.isEditing) {
            this.props.updateEdittingTask(this.props.task_data)
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

    editSchedule = () => {
        this.toggleShouldVisible()

        this.setState({
            edit_calendar: true,
            edit_category: false,
        })
    }

    editCategory = () => {
        this.toggleShouldVisible()

        this.setState({
            edit_calendar: false,
            edit_category: true,
        })
    }

    render() {
        let task_data = this.props.task_data,
            date = new Date(task_data.startTime),
            day_in_week_text = this.daysInWeekText[date.getDay()],
            date_number = date.getDate(),
            month_text = this.monthNames[date.getMonth()],
            category = task_data.category ? this.props.categories[task_data.category].name : "",
            priority = task_data.priority ? this.props.priorities[task_data.priority.value].name : "",
            repeat,
            goal = task_data.goal ? `${task_data.goal.max} times` : ""

        if (task_data.repeat) {
            if (task_data.repeat.type === "daily") {
                repeat = `Every ${task_data.repeat.interval.value / (86400 * 1000)} day(s)`
            }

            else if (task_data.repeat.type === "weekly") {
                repeat = `Every ${task_data.repeat.interval.value / (86400 * 1000 * 7)} week(s)`
            }

            else if (task_data.repeat.type === "monthly") {
                repeat = `Every ${task_data.repeat.interval.value} month(s)`
            }
        }

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
                                            <Text style={styles.text}>{this.props.task_data.title}</Text>
                                        </View>
                                    </View>
                                    {
                                        this.props.task_data.description && this.props.task_data.description.length > 0 ?
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
                                                    <Text style={styles.text}>{this.props.task_data.description}</Text>
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
                                            <Text style={styles.text}>{`${day_in_week_text} ${date_number} ${month_text}`}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'circle'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{category}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'warning'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{priority}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'warning'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{repeat}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={styles.head}>
                                            <FontAwesome name={'warning'} style={styles.icon} />
                                        </View>
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{goal}</Text>
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

                                    onPress={this.editSchedule}
                                >
                                    <Text>
                                        {`${day_in_week_text} ${date_number} ${month_text}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>

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

                                    onPress={this.editCategory}
                                >
                                    <Text
                                        style={{
                                            color: "red"
                                        }}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
                                >
                                    <Text>
                                        {priority}
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
                                >
                                    <Text>
                                        {repeat}
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
                                >
                                    <Text>
                                        {goal}
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
                                                task_data={this.props.task_data}
                                            />

                                            :

                                            <>
                                                {
                                                    this.state.edit_category ?

                                                        <Category
                                                            edit={true}
                                                            action_type={"UPDATE_EDIT_TASK"}
                                                            hideAction={this.toggleShouldVisible}
                                                        />

                                                        :

                                                        <></>
                                                }

                                            </>


                                    }
                                </>
                            </View>
                        </RNModal>

                    </>
                }


            </Modal>
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
                    setData={this.setData}
                />
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


