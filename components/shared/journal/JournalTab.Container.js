import { connect } from 'react-redux'
import { changeRouteAction } from '../actions/changeRouteAction'
import JournalTab from './JournalTab'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return ({
            routeName: state.currentRoute,
            tasks: state.day_tasks,
            categories: state.categories,
            priorities: state.priorities,
            completed_tasks: state.completed_day_tasks,
        })
    }

    else if (ownProps.type === "week"){
        return ({
            routeName: state.currentRoute,
            tasks: state.week_tasks,
            categories: state.categories,
            priorities: state.priorities,
            completed_tasks: state.completed_week_tasks,
        })
    }

    return ({
        routeName: state.currentRoute,
        tasks: state.month_tasks,
        categories: state.categories,
        priorities: state.priorities,
        completed_tasks: state.completed_month_tasks,
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName)),
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(JournalTab)