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


DayInWeekHolder = (props) => (
    <View
        style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Text
            style={{
                color: "gray",
            }}
        >
            {props.day}
        </Text>
    </View>
)

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class DayAnnotationPanel extends Component{

    state = {
        currentMonthInText: 'May',
        currentYear: '2019',
        renderDaysInMonth: null
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
    }

    getDayWordInWeek = (dayInWeek) => {
        if(dayInWeek === 0){
            return 'S'
        }

        else if (dayInWeek === 1){
            return 'M'
        }

        else if (dayInWeek === 2){
            return 'T'
        }

        else if (dayInWeek === 3){
            return 'W'
        }

        else if (dayInWeek === 4){
            return 'T'
        }

        else if (dayInWeek === 5){
            return 'F'
        }

        else if (dayInWeek === 6){
            return 'S'
        }
    }

    componentDidMount(){
        let currentMonth = new Date().getMonth(),
            currentMonthInText = monthNames[currentMonth],
            currentYear = new Date().getFullYear()
        
        this.setState({currentMonthInText, currentYear})

        let daysInMonth = this.getDaysInMonth(currentMonth + 1, currentYear),
            calendar_row_array = [new Array(7), new Array(7), new Array(7), new Array(7), new Array(7), new Array(7)], //6 rows in total
            display_day_array = [] //length of 7*6 = 42

        let daysInLastMonth
        //To check the current month is January or not
        if(currentMonth !== 0)
            daysInLastMonth = this.getDaysInMonth(currentMonth, currentYear)

        else
            daysInLastMonth = this.getDaysInMonth(12, currentYear - 1)

        let firstDayOfCurrentMonthInWeek = new Date(currentYear, currentMonth, 1).getDay() ,
            numberOfDaysFromLastMonth

        if(firstDayOfCurrentMonthInWeek !== 0){
            numberOfDaysFromLastMonth = firstDayOfCurrentMonthInWeek - 1
        }

        else{
            numberOfDaysFromLastMonth = 6
        }

        //Get the days in last month
        for(let i = daysInLastMonth - numberOfDaysFromLastMonth + 1; i <= daysInLastMonth; i++){
            display_day_array.push(i) 
        }

        //Get the days in current month
        for(let i = 1; i <= daysInMonth; i++){
            display_day_array.push(i)
        }

        let lastDayInWeekOfCurrentMonth = new Date(currentYear, currentMonth, daysInMonth).getDay(),
            postDaysFromNextMonth = 7 - lastDayInWeekOfCurrentMonth

        //Get the days in next month
        for(let i = 1; i <= postDaysFromNextMonth; i++){
            display_day_array.push(i)
        }

        if(display_day_array.length < 42){
            for(let i = display_day_array.length; i < 42; i++){
                display_day_array.push(<></>)
            }
        }

        

        for(let i = 0; i < display_day_array.length; i++){
            let dayInWeek = new Date(currentYear, currentMonth - 1, display_day_array[i]).getDay(),
                dayWord = this.getDayWordInWeek(dayInWeek)

            calendar_row_array[parseInt((i) / 7)].push(
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    key={"view holder for day in calendar " + i}
                >
                    <Text
                        style={{
                            color: "black",
                        }}
                    >
                        {display_day_array[i]}
                    </Text>
                </View>
            )
        }

        this.setState({
            renderDaysInMonth: calendar_row_array.map((elements, index) => (
                <View 
                    key={index}
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    {elements}
                </View>
            ))
        })
    }


    render(){
        return(
            <>
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


            <View 
                style = {{
                    flex: 1,
                }}
            >
                <ScrollView
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={Dimensions.get('window').width - 50}
                    snapToAlignment="center"

                    showsHorizontalScrollIndicator={false}

                >
                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                            
                    }}>
                        <View style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: "500"
                                    }}
                                >
                                    {this.state.currentMonthInText}
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontSize: 14,
                                        marginLeft: 5
                                    }}
                                >
                                    {this.state.currentYear}
                                </Text>
                            </View>
                            
                        </View>

                        <View
                            style={{
                                flex: 1,
                                marginTop: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <DayInWeekHolder day='M' />
                                <DayInWeekHolder day='T' />
                                <DayInWeekHolder day='W' />
                                <DayInWeekHolder day='T' />
                                <DayInWeekHolder day='F' />
                                <DayInWeekHolder day='S' />
                                <DayInWeekHolder day='S' />
                            </View>

                            {this.state.renderDaysInMonth}
                            
                        </View>
                    </View>


                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                            
                    }}>
                        <View style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Text>
                                February 2019
                            </Text>
                        </View>
                    </View>


                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                            
                    }}>
                        <View style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Text>
                                February 2019
                            </Text>
                        </View>
                    </View>


                </ScrollView>
            </View>

            </>
        )
    }
}