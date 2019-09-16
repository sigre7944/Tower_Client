import { deleteCategory } from '../../shared/actions/categoryAction'
import { updateTaskDeletionsInStats } from '../../shared/actions/statsAction'
import { updateTaskDeletionsInChartStats } from '../../shared/actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { deleteAllTasksInCategory } from '../../shared/actions/taskAction'

export const deleteAndAffectThePast = ({ category_id, day_stats, week_stats, month_stats, week_chart_stats, month_chart_stats, year_chart_stats }) => (dispatch, getState) => {
    dispatch(batchActions([
        deleteAllTasksInCategory("DELETE_ALL_DAY_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_WEEK_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_MONTH_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_COMPLETED_DAY_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_COMPLETED_WEEK_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_COMPLETED_MONTH_TASKS_WITH_CATEGORY", category_id),
        deleteCategory(category_id),
        updateTaskDeletionsInStats("DELETE_ALL_DAY_TASKS_IN_CATEGORY", day_stats),
        updateTaskDeletionsInStats("DELETE_ALL_WEEK_TASKS_IN_CATEGORY", week_stats),
        updateTaskDeletionsInStats("DELETE_ALL_MONTH_TASKS_IN_CATEGORY", month_stats),
        updateTaskDeletionsInChartStats("DELETE_CATEGORY_AFFECTS_WEEK_CHART", week_chart_stats),
        updateTaskDeletionsInChartStats("DELETE_CATEGORY_AFFECTS_MONTH_CHART", month_chart_stats),
        updateTaskDeletionsInChartStats("DELETE_CATEGORY_AFFECTS_YEAR_CHART", year_chart_stats)
    ]))
}