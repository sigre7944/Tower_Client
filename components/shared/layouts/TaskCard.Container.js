import { connect } from 'react-redux'
import { updateTask } from '../actions/taskAction'
import { updateStats } from '../actions/statsAction'
import { updateChartStatsThunk } from './actions/taskCardThunk'

import TaskCard from './TaskCard'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return (
            {
                completed_tasks: state.get("completed_day_tasks"),
                stats: state.get("day_stats"),
                week_chart_stats: state.get("week_chart_stats"),
                month_chart_stats: state.get("month_chart_stats"),
                year_chart_stats: state.get("year_chart_stats")
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
                year_chart_stats: state.get("year_chart_stats")
            }
        )
    }


    return (
        {
            completed_tasks: state.get("completed_month_tasks"),
            stats: state.get("month_stats"),
            week_chart_stats: state.get("week_chart_stats"),
            month_chart_stats: state.get("month_chart_stats"),
            year_chart_stats: state.get("year_chart_stats")
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCompletedTask: (data) => dispatch(updateTask(ownProps.action_type, data)),
    updateStats: (type, timestamp, data) => dispatch(updateStats(type, timestamp, data)),

    updateChartStatsThunk: (data) => dispatch(updateChartStatsThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskCard)