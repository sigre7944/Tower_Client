import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modalbox';

export default class TaskDetailModal extends Component {

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        isOpened: false,
        isEditing: false
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
            if (task_data.repeat.type === "daily"){
                repeat = `Every ${task_data.repeat.interval.value / (86400 * 1000)} day(s)`
            }

            else if (task_data.repeat.type === "weekly"){
                repeat = `Every ${task_data.repeat.interval.value / (86400 * 1000 * 7)} week(s)`
            }

            else if (task_data.repeat.type === "monthly"){
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
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    {
                        !this.state.isEditing ?
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
                            :
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                            </View>
                    }
                </View>
            </Modal>
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


