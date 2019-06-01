import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'
import PureCalendarDisplayHolder from './calendar-display-holder/PureCalendarDisplayHolder'


export default class DayAnnotationPanel extends Component{
    month_order_array = []

    state = {
        renderDaysInMonth: null,
        currentIndexOfTotalCalendarMonth: 0,
        month_order_array: []
    }

    chooseDiffCalendarMonth = (index) => {
        this.setState({
            currentIndexOfTotalCalendarMonth: index
        })
    }

    initializeMonthsForCalendar = () => {
        let currentMonth = new Date().getMonth(),
            currentYear = new Date().getFullYear()

        this.getNumberOfMonthsInTheFuture(currentMonth, currentYear, ((12 * 30) + 1)) //To fully display the current month and also all the next stated months, plus 1
    }

    getNumberOfMonthsInTheFuture = (currentMonth, currentYear, numberOfMonths) => {
        if(numberOfMonths === 0){
            return
        }

        this.month_order_array.push({
            month: currentMonth,
            year: currentYear,
        })

        if(currentMonth === 11){
            currentMonth= 0
            currentYear += 1
        }

        else{
            currentMonth += 1
        }

        numberOfMonths -= 1

        this.getNumberOfMonthsInTheFuture(currentMonth, currentYear, numberOfMonths)
    }


    componentDidMount(){
        this.initializeMonthsForCalendar()

        this.setState({
            month_order_array: [... this.month_order_array]
        })
    }

    componentDidUpdate(prevProps, prevState){
    }

    _keyExtractor = (item, index) => `month-render-calendar-${index}`

    _renderItem = ({item, index}) => (
        // <CalendarDisplayHolder
        //     key={'month-render-calendar' + index}
            
        //     style={
        //         index === this.state.month_order_array.length - 1 ? 
        //         {
        //             flex: 1,
        //             width: Dimensions.get('window').width - 50,
        //             width: 300,
        //         }

        //         :

        //         {
        //             flex: 1,
        //             width: Dimensions.get('window').width - 50,
        //             marginRight: Dimensions.get('window').width - 50
        //         }
        //     } 
        //     month={item.month} 
        //     year={item.year}
        //     calendarIndex = {index}
        //     chooseDiffCalendarMonth = {this.chooseDiffCalendarMonth}
        //     currentIndexOfTotalCalendarMonth = {this.state.currentIndexOfTotalCalendarMonth}
        // />

        <PureCalendarDisplayHolder 
            key={'month-render-calendar' + index}

            style = {
                index === this.state.month_order_array.length - 1 ? 
                {
                    flex: 1,
                    width: Dimensions.get('window').width - 50,
                    width: 300,
                }

                :

                {
                    flex: 1,
                    width: Dimensions.get('window').width - 50,
                    marginRight: Dimensions.get('window').width - 50
                }
            }

            month={item.month} 
            year={item.year}
            calendarIndex = {index}
            chooseDiffCalendarMonth = {this.chooseDiffCalendarMonth}
            currentIndexOfTotalCalendarMonth = {this.state.currentIndexOfTotalCalendarMonth}
        /> 
    )

    render(){
        return(
            <>
            {/* Today Tommorow Next Monday */}
            <View style={{
                height: 80,
                paddingHorizontal: 30,
                paddingTop: 30,
                paddingBottom: 10,
            }}>
                <View style={{
                    height: 35,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: "gainsboro",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        backgroundColor: "black",
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 20,
                                fontWeight: "700"
                            }}
                        >Today</Text>
                    </View>
        
                    <View style={{
                        backgroundColor: "gainsboro",
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: "700"
                            }}
                        >Tomorrow</Text>
                    </View>
        
                    <View style={{
                        backgroundColor: "gainsboro",
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        
                    }}>
                        <Text
                            style={{
                                color: 'white',
                                paddingHorizontal: 10,
                                fontWeight: "700"
                            }}
                        >Next Monday</Text>
                    </View>
                </View>
            </View> 

            {/* Main content of calendar */}
            <View 
                style = {{
                    flex: 1,
                }}
            >
                <FlatList
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={(Dimensions.get('window').width - 50) * 2}
                    snapToAlignment="start"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this._keyExtractor}
                    initialNumToRender={1}
                    removeClippedSubviews={true}
                    data={this.state.month_order_array}
                    extraData={this.state.currentIndexOfTotalCalendarMonth}
                    renderItem={this._renderItem}
                    windowSize={5}
                >

                </FlatList>
            </View>
            

            <View
                style={{
                    height: 50,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gainsboro',
                    borderTopColor: 'gainsboro',
                    justifyContent: "center"
                }}
            >
                <Text>
                    Add time
                </Text>
            </View>

            <View
                style={{
                    height: 50,
                    backgroundColor: 'white',
                    justifyContent: "center"
                }}
            >
                <Text>
                    Add reminder
                </Text>
            </View>
            <View
                style={{
                    height: 60,
                    backgroundColor: 'white',
                    marginBottom: 20,
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