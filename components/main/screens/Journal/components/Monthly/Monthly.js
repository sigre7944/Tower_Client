import React from 'react'

import JournalTab from '../share/journal/JournalTab.Container'

export default class Weekly extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
    }


    render() {
        return (
            <JournalTab 
                type="month"
                action_type="ADD_EDIT_MONTH_TASK"
                {...this.props}
            />
        )
    }
}
