import { connect } from 'react-redux'

import TaskDetailEditModal from './TaskDetailEditModal'

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
    editThunk: (data) => dispatch(editThunk(ownProps.action_type, data)),
    deleteTaskThunk: (data) => dispatch(deleteTaskThunk(data))
})

export default connect(
    mapStateToProps,
    null
)(TaskDetailEditModal)