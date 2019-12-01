import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';

import { styles } from './styles/styles'

export default class DayFlatlist extends React.Component {

    day_data = []

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
        }), () => {
            let day = this.day_data[day_index].day,
                month = this.day_data[day_index].month,
                year = this.day_data[day_index].year

            this.props.setChosenDateData({ day, month, year })

            this.scrollToIndex(day_index)
        })
    }

    scrollToIndex = (index) => {
        if (this._flatlistRef) {
            this._flatlistRef.scrollToOffset({ animated: true, offset: index * 64 - 64 })
        }
    }

    _keyExtractor = (item, index) => `day-${index}`

    _renderItem = ({ item, index }) => {
        return (
            <DayHolder
                data={item}

                current_day_index={this.state.current_day_index}
                last_day_index={this.state.last_day_index}

                day_index={index}

                chooseDay={this.chooseDay}
            />
        )
    }

    _getItemLayout = (data, index) => ({
        length: 64, // each dayholder has a width of 64 (width = 50, marginHorizontal = 7)
        offset: index * 64,
        index
    })

    setRef = (r) => {
        this._flatlistRef = r
    }

    _onScroll = (e) => {
        let index = Math.floor((e.nativeEvent.contentOffset.x) / 64 + 1)
        if (index < 0) {
            index = 0
        }

        let string = `${this.month_text_arr[this.day_data[index].month]} - ${this.day_data[index].year}`

        this.props.updateHeaderText(string)
    }


    initializeDayData = () => {
        let current_year = new Date().getFullYear(),
            number_of_years_in_between = 4,
            left_end_year = current_year - number_of_years_in_between,
            right_end_year = current_year + number_of_years_in_between

        for (let year = left_end_year; year <= right_end_year; year++) {
            for (let month = 0; month < 12; month++) {
                let first_day_of_month = 1,
                    last_day_of_month = new Date(year, month + 1, 0).getDate()

                for (let day = first_day_of_month; day <= last_day_of_month; day++) {
                    this.day_data.push({
                        day,
                        month,
                        year,
                        day_text: this.day_text_arr[new Date(year, month, day).getDay()]
                    })
                }
            }
        }
    }

    _onLayout = () => {
        this.scrollToIndex(this.start_index)
    }

    componentDidMount() {
        this.initializeDayData()

        let day = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear()

        this.day_data.every((data, index) => {
            if (data.day === day && data.month === month && data.year === year) {
                this.start_index = index

                this.chooseDay(this.start_index)

                return false
            }

            return true
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.headerPressed !== prevProps.headerPressed) {
            if (this.props.currentRoute === "Day") {
                this.chooseDay(this.start_index)
            }
        }

        if (this.props.currentRoute !== prevProps.currentRoute) {
            if (this.props.currentRoute === "Day") {

                let string = `${this.month_text_arr[this.day_data[this.state.current_day_index].month]} - ${this.day_data[this.state.current_day_index].year}`

                this.props.updateHeaderText(string)
            }
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
                    data={this.day_data}
                    extraData={this.state.should_update}

                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}

                    horizontal={true}

                    initialScrollIndex={this.start_index}
                    getItemLayout={this._getItemLayout}

                    ref={this.setRef}

                    onScroll={this._onScroll}
                    scrollEventThrottle={5}
                    // removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}

                    onLayout={this._onLayout}

                    windowSize={7}
                    maxToRenderPerBatch={7}
                    initialNumToRender={7}
                />
            </View>
        )
    }
}

class DayHolder extends React.Component {

    state = {
        day_style: styles.not_chosen_day,
        text_style: styles.not_chosen_text,
        day_text_style: styles.not_chosen_day_text
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.day_index === nextProps.current_day_index || this.props.day_index === nextProps.last_day_index
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.day_index === nextProps.current_day_index) {
            return ({
                day_style: styles.chosen_day,
                text_style: styles.chosen_text,
                day_text_style: styles.chosen_day_text
            })
        }

        else if (nextProps.day_index === nextProps.last_day_index) {
            return ({
                day_style: styles.not_chosen_day,
                text_style: styles.not_chosen_text,
                day_text_style: styles.not_chosen_day_text
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
                    backgroundColor: "white",
                }}

                onPress={this._onPress}
            >
                <Text
                    style={this.state.day_text_style}
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
