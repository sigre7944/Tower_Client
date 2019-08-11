import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Modal,
    Button
} from 'react-native';
import TaskCard from './../../../../../shared/layouts/TaskCard'
import TaskDetailModal from './../../../../../shared/layouts/TaskDetailModal'

import Swipeable from 'react-native-gesture-handler/Swipeable';

let scrollViewRef,
    dayHolderWidth = 60,
    days_arr = [],
    today = new Date().getDate(),
    lastDayIndex = 0


export default class Daily extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    task_data = {}

    state = {
        dailyTimeView: null,
        day_number_circle_style_arr: [],
        day_number_text_style_arr: [],
        days_arr: [],

        isModalOpened: false,
        isLogtimeModalOpened: false
    }


    componentDidMount() {
        const didFocusScreen = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.props.changeRouteAction(payload.state.routeName)
            }
        )

        days_arr.length = 0

        let month = new Date().getMonth() + 1,
            year = new Date().getFullYear()


        let daysInMonth = this.getDaysInMonth(month, year),
            day_number_circle_style_arr = [],
            day_number_text_style_arr = []

        for (let i = 1; i <= daysInMonth; i++) {
            let dayWord,
                dayInWeek = new Date(year, month - 1, i).getDay()

            if (dayInWeek === 0) {
                dayWord = 'Su'
            }

            else if (dayInWeek === 1) {
                dayWord = 'Mo'
            }

            else if (dayInWeek === 2) {
                dayWord = 'Tu'
            }

            else if (dayInWeek === 3) {
                dayWord = 'We'
            }

            else if (dayInWeek === 4) {
                dayWord = 'Th'
            }

            else if (dayInWeek === 5) {
                dayWord = 'Fr'
            }

            else if (dayInWeek === 6) {
                dayWord = 'Sa'
            }

            days_arr.push({
                dayWord: dayWord,
                dayNumb: i,
                chosen: false
            })

            day_number_circle_style_arr.push(styles.circleCenterDayNumberHolder)

            if (i === today)
                day_number_text_style_arr.push(styles.biggerFontWeightForToday)
            else
                day_number_text_style_arr.push(styles.notToday)
        }

        this.setState({
            day_number_circle_style_arr: day_number_circle_style_arr.map(style => { return style }),
            day_number_text_style_arr: day_number_text_style_arr.map(style => { return style }),
            days_arr: days_arr.map(day => { return day })
        })

        this.focusScrollViewToDay(scrollViewRef, days_arr, today)
    }

    chooseDay = (scrollViewRef, days_arr, day, dayIndex) => {
        let day_number_circle_style_arr = this.state.day_number_circle_style_arr,
            day_number_text_style_arr = this.state.day_number_text_style_arr

        day_number_circle_style_arr[lastDayIndex] = { ...styles.circleCenterDayNumberHolder, backgroundColor: 'transparent' }

        if (lastDayIndex === today - 1)
            day_number_text_style_arr[lastDayIndex] = { ...styles.biggerFontWeightForToday, color: 'black' }
        else
            day_number_text_style_arr[lastDayIndex] = { ...styles.notToday, color: 'gray' }



        day_number_circle_style_arr[dayIndex] = { ...styles.circleCenterDayNumberHolder, backgroundColor: 'black' }

        if (dayIndex === today - 1)
            day_number_text_style_arr[dayIndex] = { ...styles.biggerFontWeightForToday, color: 'white' }
        else
            day_number_text_style_arr[dayIndex] = { ...styles.notToday, color: 'white' }

        this.setState({
            day_number_circle_style_arr: day_number_circle_style_arr.map(style => { return style }),
            day_number_text_style_arr: day_number_text_style_arr.map(style => { return style })
        })

        this.focusScrollViewToDay(scrollViewRef, days_arr, day)

        lastDayIndex = dayIndex
    }

    focusScrollViewToDay = (scrollViewRef, days_arr, day) => {
        let dayIndex = days_arr.findIndex(obj => obj.dayNumb === day),
            x_off_set

        if (dayIndex > (days_arr.length - 4)) {
            dayIndex = days_arr.length - 7
            scrollViewRef.scrollTo({
                y: 0,
                x: dayIndex * dayHolderWidth
            })
        }

        else if (dayIndex < 3) {
            scrollViewRef.scrollTo({
                y: 0,
                x: 0
            })
        }

        else {
            dayIndex -= 3
            x_off_set = dayIndex * dayHolderWidth

            scrollViewRef.scrollTo({
                y: 0,
                x: x_off_set
            })
        }
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scrollViewContainer} >
                    <ScrollView
                        horizontal={true}
                        ref={view => scrollViewRef = view}
                        indicatorStyle='white'
                    >
                        {this.state.days_arr.map((obj, index) => (
                            <TouchableHighlight
                                onPress={this.chooseDay.bind(this, scrollViewRef, days_arr, obj.dayNumb, index)}
                                style={styles.dayHolder}
                                key={"day " + index}
                                underlayColor='transparent'
                            >
                                <>
                                    <View>
                                        {
                                            obj.dayNumb === today ?
                                                <Text
                                                    style={styles.biggerFontWeightForToday}
                                                >
                                                    {obj.dayWord}
                                                </Text>

                                                :

                                                <Text
                                                    style={styles.notToday}
                                                >
                                                    {obj.dayWord}
                                                </Text>
                                        }
                                    </View>

                                    <View
                                        style={styles.dayNumberHolder}
                                    >
                                        <View style={this.state.day_number_circle_style_arr[index]}>
                                            <Text
                                                style={this.state.day_number_text_style_arr[index]}
                                            >
                                                {obj.dayNumb}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            </TouchableHighlight>
                        ))}

                        {this.state.dailyTimeView}

                    </ScrollView>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    {/* later we will user map to render all the data */}
                    <ScrollView style={styles.scrollViewTasks}>
                        {this.props.day_tasks.map((task, index) => {
                            if (task.type === "day")
                                return (
                                    <Swipeable key={`daily-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                        <TaskCard task_data = {task} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
                                    </Swipeable>
                                )
                        })}

                        <Text style={styles.banner}>Completed</Text>
                        <TaskCard checked={true} onPress={this.openModal} />
                    </ScrollView>

                </View>

                <TaskDetailModal
                    isOpened={this.state.isModalOpened}
                    closeModal={this.closeModal}
                    task_data={this.task_data}
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

    scrollViewContainer: {
        flex: 0,
        height: 70,
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

    currentDayHolder: {
        height: 35, //half the size of scrollViewContainer's height
        width: 35,  //equal to height to form a square
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 35 / 2
    },

    dayNumberHolder: {
        height: 35,
        width: dayHolderWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },

    underlayIndicator: {
        position: 'absolute',
        width: dayHolderWidth,
        backgroundColor: 'yellow',
        height: 70,
    },

    biggerFontWeightForToday: {
        fontWeight: "600",
        color: 'black'
    },

    notToday: {
        color: 'gray'
    },

    circleCenterDayNumberHolder: {
        marginTop: 10,
        height: 25,
        width: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionText: {
        height: 50
    }
})