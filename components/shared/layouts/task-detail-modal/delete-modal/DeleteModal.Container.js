import { connect } from 'react-redux'

import { 
    deleteTaskAndHistoryThunk, 
    deleteOnlyTaskThunk,
    deleteTaskAndHistoryAtTimeThunk
} from './actions/deleteThunk'

import DeleteModal from './DeleteModal'

const mapStateToProps = (state, ownProps) => {
    let completed_tasks = {}

    if (ownProps.type === "day") {
        completed_tasks = state.get("completed_day_tasks")
    }

    else if (ownProps.type === "week") {
        completed_tasks = state.get("completed_week_tasks")
    }

    else {
        completed_tasks = state.get("completed_month_tasks")
    }

    return (
        {
            categories: state.get("categories"),
            priorities: state.get("priorities"),
            completed_tasks,
            day_chart_stats: state.get("day_chart_stats"),
            week_chart_stats: state.get("week_chart_stats"),
            month_chart_stats: state.get("month_chart_stats"),
            year_chart_stats: state.get("year_chart_stats"),
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteTaskAndHistoryThunk: (data) => dispatch(deleteTaskAndHistoryThunk(data)),
    deleteOnlyTaskThunk: (data) => dispatch(deleteOnlyTaskThunk(data)),
    deleteTaskAndHistoryAtTimeThunk: (data) => dispatch(deleteTaskAndHistoryAtTimeThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteModal)