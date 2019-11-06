import { connect } from 'react-redux'
import { updateBulkThunk } from './actions/taskCardThunk'

import TaskCard from './TaskCard'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return (
            {
                completed_tasks: state.get("completed_day_tasks"),
                stats: state.get("day_stats"),
                week_chart_stats: state.get("week_chart_stats"),
                month_chart_stats: state.get("month_chart_stats"),
                year_chart_stats: state.get("year_chart_stats"),
                priorities: state.get("priorities"),
                categories: state.get("categories")
            }
        )
    }

    else if (ownProps.type === "week") {
        return (
            {
                completed_tasks: state.get("completed_week_tasks"),
                stats: state.get("week_stats"),
                week_chart_stats: state.get("week_chart_stats"),
                month_chart_stats: state.get("month_chart_stats"),
                year_chart_stats: state.get("year_chart_stats"),
                priorities: state.get("priorities"),
                categories: state.get("categories")
            }
        )
    }


    return (
        {
            completed_tasks: state.get("completed_month_tasks"),
            stats: state.get("month_stats"),
            week_chart_stats: state.get("week_chart_stats"),
            month_chart_stats: state.get("month_chart_stats"),
            year_chart_stats: state.get("year_chart_stats"),
            priorities: state.get("priorities"),
            categories: state.get("categories")
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateBulkThunk: (data) => dispatch(updateBulkThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskCard)