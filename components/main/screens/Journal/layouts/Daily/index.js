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


export default class Daily extends React.Component{
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    state = {

    }

    componentDidMount(){
        let today = new Date().getDate(),
            month = new Date().getMonth(),
            year = new Date().getFullYear()
        console.log(today)
        console.log(this.getDaysInMonth(month, year))
    }

    getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate()
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <Text>Test ScrollView</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})