import { connect } from 'react-redux'
import { updateTask } from '../actions/taskAction'
import { updateStats } from '../actions/statsAction'
import TaskCard from './TaskCard'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return (
            {
                completed_tasks: state.completed_day_tasks,
                stats: state.day_stats,
            }
        )
    }

    else if (ownProps.type === "week") {
        return (
            {
                completed_tasks: state.completed_week_tasks,
                stats: state.week_stats,
            }
        )
    }


    return (
        {
            completed_tasks: state.completed_month_tasks,
            stats: state.month_stats,
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCompletedTask: (data) => dispatch(updateTask(ownProps.action_type, data)),
    updateStats: (type, timestamp, data) => dispatch(updateStats(type, timestamp, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskCard)