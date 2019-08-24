import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Modal,
    Button,
} from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler'

import TaskCard from '../layouts/TaskCard'
import TaskDetailModal from '../layouts/TaskDetailModal.Container'

import DayFlatlist from './day-flatlist/DayFlatlist.Container'
import WeekFlatlist from './week-flatlist/WeekFlatlist.Container'
import MonthFlatlist from './month-flatlist/MonthFlatlist.Container'

import Swipeable from 'react-native-gesture-handler/Swipeable'

import { Map } from 'immutable'

export default class JournalTab extends React.PureComponent {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    task_data = {}

    render_component_arr = []

    resetTaskData = () => {
        this.task_data = {}
    }

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

    initChosenDateData = () => {
        if (this.props.type === "day") {
            return ({
                day: this.current_date.getDate(),
                month: this.current_date.getMonth(),
                year: this.current_date.getFullYear()
            })
        }

        else if (this.props.type === "week") {
            return ({
                week: this.getWeek(this.current_date),
                year: this.current_date.getFullYear()
            })
        }

        return ({
            month: this.current_date.getMonth(),
            year: this.current_date.getFullYear()
        })
    }

    state = {
        isModalOpened: false,
        isLogtimeModalOpened: false,

        should_update: 0,

        chosen_date_data: this.initChosenDateData()
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
            if (this.task_data.id) {
                this.task_data = Map(this.props.tasks).get(this.task_data.id)
            }

            this.render_component_arr = Map(this.props.tasks).valueSeq().map((task, index) => {
                let { schedule, repeat, startTime } = task

                if (this.props.type === "day") {
                    let { day, month, year } = this.state.chosen_date_data

                    if (schedule.day === day && schedule.month === month && schedule.year === year) {
                        return (
                            <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                            </Swipeable>
                        )
                    }

                    else if (repeat.type === "daily") {
                        let start_date_time = new Date(new Date(new Date(new Date().setDate(schedule.day)).setMonth(schedule.month)).setFullYear(schedule.year)).getTime(),
                            current_date_time = new Date(new Date(new Date(new Date().setDate(day)).setMonth(month)).setFullYear(year)).getTime()

                        if (Math.floor((current_date_time - start_date_time) / (86400 * 1000)) % repeat.interval.value === 0) {
                            return (
                                <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                    <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                </Swipeable>
                            )
                        }
                    }

                    else if (repeat.type === "weekly") {

                    }
                }

                else if (this.props.type === "week") {
                    let { week, year } = this.state.chosen_date_data

                    if (schedule.week === week && schedule.year === year) {
                        return (
                            <Swipeable key={`week-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                            </Swipeable>
                        )
                    }


                }

                else {
                    let { month, year } = this.state.chosen_date_data

                    if (schedule.month === month && schedule.year === year) {
                        return (
                            <Swipeable key={`month-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                            </Swipeable>
                        )
                    }
                }
            })

            this.setState(prevState => ({
                should_update: prevState.should_update + 1,
            }))
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {
                    this.props.type === "day" ?

                        <DayFlatlist
                            setChosenDateData={this.setChosenDateData}
                        />

                        :
                        <>
                            {
                                this.props.type === "week" ?
                                    <WeekFlatlist
                                        setChosenDateData={this.setChosenDateData}
                                    />

                                    :

                                    <MonthFlatlist
                                        setChosenDateData={this.setChosenDateData}
                                    />
                            }
                        </>
                }

                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    {/* later we will user map to render all the data */}
                    <ScrollView style={styles.scrollViewTasks}>
                        {Map(this.props.tasks).valueSeq().map((task, index) => {
                            let { schedule, repeat, startTime } = task

                            if (this.props.type === "day") {
                                let { day, month, year } = this.state.chosen_date_data

                                if (schedule.day === day && schedule.month === month && schedule.year === year) {
                                    return (
                                        <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                            <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                        </Swipeable>
                                    )
                                }

                                else if (repeat.type === "daily") {
                                    let start_date_time = new Date(new Date(new Date(new Date().setDate(schedule.day)).setMonth(schedule.month)).setFullYear(schedule.year)).getTime(),
                                        current_date_time = new Date(new Date(new Date(new Date().setDate(day)).setMonth(month)).setFullYear(year)).getTime()

                                    if (Math.floor((current_date_time - start_date_time) / (86400 * 1000)) % repeat.interval.value === 0) {
                                        return (
                                            <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                                <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                            </Swipeable>
                                        )
                                    }
                                }

                                else if (repeat.type === "weekly") {
                                    let start_date_time = new Date(new Date(new Date(new Date().setDate(schedule.day)).setMonth(schedule.month)).setFullYear(schedule.year)).getTime(),
                                        current_date_time = new Date(new Date(new Date(new Date().setDate(day)).setMonth(month)).setFullYear(year)).getTime(),
                                        interval_value = repeat.interval.value / 7,
                                        diff = (current_date_time - start_date_time) / (86400 * 1000 * 7)

                                    if (diff > 0 && diff % interval_value === 0) {
                                        return (
                                            <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                                <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                            </Swipeable>
                                        )
                                    }
                                }

                                else if (repeat.type === "monthly") {
                                    let start_date = new Date(new Date(new Date(new Date().setDate(schedule.day)).setMonth(schedule.month)).setFullYear(schedule.year)),
                                        current_date = new Date(new Date(new Date(new Date().setDate(day)).setMonth(month)).setFullYear(year)),
                                        interval_value = repeat.interval.value,
                                        diff_year = current_date.getFullYear() - start_date.getFullYear(),
                                        diff_month = (current_date.getMonth() + diff_year * 12) - start_date.getMonth()


                                    if (diff_month > 0 && diff_month % interval_value === 0) {
                                        if (current_date.getDate() === start_date.getDate()) {
                                            return (
                                                <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                                    <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                                </Swipeable>
                                            )
                                        }
                                        else {
                                            if (current_date.getDate() === new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate()) {
                                                return (
                                                    <Swipeable key={`day-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                                        <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                                    </Swipeable>
                                                )
                                            }
                                        }
                                    }
                                }
                            }

                            else if (this.props.type === "week") {
                                let { week, year } = this.state.chosen_date_data

                                if (schedule.week === week && schedule.year === year) {
                                    return (
                                        <Swipeable key={`week-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                            <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                        </Swipeable>
                                    )
                                }
                            }

                            else {
                                let { month, year } = this.state.chosen_date_data

                                if (schedule.month === month && schedule.year === year) {
                                    return (
                                        <Swipeable key={`month-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                            <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                        </Swipeable>
                                    )
                                }
                            }
                        })}
                        {/* {this.render_component_arr} */}
                        <Text style={styles.banner}>Completed</Text>
                        <TaskCard checked={true} onPress={this.openModal} />
                    </ScrollView>

                </View>

                {this.state.isModalOpened ?
                    <TaskDetailModal
                        // isOpened={this.state.isModalOpened}
                        closeModal={this.closeModal}
                        task_data={this.task_data}
                        categories={this.props.categories}
                        priorities={this.props.priorities}
                        action_type={this.props.action_type}
                        resetTaskData={this.resetTaskData}
                        type={this.props.type}
                    />

                    :

                    <></>
                }



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

    actionText: {
        height: 50
    },
})