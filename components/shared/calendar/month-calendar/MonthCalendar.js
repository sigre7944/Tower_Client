import React, { Component } from 'react'

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';


const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

// export default class MonthCalendar extends Component {

//     numberOfYears = 30

//     month_array_data = []

//     month_value_array = []

//     chosen_month = chosen_year = -1

//     currentMonth = new Date().getMonth()
//     currentYear = new Date().getFullYear()

//     state = {
//         month_array_data: [],

//         current_year_index: -1,
//         last_year_index: -1,
//     }

//     _chooseRepeatOption = () => {
//         this.props.chooseRepeatOption()
//     }

//     returnToCurrentYear = () => {
//         if (this._flatlistRef) {
//             this._flatlistRef.scrollToOffset({ animated: true, offset: 0 })
//         }
//     }

//     _keyExtractor = (item, index) => `month-calendar-${index}`

//     _renderItem = ({ item, index }) => (
//         <CalendarDisplayHolder
//             monthData={item}
//             yearIndex={index}
//             marginLeft={index === 0 ? 0 : 338}
//             changeCurrentYearIndex={this.changeCurrentYearIndex}
//             last_year_index={this.state.last_year_index}
//             current_year_index={this.state.current_year_index}

//             returnToCurrentYear={this.returnToCurrentYear}

//             currentMonth={this.currentMonth}
//             currentYear={this.currentYear}

//             setData={this.setData}
//             task_data={this.props.task_data}
//         />
//     )

//     changeCurrentYearIndex = (index) => {
//         this.setState((state, props) => {
//             if (state.current_year_index !== index) {
//                 return {
//                     current_year_index: index,
//                     last_year_index: state.current_year_index
//                 }
//             }
//         })
//     }

//     initMonths = () => {
//         let current_year = new Date().getFullYear()

//         for (let i = 0; i < 12; i++) {
//             this.month_value_array.push({
//                 monthName: monthNames[i],
//                 monthNumber: i
//             })
//         }

//         for (let i = 0; i < 30; i++) {
//             this.month_array_data.push({
//                 month_value_array: this.month_value_array,
//                 year: (current_year + i)
//             })
//         }

//         this.setState({
//             month_array_data: [... this.month_array_data]
//         })
//     }

//     setData = (month, year) => {
//         this.props.setData(month, year)
//     }

//     componentDidMount() {
//         this.initMonths()
//     }

//     componentDidUpdate(prevProps, prevState){
//         if(this.props.toggle_clear !== prevProps.toggle_clear){

//         }
//     }

//     render() {
//         return (
//             <>
//                 <View style={{
//                     flex: 1,
//                     paddingTop: 30,
//                     paddingBottom: 20,
//                 }}>
//                     <FlatList
//                         keyExtractor={this._keyExtractor}
//                         data={this.state.month_array_data}
//                         extraData={this.state.current_year_index}
//                         renderItem={this._renderItem}
//                         horizontal={true}
//                         showsHorizontalScrollIndicator={false}
//                         decelerationRate={0}
//                         snapToAlignment="start"
//                         snapToInterval={338 * 2}
//                         initialNumToRender={1}
//                         maxToRenderPerBatch={10}
//                         windowSize={11}
//                         removeClippedSubviews={true}
//                         ref={(c) => this._flatlistRef = c}
//                     >

//                     </FlatList>
//                 </View>
//             </>
//         )
//     }
// }

// class CalendarDisplayHolder extends React.PureComponent {

//     state = {
//         current_month_index: -1,
//         last_month_index: -1,
//     }

//     changeCurrentMonthIndex = (index) => {
//         if (this.state.current_month_index !== index) {
//             this.setState((state, props) => ({
//                 current_month_index: index,
//                 last_month_index: state.current_month_index
//             }))
//         }
//     }

//     resetCurrentAndLastMonthIndexes = () => {
//         this.setState({
//             current_month_index: -1,
//             last_month_index: -1
//         })
//     }


//     // AVOID USING componentWillReceiveProps, use getDerivedStateFromProps and componentDidMount to replace logic
//     // or apply logic directly into render()

