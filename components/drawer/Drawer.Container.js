import { connect } from 'react-redux'
import {
    chooseCategory,
    deleteCategory
} from '../shared/actions/categoryAction'

import { deleteAndAffectThePast } from './actions/deleteActionThunk'

import { deleteAllTasksInCategory } from '../shared/actions/taskAction'

import Drawer from './DrawerVer2'

const mapStateToProps = (state, ownProps) => {
    return ({
        categories: state.categories,
        priorities: state.priorities,

        day_tasks: state.day_tasks,
        week_tasks: state.week_tasks,
        month_tasks: state.month_tasks,

        completed_day_tasks: state.completed_day_tasks,
        completed_week_tasks: state.completed_week_tasks,
        completed_month_tasks: state.completed_month_tasks,

        day_stats: state.day_stats,
        month_stats: state.month_stats,
        week_stats: state.week_stats,

        month_chart_stats: state.month_chart_stats,
        week_chart_stats: state.week_chart_stats,
        year_chart_stats: state.year_chart_stats
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    chooseCategory: (category) => dispatch(chooseCategory(category)),
    deleteCategory: (category_id) => dispatch(deleteCategory(category_id)),
    deleteAllTasksInCategory: (type, category_id) => dispatch(deleteAllTasksInCategory(type, category_id)),

    deleteAndAffectThePast: (data) => dispatch(deleteAndAffectThePast(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)