import React from 'react'
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Button
} from 'react-native';


export default class Weekly extends React.Component{
    static navigationOptions = {
        swipeEnabled: false
    }

    
    render(){
        return(
            <View>
                <Text>Weekly</Text>
            </View>
        )
    }
}