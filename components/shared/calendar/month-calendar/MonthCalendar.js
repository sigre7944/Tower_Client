import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'

const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

export default class MonthCalendar extends Component {

    numberOfYears = 30

    month_array_data = []

    month_value_array = []

    chosen_month = chosen_year = -1

    currentMonth = new Date().getMonth()
    currentYear = new Date().getFullYear()

    state = {
        month_array_data: [],

        current_year_index: -1,
        last_year_index: -1,
    }

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
    }

    returnToCurrentYear = () => {
        if (this._flatlistRef) {
            this._flatlistRef.scrollToOffset({ animated: true, offset: 0 })
        }
    }

    _keyExtractor = (item, index) => `month-calendar-${index}`

    _renderItem = ({ item, index }) => {
        if (index === 0) {
            return (
                <CalendarDisplayHolder
                    monthData={item}
                    yearIndex={index}
                    marginLeft={0}
                    changeCurrentYearIndex={this.changeCurrentYearIndex}
                    last_year_index={this.state.last_year_index}
                    current_year_index={this.state.current_year_index}

                    returnToCurrentYear={this.returnToCurrentYear}

                    currentMonth={this.currentMonth}
                    currentYear={this.currentYear}

                    setChosenDate={this.setChosenDate}

                    task_data={this.props.task_data}
                />
            )
        }

        return (
            <CalendarDisplayHolder
                monthData={item}
                yearIndex={index}
                marginLeft={338}
                changeCurrentYearIndex={this.changeCurrentYearIndex}
                last_year_index={this.state.last_year_index}
                current_year_index={this.state.current_year_index}

                returnToCurrentYear={this.returnToCurrentYear}

                currentMonth={this.currentMonth}
                currentYear={this.currentYear}

                setChosenDate={this.setChosenDate}
                task_data={this.props.task_data}
            />
        )
    }

    changeCurrentYearIndex = (index) => {
        this.setState((state, props) => {
            if (state.current_year_index !== index) {
                return {
                    current_year_index: index,
                    last_year_index: state.current_year_index
                }
            }
        })
    }

    initMonths = () => {
        let current_year = new Date().getFullYear()

        for (let i = 0; i < 12; i++) {
            this.month_value_array.push({
                monthName: monthNames[i],
                monthNumber: i
            })
        }

        for (let i = 0; i < 30; i++) {
            this.month_array_data.push({
                month_value_array: this.month_value_array,
                year: (current_year + i)
            })
        }

        this.setState({
            month_array_data: [... this.month_array_data]
        })
    }

    save = () => {
        if (this.chosen_month > 0 && this.chosen_year > 0) {
            if (this.chosen_month < new Date().getMonth() && this.chosen_year === new Date().getFullYear())
                this._updateStartingDate(new Date().getMonth(), this.chosen_year)

            else
                this._updateStartingDate(this.chosen_month, this.chosen_year)
        }
        this.props.disableAllTabs()
    }

    setChosenDate = (month, year) => {
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateStartingDate = (month, year) => {
        let startTime = trackingTime = new Date(
            new Date(
                new Date(
                    new Date().setDate(1)).setMonth(month)).setFullYear(year))
            .getTime()

        this.props.updateStartingDate({
            month,
            year,
            startTime,
            trackingTime
        })
    }

    componentDidMount() {
        this.initMonths()
    }

    render() {
        return (
            <>
                <View style={{
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 20,
                }}>
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.state.month_array_data}
                        extraData={this.state.current_year_index}
                        renderItem={this._renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        snapToAlignment="start"
                        snapToInterval={338 * 2}
                        initialNumToRender={1}
                        maxToRenderPerBatch={10}
                        windowSize={11}
                        removeClippedSubviews={true}
                        ref={(c) => this._flatlistRef = c}
                    >

                    </FlatList>
                </View>

                {/* Add Repeat */}
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

class CalendarDisplayHolder extends Component {

    state = {
        current_month_index: -1,
        last_month_index: -1,
    }

    changeCurrentMonthIndex = (index) => {
        if (this.state.current_month_index !== index) {
            this.setState((state, props) => ({
                current_month_index: index,
                last_month_index: state.current_month_index
            }))
        }
    }

    resetCurrentAndLastMonthIndexes = () => {
        this.setState({
            current_month_index: -1,
            last_month_index: -1
        })
    }


    // AVOID USING componentWillReceiveProps, use getDerivedStateFromProps and componentDidMount to replace logic
    // or apply logic directly into render()

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     // When the currently chosen year becomes the previously chosen year,
    //     // we reset the state to the initia => MonthHolder will be updated too.
    //     // This condition prevents re-rendering on many CalendarDisplayHolder, only
    //     // re-render the needed one.
    //     if(this.props.yearIndex === nextProps.last_year_index){
    //         this.resetCurrentAndLastMonthIndexes()
    //     }
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.yearIndex === nextProps.last_year_index) {
            return ({
                current_month_index: -1,
                last_month_index: -1
            })
        }

        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        // we only re-render when yearIndex equals to last_year_index, meaning
        // the case that the current calendar was the previously chosen calendar => to
        // update its style to origin.
        // And only re-rende when yearIndex equals to current_year_index, meaning
        // the case that current calendar is the currently chosen calendar => to
        // update its style to the chosen styles.
        return this.props.yearIndex === nextProps.last_year_index
            || this.props.yearIndex === nextProps.current_year_index
    }

    render() {
        return (
            <>
                <View style={{
                    width: 338,
                    marginLeft: this.props.marginLeft
                }}>
                    <DisplayYear 
                    year={this.props.monthData.year} 
                    returnToCurrentYear = {this.props.returnToCurrentYear}
                    />

                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        height: 400,
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        marginTop: 30,
                    }}>
                        {this.props.monthData.month_value_array.map((data, index) => (
                            <MonthHolder
                                key={"month-" + index + "-year-" + this.props.monthData.year}

                                {... this.props}

                                data={data}
                                monthIndex={index}
                                current_month_index={this.state.current_month_index}
                                last_month_index={this.state.last_month_index}
                                changeCurrentMonthIndex={this.changeCurrentMonthIndex}
                                resetCurrentAndLastMonthIndexes={this.resetCurrentAndLastMonthIndexes}

                                currentMonth = {this.props.currentMonth}
                                currentYear = {this.props.currentYear}
                                year={this.props.monthData.year} 

                            />
                        ))}
                    </View>

                </View>
            </>
        )
    }
}

