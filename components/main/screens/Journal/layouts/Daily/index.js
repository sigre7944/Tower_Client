import React from 'react'
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Button
} from 'react-native';


export default class Daily extends React.Component{
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    render(){
        return(
            <View>
                <Text>Daily</Text>
            </View>
        )
    }
}