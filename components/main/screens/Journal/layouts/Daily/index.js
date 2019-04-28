import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
    Button,
    ScrollView,
    TouchableHighlight
} from 'react-native';

let scrollViewRef,
    dayHolderWidth = 60,
    days_arr = [],
    today = new Date().getDate()
    

export default class Daily extends React.Component{
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    state = {
        dailyTimeView: null,
        days_style_arr: [],
        day_chosen: 0
    }

    componentDidMount(){
        days_arr.length = 0

        let month = new Date().getMonth() + 1,
            year = new Date().getFullYear()

        
        let daysInMonth = this.getDaysInMonth(month, year),
            days_style_arr = []

        for(let i = 1; i <= daysInMonth; i++){
            let dayWord,
                dayInWeek = new Date(year, month-1, i).getDay()

            if(dayInWeek === 0){
                dayWord = 'Su'
            }

            else if (dayInWeek === 1){
                dayWord = 'Mo'
            }

            else if (dayInWeek === 2){
                dayWord = 'Tu'
            }

            else if (dayInWeek === 3){
                dayWord = 'We'
            }

            else if (dayInWeek === 4){
                dayWord = 'Th'
            }

            else if (dayInWeek === 5){
                dayWord = 'Fr'
            }

            else if (dayInWeek === 6){
                dayWord = 'Sa'
            }

            days_arr.push({
               dayWord: dayWord,
               dayNumb: i,
               chosen: false
            })

            days_style_arr.push({
                color: 'gray'
            })
        }

        
        this.setState({
            days_style_arr: days_style_arr
        })
        
        this.focusScrollViewToDay(scrollViewRef, days_arr, today)
    }

    
    componentDidUpdate(prevProps, prevState){
        if(this.state.days_style_arr !== prevState.days_style_arr){
            console.log(true)
            this.setState({
                dailyTimeView: days_arr.map((obj, index) => {
                    if(obj.dayNumb === today){
                        return (
                            <TouchableHighlight 
                                onPress={this.chooseDay.bind(this, scrollViewRef, days_arr, obj.dayNumb, index)} 
                                style={styles.dayHolder} 
                                key={obj + " " + index}
                                underlayColor={'#dcdcdc'}
                            >
                            <>
                                <View>
                                    <Text
                                        style={{
                                            fontWeight: "600",
                                        }}
                                    >
                                        {obj.dayWord}
                                    </Text>
                                </View>
    
                                <View 
                                    style={{
                                        height: 35,
                                        width: dayHolderWidth,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text 
                                        style={{
                                            fontWeight: "600",
                                        }}
                                    > 
                                        {obj.dayNumb}
                                    </Text>
                                </View>
                            </>
                            </TouchableHighlight>
                        )
                    }
                    
                    else{
                        return (
                            <TouchableHighlight 
                                onPress={this.chooseDay.bind(this, scrollViewRef, days_arr, obj.dayNumb,index)} 
                                style={styles.dayHolder} 
                                key={obj + " " + index}
                                underlayColor={'#dcdcdc'}
                                onFocus={() => console.log(true)}
                            >
                            <>
                                <View>
                                    <Text
                                        style={{
                                            color: 'gray'
                                        }}
                                    >
                                        {obj.dayWord}
                                    </Text>
                                </View>
    
                                <View 
                                    style={{
                                        height: 35,
                                        width: dayHolderWidth,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={this.state.days_style_arr[index]}
                                    >
                                        {obj.dayNumb}
                                    </Text>
                                </View>
                            </>
                            </TouchableHighlight>
                        )
                    }
                })
            })
        }
    }

    chooseDay = (scrollViewRef, days_arr, day, dayIndex) => {
        let days_style_arr = this.state.days_style_arr

        days_style_arr[dayIndex] = {
            color: 'black'
        }

        this.setState({
            days_style_arr: days_style_arr
        })

        this.focusScrollViewToDay(scrollViewRef, days_arr, day)
    }

    focusScrollViewToDay = (scrollViewRef, days_arr, day) => {
        let dayIndex = days_arr.findIndex(obj => obj.dayNumb === day),
            x_off_set

        if(dayIndex > (days_arr.length - 4)){
            dayIndex = days_arr.length - 7
            scrollViewRef.scrollTo({
                y: 0,
                x: dayIndex * dayHolderWidth
            })
        }

        else if (dayIndex < 3){
            scrollViewRef.scrollTo({
                y: 0,
                x: 0
            })
        }

        else{
            dayIndex -= 3
            x_off_set = dayIndex * dayHolderWidth

            scrollViewRef.scrollTo({
                y: 0,
                x: x_off_set
            })
        }
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewContainer} 
                    horizontal={true} 
                    ref={view => scrollViewRef = view}
                    indicatorStyle='white'
                    onScroll={this.onScrolling}
                    scrollEventThrottle={1}
                >
                    {/* <View style={styles.underlayIndicator}>
                    </View> */}

                    {this.state.dailyTimeView}

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },

    scrollViewContainer: {
        height: 70,
    },

    dayHolder: {
        width: dayHolderWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },

    currentDayHolder: {
        height: 35, //half the size of scrollViewContainer's height
        width: 35,  //equal to height to form a square
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 35/2
    },

    underlayIndicator: {
        position: 'absolute',
        width: dayHolderWidth,
        backgroundColor: 'yellow',
        height: 70,
        
    },

    unactive: {
        color: 'gray'
    }
})