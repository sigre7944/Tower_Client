import { connect } from 'react-redux'
import { deleteAction } from "./actions/deleteActionThunk";
import DeleteMultiple from './DeleteMultiple'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.type === "day") {
        return ({
            tasks: state["day_tasks"],
            completed_tasks: state["completed_day_tasks"],
            deleted_tasks: state["deleted_day_tasks"],
            categories: state["categories"],
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
            deleted_tasks: state["deleted_week_tasks"],
            categories: state["categories"],
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
        deleted_tasks: state["deleted_month_tasks"],
        categories: state["categories"],
        priorities: state["priorities"],
        day_chart_stats: state["day_chart_stats"],
        month_chart_stats: state["month_chart_stats"],
        week_chart_stats: state["week_chart_stats"],
        year_chart_stats: state["year_chart_stats"],
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteAction: (data) => dispatch(deleteAction(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteMultiple)