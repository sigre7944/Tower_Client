import React from 'react'

export default class AddAllTodo extends React.Component{


    AddTodoToAll = () => {
        this.props.addTodoToAll()
    }

    render(){
        return(
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                />
                
                <Button title="Add" onPress={this.AddTodoToAll}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        borderWidth: 2,
        width: 100,
        height: 30
    }
})