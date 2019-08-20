import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';

export default class DayFlatlist extends React.Component {

    month_data = []

    month = new Date().getMonth()
    year = new Date().getFullYear()

    day_text_arr = ["S", "M", "T", "W", "T", "F", "S"]
    month_text_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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

        this.props.setChosenDateData({day, month, year})

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