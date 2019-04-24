import React from 'react';
import AddAllTodo from './containers/AddAllTodo.Container'
import DisplayAllTodos from './containers/DisplayAllTodos.Container'

class Journal extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Journal'
    }

    render(){
        return(
            <>
                <AddAllTodo />
                <DisplayAllTodos />
            </>
        )
    }
}


export default Journal;