//     // UNSAFE_componentWillReceiveProps(nextProps){
//     //     // When the currently chosen year becomes the previously chosen year,
//     //     // we reset the state to the initia => MonthHolder will be updated too.
//     //     // This condition prevents re-rendering on many CalendarDisplayHolder, only
//     //     // re-render the needed one.
//     //     if(this.props.yearIndex === nextProps.last_year_index){
//     //         this.resetCurrentAndLastMonthIndexes()
//     //     }
//     // }

//     static getDerivedStateFromProps(nextProps, prevState) {
//         if (nextProps.yearIndex === nextProps.last_year_index) {
//             return ({
//                 current_month_index: -1,
//                 last_month_index: -1
//             })
//         }

//         return null
//     }

//     // shouldComponentUpdate(nextProps, nextState) {
//     //     // we only re-render when yearIndex equals to last_year_index, meaning
//     //     // the case that the current calendar was the previously chosen calendar => to
//     //     // update its style to origin.
//     //     // And only re-rende when yearIndex equals to current_year_index, meaning
//     //     // the case that current calendar is the currently chosen calendar => to
//     //     // update its style to the chosen styles.
//     //     return this.props.yearIndex === nextProps.last_year_index
//     //         || this.props.yearIndex === nextProps.current_year_index
//     // }

//     render() {
//         return (
//             <>
//                 <View style={{
//                     width: 338,
//                     marginLeft: this.props.marginLeft
//                 }}>
//                     <DisplayYear
//                         year={this.props.monthData.year}
//                         returnToCurrentYear={this.props.returnToCurrentYear}
//                     />

//                     <View style={{
//                         flexDirection: "row",
//                         flexWrap: "wrap",
//                         height: 400,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flex: 1,
//                         marginTop: 30,
//                     }}>
//                         {this.props.monthData.month_value_array.map((data, index) => (
//                             <MonthHolder
//                                 key={"month-" + index + "-year-" + this.props.monthData.year}

//                                 {... this.props}

//                                 data={data}
//                                 monthIndex={index}
//                                 current_month_index={this.state.current_month_index}
//                                 last_month_index={this.state.last_month_index}
//                                 changeCurrentMonthIndex={this.changeCurrentMonthIndex}
//                                 resetCurrentAndLastMonthIndexes={this.resetCurrentAndLastMonthIndexes}

//                                 currentMonth={this.props.currentMonth}
//                                 currentYear={this.props.currentYear}
//                                 year={this.props.monthData.year}

//                             />
//                         ))}
//                     </View>

//                 </View>
//             </>
//         )
//     }
// }

// class DisplayYear extends React.PureComponent {
//     // shouldComponentUpdate(nextProps, nextState){
//     //     return this.props.year !== nextProps.year
//     // }

//     _onPress = () => {
//         this.props.returnToCurrentYear()
//     }

//     render() {
//         return (
//             <TouchableHighlight
//                 style={{
//                     height: 50,
//                     alignItems: "center",
//                     justifyContent: "center"
//                 }}

//                 onPress={this._onPress}
//             >
//                 <Text style={{
//                     fontSize: 24,

//                 }}>
//                     {this.props.year}
//                 </Text>
//             </TouchableHighlight>
//         )
//     }
// }

// class MonthHolder extends React.PureComponent {

//     state = {
//         monthStyle: styles.unchosenMonth
//     }

//     chooseMonth = () => {
//         this.setState({
//             monthStyle: styles.chosenMonth
//         })

//         this.props.changeCurrentYearIndex(this.props.yearIndex)

//         this.props.changeCurrentMonthIndex(this.props.monthIndex)

//         this.props.setData(this.props.data.monthNumber, this.props.year)
//     }


//     // AVOID USING componentWillReceiveProps, use getDerivedStateFromProps and componentDidMount to replace logic
//     // or apply logic directly into render()

//     // UNSAFE_componentWillReceiveProps(nextProps){
//     //     // When monthIndex is not equal to last_month_index, meaning 
//     //     // the locally chosen month in the currently chosen calendar was changed 
//     //     // to previously chosen month.
//     //     // When current_month_index equals to -1, meaning the calendar becomes the
//     //     // previously chosen calendar, we reset the style.
//     //     if(this.props.monthIndex === nextProps.last_month_index || nextProps.current_month_index === -1){
//     //         this.setState({
//     //             monthStyle: styles.unchosenMonth
//     //         })
//     //     }

