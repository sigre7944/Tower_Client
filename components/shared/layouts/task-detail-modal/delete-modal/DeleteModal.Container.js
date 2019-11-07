import { connect } from 'react-redux'

import { deleteTaskAndHistoryThunk, deleteOnlyTaskThunk } from './actions/deleteThunk'

import DeleteModal from './DeleteModal'

const mapStateToProps = (state, ownProps) => {
    let stats = {},
        completed_tasks = {}

    if (ownProps.type === "day") {
        stats = state.get("day_stats")
        completed_tasks = state.get("completed_day_tasks")
    }

    else if (ownProps.type === "week") {
        stats = state.get("week_stats")
        completed_tasks = state.get("completed_week_tasks")
    }

    else {
        stats = state.get("month_stats")
        completed_tasks = state.get("completed_month_tasks")
    }

    return (
        {
            categories: state.get("categories"),
            priorities: state.get("priorities"),
            stats,
            completed_tasks,
            week_chart_stats: state.get("week_chart_stats"),
            month_chart_stats: state.get("month_chart_stats"),
            year_chart_stats: state.get("year_chart_stats"),
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteTaskAndHistoryThunk: (data) => dispatch(deleteTaskAndHistoryThunk(data)),
    deleteOnlyTaskThunk: (data) => dispatch(deleteOnlyTaskThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteModal)