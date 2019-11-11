import { connect } from 'react-redux'
import { chooseCategory } from '../shared/actions/categoryAction'
import { deleteTasksAndHistory, deleteOnlyTasks } from './actions/deleteActionThunk'
import Drawer from './Drawer'

const mapStateToProps = (state, ownProps) => {
    return ({
        categories: state.get("categories"),
        priorities: state.get("priorities"),

        day_tasks: state.get("day_tasks"),
        week_tasks: state.get("week_tasks"),
        month_tasks: state.get("month_tasks"),

        completed_day_tasks: state.get("completed_day_tasks"),
        completed_week_tasks: state.get("completed_week_tasks"),
        completed_month_tasks: state.get("completed_month_tasks"),

        day_chart_stats: state.get("day_chart_stats"),
        month_chart_stats: state.get("month_chart_stats"),
        week_chart_stats: state.get("week_chart_stats"),
        year_chart_stats: state.get("year_chart_stats"),

        current_chosen_category: state.get("currentChosenCategory"),
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    chooseCategory: (category) => dispatch(chooseCategory(category)),
    deleteTasksAndHistory: (data) => dispatch(deleteTasksAndHistory(data)),
    deleteOnlyTasks: (data) => dispatch(deleteOnlyTasks(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)