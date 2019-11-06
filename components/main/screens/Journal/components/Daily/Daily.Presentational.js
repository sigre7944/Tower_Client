import React from 'react'

import JournalTab from '../../../../../shared/journal/JournalTab.Container'

export default class Daily extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.routeName !== prevProps.routeName){
        //     console.log(this.props.routeName)
        // }

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
