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
    dayHolderWidth = 60
    

export default class Daily extends React.Component{
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    state = {
        dailyTimeView: null
    }

    componentDidMount(){
        let today = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear()
        
        let daysInMonth = this.getDaysInMonth(month, year)

        let days_arr = []

        for(let i = 1; i <= daysInMonth; i++){
            let dayWord,
                dayInWeek = new Date(year, month, i).getDay()

            if(dayInWeek === 0){
                dayWord = 'Su'
            }

            else if (dayInWeek === 1){
                dayWord = 'M'
            }

            else if (dayInWeek === 2){
                dayWord = 'T'
            }

            else if (dayInWeek === 3){
                dayWord = 'W'
            }

            else if (dayInWeek === 4){
                dayWord = 'Th'
            }

            else if (dayInWeek === 5){
                dayWord = 'F'
            }

            else if (dayInWeek === 6){
                dayWord = 'S'
            }

            days_arr.push({
               dayWord: dayWord,
               dayNumb: i
            })
        }

        this.setState({
            dailyTimeView: days_arr.map((obj, index) => {
                if(obj.dayNumb === today){
                    return (
                        <TouchableHighlight onPress={() => console.log("true")} style={styles.dayHolder} key={obj + " " + index}>
                        <>
                            <View>
                                <Text>{obj.dayWord}</Text>
                            </View>

                            <View style={styles.currentDayHolder}>
                                <Text 
                                    style={{
                                        color: 'white'
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
                        <TouchableHighlight onPress={() => console.log("true")} style={styles.dayHolder} key={obj + " " + index}>
                        <>
                            <View>
                                <Text>{obj.dayWord}</Text>
                            </View>

                            <View 
                                style={{
                                    height: 35,
                                    width: dayHolderWidth,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text>{obj.dayNumb}</Text>
                            </View>
                        </>
                        </TouchableHighlight>
                    )
                }
            })
        })


        this.focusScrollViewToToday(scrollViewRef, days_arr, today)
    }

    focusScrollViewToToday = (scrollViewRef, days_arr, today) => {
        let todayIndex = days_arr.findIndex(obj => obj.dayNumb === today),
            x_off_set

        if(todayIndex > (days_arr.length - 3)){
            todayIndex = days_arr.length - 7
            scrollViewRef.scrollTo({
                y: 0,
                x: todayIndex * dayHolderWidth
            })
        }

        else if (todayIndex < 3){
            scrollViewRef.scrollTo({
                y: 0,
                x: 0
            })
        }

        else{
            todayIndex -= 3
            x_off_set = todayIndex * dayHolderWidth

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
        justifyContent: 'center'
    },

    currentDayHolder: {
        height: 35, //half the size of scrollViewContainer's height
        width: 35,  //equal to height to form a square
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 35/2
    }
})