import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'

export default class WeekAnnotationPanel extends Component{
    numberOfYears = 2
    week_data_array = []

    state = {
        currentMonth: 'This month',
        nextMonthColor: 'white',
        nextMonthTextColor: 'gray',
        thisMonthColor: 'black',
        thisMonthTextColor: 'white',

        week_data_array: []
    }

    chooseMonthOption = (monthOption) => {
        if(monthOption === "This month"){
            this.setState({
                thisMonthColor: 'black',
                thisMonthTextColor: 'white',
                nextMonthColor: 'white',
                nextMonthTextColor: 'gray'
            })
        }

        else if(monthOption === "Next month"){
            this.setState({
                thisMonthColor: 'white',
                thisMonthTextColor: 'gray',
                nextMonthColor: 'black',
                nextMonthTextColor: 'white'
            })
        }
    }

    _keyExtractor = (item, index) => `week-calendar-${index}`

    _renderItem = ({item, index}) => (
        <CalendarDisplayHolder 
            weekData = {item}
        />
    )
    
    initWeeks = () => {
        let year = new Date().getFullYear()

        this.getWeekData(new Date(year, 0, 1), new Date(year + this.numberOfYears, 11, 31), 1)

    }

    getWeekData = (firstDayOfWeek, endDay, noWeek) => {
        
        if(firstDayOfWeek.getTime() > endDay.getTime()){
            return
        }

        let weekData = {
            noWeek: 0,
            week_day_array : new Array(7),
            month: firstDayOfWeek.getMonth(),
            year: firstDayOfWeek.getFullYear()
        }

        //If noWeek = 53 meaning turn to the new year => reset to 1
        if(noWeek === 53){
            noWeek = 1
        }

        //When firstDayOfWeek is not Monday, meaning it starts the new year
        if(firstDayOfWeek.getDay() !== 1){
            let firstDayOfWeekInWeekDay = firstDayOfWeek.getDay() === 0 ? 7 : firstDayOfWeek.getDay() //Sunday will have an index of 7 instead of 0

            weekData.noWeek = 1
            
            for(let i = firstDayOfWeekInWeekDay; i <= 7; i++){
                if(i === firstDayOfWeekInWeekDay)
                    weekData.week_day_array[i - 1] = new Date( firstDayOfWeek.getTime() )
                
                else
                    weekData.week_day_array[i - 1] = new Date( firstDayOfWeek.getTime() + (60 * 60 * 24 * 1000) * (i - firstDayOfWeekInWeekDay) )
            }
        }

        //When firstDayOfWeek is Monday, meaning it is still in the current year
        else{
            weekData.noWeek = noWeek

            for(let i = firstDayOfWeek.getDay(); i <= 7; i++){
                weekData.week_day_array[i-1] = new Date( firstDayOfWeek.getTime() + (60 * 60 * 24 * 1000) * (i - 1) )
            }
        }

        this.week_data_array.push(weekData)

        //Get the last day of week to calculate the next Monday
        let nextMondayTime = new Date(weekData.week_day_array[6].getTime() + (60 * 60 * 24 * 1000) )


        this.getWeekData(nextMondayTime, endDay, weekData.noWeek + 1)
    }

    componentDidMount(){
        this.initWeeks()

        this.setState({
            week_data_array: [... this.week_data_array]
        })
    }

    render(){
        return(
            <>
            <View
                style={{
                    height: 80,
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                <View 
                    style={{
                        height: 35,
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: "gainsboro",
                        flexDirection: "row",
                    }}
                >
                    <TouchableHighlight 
                        style={{
                            backgroundColor: this.state.thisMonthColor,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                        onPress={this.chooseMonthOption.bind(this, "This month")}
                        underlayColor="transparent"
                    >
                        <Text
                            style={{
                                color: this.state.thisMonthTextColor
                            }}
                        >This month</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight 
                        style={{
                            backgroundColor: this.state.nextMonthColor,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                        onPress={this.chooseMonthOption.bind(this, "Next month")}    
                        underlayColor="transparent"
                    >
                        <Text
                            style={{
                                color: this.state.nextMonthTextColor
                            }}
                        >Next month</Text>
                    </TouchableHighlight>
                </View>
            </View>
            

            {/* Main content of week calendar */}
            <View style={{
                flex: 1,
                position: "relative",
                paddingHorizontal: 15,
            }}> 
                {/* Left highlighting color bar for week */}
                <View style={{
                    width: 40,
                    flex: 1,
                    backgroundColor: 'gray',
                    borderRadius: 25,
                    marginTop: 40,
                }}>

                </View>

                {/* Week Calendar */}
                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 15,
                    right: 15,
                    bottom: 0,
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 30,
                            marginBottom: 10,
                        }}
                    >
                        <DayInWeekHolder day='' />
                        <DayInWeekHolder day='M' />
                        <DayInWeekHolder day='T' />
                        <DayInWeekHolder day='W' />
                        <DayInWeekHolder day='T' />
                        <DayInWeekHolder day='F' />
                        <DayInWeekHolder day='S' />
                        <DayInWeekHolder day='Su' />
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={this._keyExtractor}
                        data={this.week_data_array}
                        removeClippedSubviews={true}
                        windowSize={10}
                        renderItem={this._renderItem}
                    >

                    </FlatList>
                </View>
            </View>

            <View style={{
                height: 100,
            }}>

            </View>
            </>
        )
    }
}

class DayInWeekHolder extends React.PureComponent{
    render(){
        return(
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
                    {this.props.day}
                </Text>
            </View>
        )
    }
}