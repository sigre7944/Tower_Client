import React from 'react';

import AddAllTodo from './containers/AddAllTodo.Container'

class Journal extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Journal'
    }

    render(){
        return(
            <AddAllTodo />
        )
    }
}


export default Journal;