import { connect } from 'react-redux'
import { deleteTasksAndHistories } from "./actions/deleteActionThunk";
import DeleteMultiple from './DeleteMultiple'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return ({
            tasks: state["day_tasks"],
            completed_tasks: state["completed_day_tasks"],
            priorities: state["priorities"],
            day_chart_stats: state["day_chart_stats"],
            month_chart_stats: state["month_chart_stats"],
            week_chart_stats: state["week_chart_stats"],
            year_chart_stats: state["year_chart_stats"],
        })
    }

    else if (ownProps.type === "week") {
        return ({
            tasks: state["week_tasks"],
            completed_tasks: state["completed_week_tasks"],
            priorities: state["priorities"],
            day_chart_stats: state["day_chart_stats"],
            month_chart_stats: state["month_chart_stats"],
            week_chart_stats: state["week_chart_stats"],
            year_chart_stats: state["year_chart_stats"],
        })
    }

    return ({
        tasks: state["month_tasks"],
        completed_tasks: state["completed_month_tasks"],
        priorities: state["priorities"],
        day_chart_stats: state["day_chart_stats"],
        month_chart_stats: state["month_chart_stats"],
        week_chart_stats: state["week_chart_stats"],
        year_chart_stats: state["year_chart_stats"],
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteMultiple)