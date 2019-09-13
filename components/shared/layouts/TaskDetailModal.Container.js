import { connect } from 'react-redux'

import {
    editThunk,
    deleteTaskThunk,
} from './actions/taskDetailModalThunk'

import TaskDetailModal from './TaskDetailModal'


const mapStateToProps = (state, ownProps) => {
    let stats = {}

    if (ownProps.type === "day") {
        stats = state.day_stats
        
    }

    else if (ownProps.type === "week") {
        stats = state.week_stats
    }

    else{
        stats = state.month_stats
    }

    return (
        {
            categories: state.categories,
            priorities: state.priorities,
            stats,
            week_chart_stats: state.week_chart_stats,
            month_chart_stats: state.month_chart_stats,
            year_chart_stats: state.year_chart_stats,
        }
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    editThunk: (data) => dispatch(editThunk(ownProps.action_type, data)),
    deleteTaskThunk: (data) => dispatch(deleteTaskThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailModal)