import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class CalendarDisplayHolder extends Component {

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
                    width: Dimensions.get("window").width - 80,
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
        if(this.props.data.monthNumber === this.props.currentMonth && this.props.year === this.props.currentYear){
            this.chooseMonth()
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
                    width: (Dimensions.get("window").width - 80) / 4,
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
        width: ((Dimensions.get("window").width - 80) / 4) - 10,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 7,
    },
    chosenMonth: {
        width: ((Dimensions.get("window").width - 80) / 4) - 10,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gainsboro",
        borderRadius: 7,
    }
})