class DisplayYear extends React.PureComponent {
    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.year !== nextProps.year
    // }

    _onPress = () => {
        this.props.returnToCurrentYear()
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center"
                }}

                onPress={this._onPress}
            >
                <Text style={{
                    fontSize: 24,

                }}>
                    {this.props.year}
                </Text>
            </TouchableHighlight>
        )
    }
}

class MonthHolder extends Component {

    state = {
        monthStyle: styles.unchosenMonth
    }

    chooseMonth = () => {
        this.setState({
            monthStyle: styles.chosenMonth
        })

        this.props.changeCurrentYearIndex(this.props.yearIndex)

        this.props.changeCurrentMonthIndex(this.props.monthIndex)

        this.props.setChosenDate(this.props.data.monthNumber, this.props.year)
    }


    // AVOID USING componentWillReceiveProps, use getDerivedStateFromProps and componentDidMount to replace logic
    // or apply logic directly into render()

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     // When monthIndex is not equal to last_month_index, meaning 
    //     // the locally chosen month in the currently chosen calendar was changed 
    //     // to previously chosen month.
    //     // When current_month_index equals to -1, meaning the calendar becomes the
    //     // previously chosen calendar, we reset the style.
    //     if(this.props.monthIndex === nextProps.last_month_index || nextProps.current_month_index === -1){
    //         this.setState({
    //             monthStyle: styles.unchosenMonth
    //         })
    //     }

    //     // When monthIndex equals to current_month_index, meaning the locally chosen
    //     // month in the currently chosen calendar was changed to the currently chosen month,
    //     // we change its style to the accordingly chosen styles.
    //     else if(this.props.monthIndex === nextProps.current_month_index){
    //         this.setState({
    //             monthStyle: styles.chosenMonth
    //         })
    //     }
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.current_month_index === -1 || nextProps.monthIndex === nextProps.last_month_index) {
            return ({
                monthStyle: styles.unchosenMonth
            })
        }

        else if (nextProps.monthIndex === nextProps.current_month_index) {
            return ({
                monthStyle: styles.chosenMonth
            })
        }

        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.monthIndex === nextProps.current_month_index
            || this.props.monthIndex === nextProps.last_month_index
            || nextProps.current_month_index === -1
    }

    componentDidMount(){
        let {schedule} = this.props.task_data

        if(schedule){
            if(this.props.data.monthNumber === schedule.month && this.props.year === schedule.year){
                this.chooseMonth()
            }

            else{
                if(this.props.data.monthNumber === this.props.currentMonth && this.props.year === this.props.currentYear){
                    this.chooseMonth()
                }
            }
        }
        else{
            if(this.props.data.monthNumber === this.props.currentMonth && this.props.year === this.props.currentYear){
                this.chooseMonth()
            }
        }
        
    }

    render() {

        // We can do simple equality checks inside render()
        // If want to do complex logic, head out to memoize.
        // let monthStyle = styles.unchosenMonth

        // if(this.props.monthIndex === this.props.last_month_index || this.props.current_month_index === -1){
        //     monthStyle = styles.unchosenMonth
        // }

        // else if(this.props.monthIndex === this.props.current_month_index){
        //     monthStyle = styles.chosenMonth
        // }

        return (
            <TouchableHighlight
                style={{
                    width: 338 / 4,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                }}

                onPress={this.chooseMonth}
                underlayColor={"gainsboro"}
            >
                <View style={this.state.monthStyle}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500"
                        }}
                    >{this.props.data.monthName}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    unchosenMonth: {
        width: (338 / 4) - 10,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 7,
    },
    chosenMonth: {
        width: (338 / 4) - 10,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gainsboro",
        borderRadius: 7,
    }
})