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
    today = new Date().getDate(),
    lastDayIndex 
    

export default class Daily extends React.Component{
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    state = {
        dailyTimeView: null,
        day_number_style_arr: [],
        days_arr: []
    }

    componentDidMount(){
        days_arr.length = 0

        let month = new Date().getMonth() + 1,
            year = new Date().getFullYear()

        
        let daysInMonth = this.getDaysInMonth(month, year),
            day_number_style_arr = []

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

            day_number_style_arr.push(styles.circleCenterDayNumberHolder)
        }

        this.setState({
            days_arr: days_arr.map(day => {return day})
        })

        this.setState({
            day_number_style_arr: day_number_style_arr.map(style => {return style})
        })
        
        this.focusScrollViewToDay(scrollViewRef, days_arr, today)
    }

    
    componentDidUpdate(prevProps, prevState){
    }

    chooseDay = (scrollViewRef, days_arr, day, dayIndex) => {
        let day_number_style_arr = this.state.day_number_style_arr

        if(lastDayIndex){
            day_number_style_arr[lastDayIndex] = {...styles.circleCenterDayNumberHolder, backgroundColor: 'transparent'}
        }
            
        day_number_style_arr[dayIndex] = {...styles.circleCenterDayNumberHolder, backgroundColor: 'black'}


        this.setState({
            day_number_style_arr: day_number_style_arr.map(style => {return style})
        })

        this.focusScrollViewToDay(scrollViewRef, days_arr, day)

        lastDayIndex = dayIndex
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
                    {this.state.days_arr.map((obj, index) => {
                        if(obj.dayNumb === today){
                            return (
                                <TouchableHighlight 
                                    onPress={this.chooseDay.bind(this, scrollViewRef, days_arr, obj.dayNumb, index)} 
                                    style={styles.dayHolder} 
                                    key={obj + " " + index}
                                    underlayColor='#e3e3e3'
                                >
                                <>
                                    <View>
                                        <Text
                                            style={styles.biggerFontWeightForToday}
                                        >
                                            {obj.dayWord}
                                        </Text>
                                    </View>
        
                                    <View 
                                        style={styles.dayNumberHolder}
                                    >   
                                        <View style={styles.circleCenterDayNumberHolder}>
                                            <Text 
                                                style={styles.biggerFontWeightForToday}
                                            > 
                                                {obj.dayNumb}
                                            </Text>
                                        </View>
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
                                    underlayColor='#e3e3e3'
                                >
                                <>
                                    <View>
                                        <Text
                                            style={styles.notToday}
                                        >
                                            {obj.dayWord}
                                        </Text>
                                    </View>
        
                                    <View 
                                        style={styles.dayNumberHolder}
                                    >
                                        <View style={this.state.day_number_style_arr[index]}>
                                            <Text
                                                style={styles.notToday}
                                            >
                                                {obj.dayNumb}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                                </TouchableHighlight>
                            )
                        }
                    })}

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

    dayNumberHolder: {
        height: 35,
        width: dayHolderWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },

    underlayIndicator: {
        position: 'absolute',
        width: dayHolderWidth,
        backgroundColor: 'yellow',
        height: 70,
    },

    biggerFontWeightForToday: {
        fontWeight: "600"
    },

    notToday: {
        color: 'gray'
    },

    circleCenterDayNumberHolder: {
        marginTop: 10,
        height: 25,
        width: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
})