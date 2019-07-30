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

export default class MonthAnnotationPanel extends Component {

    numberOfYears = 30

    month_array_data = []

    month_value_array = []

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

                    updateStartingDate = {this.props.updateStartingDate}
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
                
                updateStartingDate = {this.props.updateStartingDate}
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

    _disableAllTabs = () => {
        this.props.disableAllTabs()
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

                        onPress={this._disableAllTabs}
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