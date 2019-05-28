import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'

export default class DayAnnotationPanel extends Component{

    state = {
        renderDaysInMonth: null,
        currentIndexOfTotalCalendarMonth: 0,
        monthComponent_arr: null
    }

    chooseDiffCalendarMonth = (index) => {
        this.setState({
            currentIndexOfTotalCalendarMonth: index
        })
    }

    centerlizeCurrentMonth = (currentMonth, currentYear) => {
        let monthsToDisplay_arr = []

        //get the past 5 months and current month (6 in total)
        //if current month is a month in between January - April
        if(currentMonth - 5 < 0){
            let monthsFromLastYear = 5 - currentMonth

            //Get the data of months from the last year
            for(let i = 11 - (monthsFromLastYear) + 1; i <= 11; i++){
                monthsToDisplay_arr.push({
                    month: i,
                    year: currentYear - 1
                })
            }

            //Get the data of past months in the current year
            for(let i = 0; i <= currentMonth; i ++){
                monthsToDisplay_arr.push({
                    month: i,
                    year: currentYear
                })
            }
        }

        else {
            //Get the data of past months in the current year
            for(let i = 0; i <= currentMonth; i ++){
                monthsToDisplay_arr.push({
                    month: i,
                    year: currentYear
                })
            }
        }

        //Get the next 6 months
        //if current month is a month in between July - December
        if(11 - currentMonth < 6){
            let monthsInNextYear = 6 - (11 - currentMonth)

            //Get the data of next months in the current year
            for(let i = currentMonth + 1; i <= 11; i++){
                monthsToDisplay_arr.push({
                    month: i,
                    year: currentYear,
                })
            }

            //Get the data of months in the next year
            for(let i = 0; i < (monthsInNextYear - 1); i++){
                monthsToDisplay_arr.push({
                    month: i,
                    year: currentYear + 1,
                })
            }
        }

        else {
            //Get the data of next months in the current year
            for(let i = currentMonth + 1; i <= 11; i++){
                monthsToDisplay_arr.push({
                    month: i,
                    year: currentYear,
                })
            }
        }

        this.setState({
            monthComponent_arr: monthsToDisplay_arr.map((data, index) => (
                <CalendarDisplayHolder 
                key={'month-render-calendar' + index}
                style={{
                    flex: 1,
                    width: Dimensions.get('window').width - 50,
                    marginRight: (Dimensions.get('window').width - 50)
                }} 

                month={data.month} 
                year={data.year}

                chooseDiffCalendarMonth = {this.chooseDiffCalendarMonth}
                currentIndexOfTotalCalendarMonth = {this.state.currentIndexOfTotalCalendarMonth}
                calendarIndex = {index}
                />
            ))
        })
    }

    componentDidMount(){
        let currentMonth = new Date().getMonth(),
            currentYear = new Date().getFullYear()

        this.centerlizeCurrentMonth(currentMonth, currentYear)
    }

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
                <ScrollView
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={(Dimensions.get('window').width - 50) * 2}
                    snapToAlignment="start"
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd = {() => {

                    }}
                >

                    {this.state.monthComponent_arr}

                </ScrollView>
            </View>
            

            <View
                style={{
                    height: 50,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gainsboro',
                    borderTopColor: 'gainsboro',
                }}
            >
                <Text>
                    Add time
                </Text>
            </View>
            <View
                style={{
                    height: 50,
                    backgroundColor: 'yellow'
                }}
            >

            </View>
            <View
                style={{
                    height: 60,
                    backgroundColor: 'black',
                    marginBottom: 20,
                }}
            >

            </View>
            </>
        )
    }
}