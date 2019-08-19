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
import TaskCard from './../../../../../shared/layouts/TaskCard'
import TaskDetailModal from './../../../../../shared/layouts/day-edit/TaskDetailModal.Container'

import Swipeable from 'react-native-gesture-handler/Swipeable';

let dayHolderWidth = 60

export default class Daily extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    task_data = {}

    state = {
        dailyTimeView: null,

        isModalOpened: false,
        isLogtimeModalOpened: false,

        should_update: 0,

        chosen_day_data: {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }
    }

    setChosenDayData = (day, month, year) => {
        this.setState({
            chosen_day_data: {...{}, ...{day, month, year}}
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
        if (this.props.day_tasks !== prevProps.day_tasks) {

            if (this.task_data.index >= 0) {
                this.task_data = this.props.day_tasks[this.task_data.index]
                this.setState(prevState => ({
                    should_update: prevState.should_update + 1,
                }))
            }
        }

        
    }

    render() {
        return (
            <View style={styles.container}>

                <DayFlatlist 
                    setChosenDayData={this.setChosenDayData}
                    updateHeaderText={this.props.updateHeaderText}
                    headerPressed={this.props.headerPressed}
                />

                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                    {/* later we will user map to render all the data */}
                    <ScrollView style={styles.scrollViewTasks}>
                        {this.props.day_tasks.map((task, index) => {
                            let {schedule} = task,
                                {day, month, year} = this.state.chosen_day_data
                            if (task.type === "day" && schedule.day === day && schedule.month === month && schedule.year === year)
                                return (
                                    <Swipeable key={`daily-task-${index}`} renderLeftActions={this.renderLeftActions} onSwipeableOpen={this.setLogtimeModalToVisible}>
                                        <TaskCard task_data={task} index={index} checked={false} onPress={this.openModal} title={task.title} goal={task.goal} />
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
                    categories={this.props.categories}
                    priorities={this.props.priorities}
                    action_type={"ADD_EDIT_DAY_TASK"}
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

class DayFlatlist extends React.PureComponent {

    month_data = []

    month = new Date().getMonth()
    year = new Date().getFullYear()

    day_text_arr = ["S", "M", "T", "W", "T", "F", "S"]
    month_text_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    _flatlistRef = React.createRef()

    start_index = -1

    state = {
        should_update: 0,

        current_day_index: 0,
        last_day_index: 0,
    }

    chooseDay = (day_index) => {
        this.setState(prevState => ({
            last_day_index: prevState.current_day_index,
            current_day_index: day_index,

            should_update: prevState.should_update + 1,
        }))

        let day = this.month_data[day_index].day,
            month = this.month_data[day_index].month,
            year = this.month_data[day_index].year

        this.props.setChosenDayData(day, month, year)

        this.scrollToIndex(day_index)
    }

    scrollToIndex = (index) => {
        if(this._flatlistRef){
            this._flatlistRef.scrollToOffset({animated: true, offset: index * 64 - 64})
        }
    }

    _keyExtractor = (item, index) => `day-${index}`

    _renderItem = ({ item, index }) => {
        if (item.month_text) {
            return (
                <MonthYearDisplay
                    data={item}
                />
            )
        }

        return (
            <DayHolder
                data={item}

                current_day_index={this.state.current_day_index}
                last_day_index={this.state.last_day_index}

                day_index = {index}

                chooseDay={this.chooseDay}
            />
        )
    }

    _getItemLayout = (data, index) => ({
        length: 64,
        offset: index * 64,
        index
    })

    setRef = (r) => {
        this._flatlistRef = r
    }

    _onEndReached = () => {
        this.month += 1

        if (this.month > 11) {
            this.month = 0
            this.year += 1
        }

        this.initMonthData(this.month, this.year)

        this.setState(prevState => ({
            should_update: prevState.should_update + 1
        }))
    }

    _onScroll = (e) => {
        let index = Math.floor((e.nativeEvent.contentOffset.x)/64 + 2)
        if(index < 0){
            index = 0
        }

        let string = `${this.month_text_arr[this.month_data[index].month]} - ${this.month_data[index].year}`

        this.props.updateHeaderText(string)
    }


    initMonthData = (month, year) => {
        let first_day_of_month = new Date(year, month, 1).getDate(),
            last_day_of_month = new Date(year, month, 0).getDate()

        this.month_data.push({
            month_text: this.month_text_arr[month],
            month,
            year: year
        })

        for (let i = first_day_of_month; i <= last_day_of_month; i++) {
            this.month_data.push({
                day: i,
                month: month,
                year: year,
                day_text: this.day_text_arr[new Date(year, month, i).getDay()]
            })
        }

    }

    componentDidMount() {
        this.initMonthData(this.month, this.year)

        let day = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear()

        this.month_data.every((data, index) => {
            if(data.day === day && data.month === month && data.year === year){
                this.start_index = index

                this.setState(prevState => ({
                    last_day_index: prevState.current_day_index,
                    current_day_index: index,
        
                    should_update: prevState.should_update + 1,
                }))

                return false
            }

            return true
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.headerPressed !== prevProps.headerPressed){
            this.chooseDay(this.start_index)
        }
    }

    render() {
        return (
            <View
                style={{
                    height: 70,
                }}
            >
                <FlatList
                    data={this.month_data}
                    extraData={this.state.should_update}

                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}

                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}

                    horizontal={true}

                    initialScrollIndex={this.start_index}
                    getItemLayout={this._getItemLayout}

                    ref={this.setRef}

                    onScroll={this._onScroll}
                    scrollEventThrottle={5}
                />
            </View>
        )
    }
}

class DayHolder extends React.Component {

    state = {
        day_style: styles.not_chosen_day,
        text_style: styles.not_chosen_text
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.day_index === nextProps.current_day_index || this.props.day_index === nextProps.last_day_index
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.day_index === nextProps.current_day_index){
            return({
                day_style: styles.chosen_day,
                text_style: styles.chosen_text
            })
        }

        else if(nextProps.day_index === nextProps.last_day_index){
            return({
                day_style: styles.not_chosen_day,
                text_style: styles.not_chosen_text
            })
        }

        return null
    }

    _onPress = () => {
        this.props.chooseDay(this.props.day_index)
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    marginHorizontal: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                }}

                onPress={this._onPress}
            >
                <Text
                    style={{
                        color: "gainsboro"
                    }}
                >
                    {this.props.data.day_text}
                </Text>

                <View
                    style={this.state.day_style}
                >
                    <Text
                        style={this.state.text_style}
                    >
                        {this.props.data.day}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class MonthYearDisplay extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    marginHorizontal: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                }}
            >
                <Text
                    style={{
                    }}
                >
                    {this.props.data.month_text}
                </Text>

                <Text
                    style={{
                        marginTop: 5
                    }}
                >
                    {this.props.data.year}
                </Text>

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