//     //     // When monthIndex equals to current_month_index, meaning the locally chosen
//     //     // month in the currently chosen calendar was changed to the currently chosen month,
//     //     // we change its style to the accordingly chosen styles.
//     //     else if(this.props.monthIndex === nextProps.current_month_index){
//     //         this.setState({
//     //             monthStyle: styles.chosenMonth
//     //         })
//     //     }
//     // }

//     static getDerivedStateFromProps(nextProps, prevState) {
//         if (nextProps.current_month_index === -1 || nextProps.monthIndex === nextProps.last_month_index) {
//             return ({
//                 monthStyle: styles.unchosenMonth
//             })
//         }

//         else if (nextProps.monthIndex === nextProps.current_month_index) {
//             return ({
//                 monthStyle: styles.chosenMonth
//             })
//         }

//         return null
//     }

//     // shouldComponentUpdate(nextProps, nextState) {
//     //     return this.props.monthIndex === nextProps.current_month_index
//     //         || this.props.monthIndex === nextProps.last_month_index
//     //         || nextProps.current_month_index === -1
//     // }

//     componentDidMount() {
//         let { schedule } = this.props.task_data

//         if (schedule) {
//             if (this.props.data.monthNumber === schedule.month && this.props.year === schedule.year) {
//                 this.chooseMonth()
//             }

//             else {
//                 if (this.props.data.monthNumber === this.props.currentMonth && this.props.year === this.props.currentYear) {
//                     this.chooseMonth()
//                 }
//             }
//         }
//         else {
//             if (this.props.data.monthNumber === this.props.currentMonth && this.props.year === this.props.currentYear) {
//                 this.chooseMonth()
//             }
//         }

//     }

//     render() {

//         // We can do simple equality checks inside render()
//         // If want to do complex logic, head out to memoize.
//         // let monthStyle = styles.unchosenMonth

//         // if(this.props.monthIndex === this.props.last_month_index || this.props.current_month_index === -1){
//         //     monthStyle = styles.unchosenMonth
//         // }

//         // else if(this.props.monthIndex === this.props.current_month_index){
//         //     monthStyle = styles.chosenMonth
//         // }

//         return (
//             <TouchableHighlight
//                 style={{
//                     width: 338 / 4,
//                     height: 100,
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}

//                 onPress={this.chooseMonth}
//                 underlayColor={"gainsboro"}
//             >
//                 <View style={this.state.monthStyle}>
//                     <Text
//                         style={{
//                             fontSize: 18,
//                             fontWeight: "500"
//                         }}
//                     >{this.props.data.monthName}</Text>
//                 </View>
//             </TouchableHighlight>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     unchosenMonth: {
//         width: (338 / 4) - 10,
//         height: 80,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "white",
//         borderRadius: 7,
//     },
//     chosenMonth: {
//         width: (338 / 4) - 10,
//         height: 80,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "gainsboro",
//         borderRadius: 7,
//     }
// })

export default class MonthCalendar extends Component {
    year_data = []

    year = new Date().getFullYear()

    start_index = 0

    state = {
        current_year_index: -1,
        last_year_index: -1,

        current_month_index: -1,
        last_month_index: -1,

        should_flatlist_update: 0
    }

    returnToCurrentYear = () => {
        if (this._flatlistRef) {
            this._flatlistRef.scrollToOffset({ animated: true, offset: 0 })
        }
    }

    _keyExtractor = (item, index) => `month-calendar-${index}`

    _renderItem = ({ item, index }) => (
        <MonthHolder
            data={item}
            year_index={index}

            current_year_index={this.state.current_year_index}
            last_year_index={this.state.last_year_index}

            current_month_index={this.state.current_month_index}
            last_month_index={this.state.last_month_index}

            returnToCurrentYear={this.returnToCurrentYear}

            chooseMonth={this.chooseMonth}

            setData={this.setData}
            task_data={this.props.task_data}
        />
    )

