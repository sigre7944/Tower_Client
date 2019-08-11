import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'

// Need to optimize DayAnnotationPanel component and its child components
export default class DayAnnotationPanel extends Component {
    month_data_array = []
    numberOfMonths = (12 * 10) + 1 //Number of months we want to display. (12 months in a year) * (number of year) + 1 (for current month)

    chosen_day = -1
    chosen_month = -1
    chosen_year = -1

    state = {
        current_month_index: 0,
        month_data_array: []
    }

    chooseDifferentMonth = (index) => {
        if (index !== this.state.current_month_index)
            this.setState({
                current_month_index: index
            })
    }

    scrollToCurrentMonth = (month_index) => {
        this._flatlistRef.scrollToOffset({ animated: true, offset: 0 })
    }

    _keyExtractor = (item, index) => `month-calendar-${index}`

    _renderItem = ({ item, index }) => (
        <CalendarDisplayHolder
            style={
                index === this.state.month_data_array.length - 1 ?
                    {
                        flex: 1,
                        width: 338,
                    }

                    :

                    {
                        flex: 1,
                        width: 338,
                        marginRight: 338,
                    }
            }

            month={item.month}
            year={item.year}
            month_index={index}
            chooseDifferentMonth={this.chooseDifferentMonth}
            current_month_index={this.state.current_month_index}

            currentDayInMonth={new Date().getDate()}
            currentMonth={new Date().getMonth()}
            currentYear={new Date().getFullYear()}

            scrollToCurrentMonth={this.scrollToCurrentMonth}

            setChosenDate = {this.setChosenDate}

            currentDayTask = {this.props.currentDayTask}
        />
    )

    initializeMonths = () => {
        let currentMonth = new Date().getMonth(),
            currentYear = new Date().getFullYear()

        this.getFollowingMonths(currentMonth, currentYear, this.numberOfMonths)
    }

    getFollowingMonths = (currentMonth, currentYear, numberOfMonths) => {
        if (numberOfMonths === 0) {
            return
        }

        this.month_data_array.push({
            month: currentMonth,
            year: currentYear,
        })

        if (currentMonth === 11) {
            currentMonth = 0
            currentYear += 1
        }

        else {
            currentMonth += 1
        }

        numberOfMonths -= 1

        this.getFollowingMonths(currentMonth, currentYear, numberOfMonths)
    }

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
    }

    save = () => {
        if(this.chosen_day > 0 && this.chosen_month > 0 && this.chosen_year > 0){
            if(this.chosen_day < new Date().getDate() && this.chosen_month === new Date().getMonth() && this.chosen_year === new Date().getFullYear())
                this._updateStartingDate(new Date().getDate(), this.chosen_month, this.chosen_year)

            else
                this._updateStartingDate(this.chosen_day, this.chosen_month, this.chosen_year)
        }

        this.props.disableAllTabs()
    }

    setChosenDate = (day, month, year) => {
        this.chosen_day = day
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateStartingDate = (day, month, year) => {
        let startTime = trackingTime = new Date(new Date(new Date((new Date().setMonth(month))).setDate(day)).setFullYear(year)).getTime()

        this.props.updateStartingDate({
            day,
            month,
            year,
            startTime,
            trackingTime
        })
    }

    componentDidMount() {
        this.initializeMonths()

        this.setState({
            month_data_array: [... this.month_data_array]
        })
    }


    render() {
        return (
            <>

                {/* Main content of day calendar */}
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <FlatList
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={338*2}
                        snapToAlignment="start"
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={this._keyExtractor}
                        initialNumToRender={1}
                        removeClippedSubviews={true}
                        data={this.state.month_data_array}
                        extraData={this.state.current_month_index}
                        renderItem={this._renderItem}
                        maxToRenderPerBatch={20}
                        windowSize={19}

                        ref={(c) => this._flatlistRef = c}
                    >

                    </FlatList>
                </View>

                <TouchableHighlight
                    style={{
                        height: 40,
                        backgroundColor: "white",
                        justifyContent: "center",
                        borderTopWidth: 1,
                        borderTopColor: 'gainsboro',
                    }}

                    onPress={this._chooseRepeatOption}
                    underlayColor="gainsboro"
                >
                    <Text>
                        Add repeat
                </Text>
                </TouchableHighlight>
                <View
                    style={{
                        height: 60,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }}
                >
                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            X
                    </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
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
                    </TouchableHighlight>
                </View>
            </>
        )
    }
}