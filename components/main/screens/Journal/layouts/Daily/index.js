import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
    Button,
    ScrollView
} from 'react-native';

let scrollViewRef

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
            dailyTimeView: days_arr.map((obj, index) => (
                <View style={styles.dayHolder} key={obj + " " + index}>
                    <Text>{obj.dayWord}</Text>
                    <Text>{obj.dayNumb}</Text>
                </View>
            ))
        })

        this.focusScrollViewToToday(scrollViewRef, days_arr, today)

        console.log("mounted")


    }

    focusScrollViewToToday = (scrollViewRef, days_arr, today) => {
        let todayIndex = days_arr.findIndex(obj => obj.dayNumb === today),
            x_off_set = todayIndex * 60

        if(todayIndex >= (days_arr.length -7)){
            todayIndex = days_arr.length -7
            scrollViewRef.scrollTo({
                y: 0,
                x: todayIndex * 60
            })
        }

        else{
            scrollViewRef.scrollTo({
                y: 0,
                x: x_off_set
            })
        }
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
    }

    componentWillUnmount(){
        console.log("unmount")
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollViewContainer} horizontal={true} ref={view => scrollViewRef = view}>
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
        width: 60,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})