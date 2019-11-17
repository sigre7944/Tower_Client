import React from 'react'

import JournalTab from '../share/journal/JournalTab.Container'

export default class Daily extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    render() {
        return (
            <>  
                {/* Should implement conditional render to limit re-renderings */}
                <JournalTab
                    type="day"
                    action_type="ADD_EDIT_DAY_TASK"
                    {... this.props}
                />
            </>
        )
    }
}
