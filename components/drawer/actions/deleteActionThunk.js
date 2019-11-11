import { deleteCategory } from '../../shared/actions/categoryAction'
import { returnNewChartStats } from '../../shared/actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { deleteAllTasksInCategory } from '../../shared/actions/taskAction'
import { returnNewPriorities } from '../../shared/actions/priorityAction'

export const deleteTasksAndHistory = ({
    category_id,
    new_priorities,
    new_day_chart_stats,
    new_week_chart_stats,
    new_month_chart_stats,
    new_year_chart_stats
}) => (dispatch, getState) => {
    dispatch(batchActions([
        deleteCategory(category_id),
        returnNewPriorities(new_priorities),

        deleteAllTasksInCategory("DELETE_ALL_DAY_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_WEEK_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_MONTH_TASKS_WITH_CATEGORY", category_id),

        deleteAllTasksInCategory("DELETE_ALL_COMPLETED_DAY_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_COMPLETED_WEEK_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_COMPLETED_MONTH_TASKS_WITH_CATEGORY", category_id),

        returnNewChartStats("RETURN_NEW_DAY_CHART_STATS", new_day_chart_stats),
        returnNewChartStats("RETURN_NEW_WEEK_CHART_STATS", new_week_chart_stats),
        returnNewChartStats("RETURN_NEW_MONTH_CHART_STATS", new_month_chart_stats),
        returnNewChartStats("RETURN_NEW_YEAR_CHART_STATS", new_year_chart_stats)
    ]))
}

export const deleteOnlyTasks = ({
    category_id,
    new_priorities,
}) => (dispatch, getState) => {
    dispatch(batchActions([
        deleteCategory(category_id),
        returnNewPriorities(new_priorities),

        deleteAllTasksInCategory("DELETE_ALL_DAY_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_WEEK_TASKS_WITH_CATEGORY", category_id),
        deleteAllTasksInCategory("DELETE_ALL_MONTH_TASKS_WITH_CATEGORY", category_id),
    ]))
}