    _onEndReached = () => {
        this.year += 1

        this.initMonths(this.year)

        this.setState(prevState => ({
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    chooseMonth = (month_index, year_index) => {
        this.setState(prevState => ({
            current_month_index: month_index,
            last_month_index: prevState.current_month_index,
            current_year_index: year_index,
            last_year_index: prevState.current_year_index,

            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    initMonths = (year) => {
        let month_data = []

        for (let i = 0; i < 12; i++) {
            month_data.push({
                monthName: monthNames[i],
                monthNumber: i
            })
        }

        this.year_data.push({ month_data, year })
    }

    setData = (month, year) => {
        this.props.setData(month, year)
    }

    _getItemLayout = (data, index) => ({
        length: 338,
        offset: index * 338,
        index
    })

    componentDidMount() {
        let { schedule } = this.props.task_data,
            current = new Date()

        for (let i = current.getFullYear(); i <= schedule.year; i++) {
            this.initMonths(i)
        }

        this.year = schedule.year
        this.start_index = this.year_data.length - 1

        this.setState(prevState => ({
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.toggle_clear !== prevProps.toggle_clear) {
            this.returnToCurrentYear()
            this.chooseMonth(new Date().getMonth(), 0)
        }
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
                        data={this.year_data}
                        extraData={this.state.should_flatlist_update}
                        renderItem={this._renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        snapToAlignment="start"
                        snapToInterval={338}
                        // initialNumToRender={1}
                        // maxToRenderPerBatch={10}
                        // windowSize={11}
                        // removeClippedSubviews={true}
                        ref={(c) => this._flatlistRef = c}
                        onEndReachedThreshold={0.9}
                        onEndReached={this._onEndReached}
                        getItemLayout={this._getItemLayout}
                        initialScrollIndex={this.start_index}
                    >

                    </FlatList>
                </View>
            </>
        )
    }
}


class MonthHolder extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.year_index === nextProps.current_year_index || this.props.year_index === nextProps.last_year_index
    }

    render() {
        return (
            <View
                style={{
                }}
            >
                <DisplayYear
                    year={this.props.data.year}
                    returnToCurrentYear={this.props.returnToCurrentYear}
                />

                <View
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: 338,
                    }}
                >
                    {this.props.data.month_data.map((m, index) => (
                        <Month
                            key={`month-${index}`}
                            month_data={m}
                            month_index={index}
                            year={this.props.data.year}
                            {... this.props}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

class DisplayYear extends React.PureComponent {

    _onPress = () => {
        this.props.returnToCurrentYear()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 338,
                    justifyContent: "center",
                    alignItems: "center",
                }}

                onPress={this._onPress}
            >
                <Text
                    style={{
                        fontSize: 20
                    }}
                >
                    {this.props.year}
                </Text>
            </TouchableOpacity>
        )
    }
}

class Month extends React.Component {

    state = {
        style: styles.unChosen
    }

    _onPress = () => {
        this.props.chooseMonth(this.props.month_index, this.props.year_index)
        this.props.setData(this.props.month_data.monthNumber, this.props.year)
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.month_index === nextProps.current_month_index && this.props.year_index === nextProps.current_year_index)
            || (this.props.month_index === nextProps.last_month_index && this.props.year_index === nextProps.current_year_index)
            || (this.props.month_index === nextProps.last_month_index && this.props.year_index === nextProps.last_year_index)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.month_index === nextProps.current_month_index && nextProps.year_index === nextProps.current_year_index) {
            return ({
                style: styles.chosen
            })
        }

        else if (nextProps.month_index === nextProps.last_month_index && nextProps.year_index === nextProps.current_year_index) {
            return ({
                style: styles.unChosen
            })
        }

        else if (nextProps.month_index === nextProps.last_month_index && nextProps.year_index === nextProps.last_year_index) {
            return ({
                style: styles.unChosen
            })
        }

        return null
    }

    componentDidMount() {
        let { schedule } = this.props.task_data

        if (this.props.month_data.monthNumber === schedule.month && this.props.year === schedule.year) {
            this._onPress()
        }
    }


    render() {
        return (
            <TouchableOpacity
                style={this.state.style}

                onPress={this._onPress}
            >
                <Text>
                    {this.props.month_data.monthName}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    unChosen: {
        width: 338 / 4,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    chosen: {
        width: 338 / 4,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink"
    }
})