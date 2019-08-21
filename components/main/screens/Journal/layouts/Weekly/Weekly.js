import React from 'react'

import JournalTab from '../../../../../shared/journal/JournalTab.Container'


export default class Weekly extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
    }


    render() {
        return (
            <JournalTab 
                type="week"
                action_type="ADD_EDIT_WEEK_TASK"
                {...this.props}
            />
        )
    }
}
