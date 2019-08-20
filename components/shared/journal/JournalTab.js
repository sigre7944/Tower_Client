import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    Button,
    FlatList
} from 'react-native';
import TaskCard from '../layouts/TaskCard'
import TaskDetailModal from '../layouts/TaskDetailModal'

import Swipeable from 'react-native-gesture-handler/Swipeable'

export default class JournalTab extends React.PureComponent {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    task_data = {}

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

    current_date = new Date()

    state = {
        isModalOpened: false,
        isLogtimeModalOpened: false,

        should_update: 0,

        chosen_date_data: () => {
            if (this.props.type === "day") {
                return ({
                    day: current_date.getDate(),
                    month: current_date.getMonth(),
                    year: current_dategetFullYear()
                })
            }

            else if (this.props.type === "week") {
                return ({
                    week: this.getWeek(current_date),
                    month: current_date.getMonth(),
                    year: current_date.getFullYear()
                })
            }

            return ({
                month: current_date.getMonth(),
                year: current_date.getFullYear()
            })
        }
    }

    setChosenDateData = (data) => {
        this.setState({
            chosen_date_data: { ...{}, ...data }
        })
    }

    componentDidMount() {
        const didFocusScreen = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.props.changeRouteAction(payload.state.routeName)
            }
        )
    }

    openModal = (task_data) => {
        this.task_data = task_data

        this.setState({ isModalOpened: true })
    }

    closeModal = () => {
        this.setState({ isModalOpened: false })
    }

    setLogtimeModalToVisible = () => {
        this.setState({ isLogtimeModalOpened: true })
    }

    setLogtimeModalToInvisible = () => {
        this.setState({ isLogtimeModalOpened: false })
    }

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <Button style={[
                styles.actionText,
                {
                    transform: [{ translateX: Math.round(Number.parseFloat(JSON.stringify(trans))) }],
                },
            ]} onPress={() => { }} title="LogTime">

                Archive

            </Button>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tasks !== prevProps.tasks) {
            if (this.task_data.index >= 0) {
                this.task_data = this.props.tasks[this.task_data.index]
                this.setState(prevState => ({
                    should_update: prevState.should_update + 1,
                }))
            }
        }
    }

    render() {
        let action_type
        if (this.props.type === "day") {
            action_type = "ADD_EDIT_DAY_TASK"
        }

        else if (this.props.type === "week") {
            action_type = "ADD_EDIT_WEEK_TASK"
        }

        else {
            action_type = "ADD_EDIT_MONTH_TASK"
        }

        return (
            <View style={styles.container}>
                {/* DayFlatlist/WeekFlatlist/MonthFlatlist */}

                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    {/* later we will user map to render all the data */}
                    <ScrollView style={styles.scrollViewTasks}>
                        {this.props.tasks.map((task, index) => {
                            let { schedule } = task,
                                component = <></>

                            if (task.type === "day") {
                                let { day, month, year } = this.state.chosen_date_data

                                if (schedule.day === day && schedule.month === month && schedule.year === year) {
                                    component = <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                        <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                    </Swipeable>
                                }
                            }

                            else if (task.type === "week") {
                                let { week, month, year } = this.state.chosen_date_data

                                if (schedule.week === week && schedule.month === month && schedule.year === year) {
                                    component = <Swipeable key={`week-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                        <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                    </Swipeable>
                                }
                            }

                            else {
                                let { month, year } = this.state.chosen_date_data

                                if (schedule.month === month && schedule.year === year) {
                                    component = <Swipeable key={`month-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                        <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                    </Swipeable>
                                }
                            }

                            return component
                        })}

                        <Text style={styles.banner}>Completed</Text>
                        <TaskCard checked={true} onPress={this.openModal} />
                    </ScrollView>

                </View>

                <TaskDetailModal
                    isOpened={this.state.isModalOpened}
                    closeModal={this.closeModal}
                    task_data={this.task_data}
                    categories={this.props.categories}
                    priorities={this.props.priorities}
                    action_type={action_type}
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isLogtimeModalOpened}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text>This is the pop up logtime dialog</Text>
                        <Button onPress={this.setLogtimeModalToInvisible} title="Close">
                            Close
                            </Button>
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    banner: {
        textAlign: 'left',
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10
    },

    scrollViewTasks: {
        alignSelf: "stretch",
        height: 50
    },

    dayHolder: {
        width: dayHolderWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },

    actionText: {
        height: 50
    },

    not_chosen_day: {
        marginTop: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },

    chosen_day: {
        marginTop: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },

    not_chosen_text: {
        color: "black"
    },

    chosen_text: {
        color: "white"
    }
})