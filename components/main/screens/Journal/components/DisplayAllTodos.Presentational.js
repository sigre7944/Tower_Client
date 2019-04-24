import React from 'react'
import {
    LayoutAnimation,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';

export default class DisplayAllTodos extends React.Component{
    
    render(){
        let todoNodes = this.props.allTodos.map(todo => {
            return(
                <View>
                    <Text>{todo.title}</Text>
                </View>
            )
        })

        return(
            <>
            {todoNodes}
            </>
        )
    }
}

const styles = StyleSheet.create({

})