import { connect } from 'react-redux'

import { 
    deleteTaskAndHistoryThunk, 
    deleteTaskAndHistoryAtTimeThunk
} from './actions/deleteThunk'

import DeleteModal from './DeleteModal'

const mapStateToProps = (state, ownProps) => {
    let completed_tasks = {}

    if (ownProps.type === "day") {
        completed_tasks = state["completed_day_tasks"]
    }

    else if (ownProps.type === "week") {
        completed_tasks = state["completed_week_tasks"]
    }

    else {
        completed_tasks = state["completed_month_tasks"]
    }

    return (
        {
            categories: state["categories"],
            priorities: state["priorities"],
            completed_tasks,
            day_chart_stats: state["day_chart_stats"],
            week_chart_stats: state["week_chart_stats"],
            month_chart_stats: state["month_chart_stats"],
            year_chart_stats: state["year_chart_stats"],
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteTaskAndHistoryThunk: (data) => dispatch(deleteTaskAndHistoryThunk(data)),
    deleteTaskAndHistoryAtTimeThunk: (data) => dispatch(deleteTaskAndHistoryAtTimeThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteModal)