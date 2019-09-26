import { deleteCategory } from '../../shared/actions/categoryAction'
import { returnNewStats } from '../../shared/actions/statsAction'
import { returnNewChartStats } from '../../shared/actions/chartStatsAction'
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
        returnNewStats("RETURN_NEW_DAY_STATS", day_stats),
        returnNewStats("RETURN_NEW_WEEK_STATS", week_stats),
        returnNewStats("RETURN_NEW_MONTH_STATS", month_stats),
        returnNewChartStats("RETURN_NEW_WEEK_CHART_STATS", week_chart_stats),
        returnNewChartStats("RETURN_NEW_MONTH_CHART_STATS", month_chart_stats),
        returnNewChartStats("RETURN_NEW_YEAR_CHART_STATS", year_chart_stats)
    ]))
}