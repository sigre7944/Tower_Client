import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';

export default class WeekFlatlist extends React.Component {

    month_text_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    _flatlistRef = React.createRef()

    week_data = []

    comparing_month = -1

    monday

    start_index = 0

    state = {
        should_update: 0,

        current_week_index: -1,
        last_week_index: -1,
    }

    chooseWeek = (week_index) => {
        this.setState(prevState => ({
            last_week_index: prevState.current_week_index,
            current_week_index: week_index,

            should_update: prevState.should_update + 1
        }))

        let week = this.week_data[week_index].week,
            year = this.week_data[week_index].year

        this.props.setChosenDateData({week, year})

        this.scrollToIndex(week_index)
    }

    scrollToIndex = (index) => {
        if(this._flatlistRef){
            this._flatlistRef.scrollToOffset({animated: true, offset: index * 102 - 102})
        }
    }

    _keyExtractor = (item, index) => `week-${index}`

    _renderItem = ({ item, index }) => {
        if (item.month_text) {
            return (
                <MonthYearHolder
                    data={item}
                />
            )
        }
        return (
            <WeekHolder
                data={item}
                week_index={index}
                current_week_index={this.state.current_week_index}
                last_week_index={this.state.last_week_index}
                chooseWeek={this.chooseWeek}
            />
        )
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

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    getWeekData = (monday) => {
        if (this.comparing_month !== monday.getMonth()) {
            this.comparing_month = monday.getMonth()

            this.week_data.push({
                month: this.comparing_month,
                month_text: this.month_text_arr[this.comparing_month],
                year: monday.getFullYear()
            })
        }

        let sunday = new Date(monday)
        sunday.setDate(monday.getDate() + 6)
        this.week_data.push({
            week: this.getWeek(monday),
            start_day: monday.getDate(),
            end_day: sunday.getDate(),
            start_month: monday.getMonth(),
            end_month: sunday.getMonth(),
            year: monday.getFullYear(),
            month: monday.getMonth()
        })

        let next_monday = new Date(sunday)
        next_monday.setDate(sunday.getDate() + 1)

        this.monday = next_monday
    }

    _onEndReached = () => {
        this.getWeekData(this.monday)

        this.setState(prevState => ({
            should_update: prevState.should_update + 1,
        }))
    }

    _getItemLayout = (data, index) => ({
        length: 102,
        offset: index * 102,
        index
    })

    setRef = (r) => {
        this._flatlistRef = r
    }

    _onScroll = (e) => {
        let index = Math.floor((e.nativeEvent.contentOffset.x) / 102 + 2)
        if (index < 0) {
            index = 0
        }

        let string = `${this.month_text_arr[this.week_data[index].month]} - ${this.week_data[index].year}`

        this.props.updateHeaderText(string)
    }


    componentDidMount() {
        let first_monday_of_month = this.getMonday(new Date(new Date().getFullYear(), new Date().getMonth(), 7))

        let current_week = this.getWeek(new Date()),
            current_year = new Date().getFullYear()

        this.monday = this.getMonday(first_monday_of_month)

        for(let i = 0; i < 10; i++){
            this.getWeekData(this.monday)
        }

        this.week_data.every((data, index) => {

            if(data.week === current_week && data.year === current_year){

                this.start_index = index

                this.setState(prevState => ({
                    last_week_index: prevState.current_week_index,
                    current_week_index: index,
        
                    should_update: prevState.should_update + 1
                }))

                return false
            }

            return true
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.headerPressed !== prevProps.headerPressed){
            this.chooseWeek(this.start_index)
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
                    data={this.week_data}
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


class WeekHolder extends React.Component {

    month_text_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        week_style: styles.not_chosen_week,
        text_style: styles.not_chosen_week_text
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.week_index === nextProps.current_week_index || this.props.week_index === nextProps.last_week_index
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.week_index === nextProps.current_week_index){
            return({
                week_style: styles.chosen_week,
                text_style: styles.chosen_week_text
            })
        }

        else if(nextProps.week_index === nextProps.last_week_index){
            return({
                week_style: styles.not_chosen_week,
                text_style: styles.not_chosen_week_text
            })
        }

        return null
    }

    _onPress = () => {
        this.props.chooseWeek(this.props.week_index)
    }


    render() {
        return (
            <TouchableOpacity
                style={{
                    marginHorizontal: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 88,
                }}

                onPress = {this._onPress}
            >
                <View
                    style={this.state.week_style}
                >
                    <Text
                        style={this.state.text_style}
                    >
                        {`Week ${this.props.data.week}`}
                    </Text>
                </View>

                <Text
                    style={{
                        marginTop: 7,
                        fontSize: 10,
                        color: "black",
                        opacity: 0.3
                    }}
                >
                    {`${this.props.data.start_day} ${this.month_text_arr[this.props.data.start_month]} - ${this.props.data.end_day} ${this.month_text_arr[this.props.data.end_month]}`}
                </Text>

            </TouchableOpacity>
        )
    }
}

class MonthYearHolder extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    marginHorizontal: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 88,
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
    not_chosen_week: {
        width: 88,
        height: 21,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 11
    },

    chosen_week: {
        width: 88,
        height: 21,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 11,
        backgroundColor: "black"
    },

    not_chosen_week_text: {
        color: "black"
    },

    chosen_week_text: {
        color: "white"
    }
})