import { connect } from 'react-redux'
import { changeRouteAction } from '../../../../../../shared/actions/otherAction'
import JournalTab from './JournalTab'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return ({
            routeName: state.get("currentRoute"),
            tasks: state.get("day_tasks"),
            categories: state.get("categories"),
            priorities: state.get("priorities"),
            completed_tasks: state.get("completed_day_tasks"),
            current_chosen_category: state.get("currentChosenCategory"),
            deleted_tasks: state.get("deleted_day_tasks")
        })
    }

    else if (ownProps.type === "week") {
        return ({
            routeName: state.get("currentRoute"),
            tasks: state.get("week_tasks"),
            categories: state.get("categories"),
            priorities: state.get("priorities"),
            completed_tasks: state.get("completed_week_tasks"),
            current_chosen_category: state.get("currentChosenCategory"),
            deleted_tasks: state.get("deleted_week_tasks")
        })
    }

    return ({
        routeName: state.get("currentRoute"),
        tasks: state.get("month_tasks"),
        categories: state.get("categories"),
        priorities: state.get("priorities"),
        completed_tasks: state.get("completed_month_tasks"),
        current_chosen_category: state.get("currentChosenCategory"),
        deleted_tasks: state.get("deleted_month_tasks")
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JournalTab)