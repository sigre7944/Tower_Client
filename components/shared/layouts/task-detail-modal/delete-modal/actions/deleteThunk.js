import {
    updateTask,
    deleteTask,
    returnNewCompletedTask
} from '../../../../actions/taskAction'
import { updateChartStats, returnNewChartStats } from '../../../../actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { updateCategory } from '../../../../actions/categoryAction'
import { updatePriority } from '../../../../actions/priorityAction'

export const deleteTaskAndHistoryThunk = ({
    delete_task_data,
    update_category_data,
    update_priority_data,
    delete_completed_task_data,
    return_new_day_chart_stats_data,
    return_new_week_chart_stats_data,
    return_new_month_chart_stats_data,
    return_new_year_chart_stats_data,
}) => (dispatch, getState) => {
    
    let action_array = [
        deleteTask(delete_task_data.type, delete_task_data.id),

        updateCategory(update_category_data.keyPath, update_category_data.notSetValue, update_category_data.updater),

        updatePriority(update_priority_data.keyPath, update_priority_data.notSetValue, update_priority_data.updater),

        deleteTask(delete_completed_task_data.type, delete_completed_task_data.id),

        returnNewChartStats(return_new_day_chart_stats_data.type, return_new_day_chart_stats_data.data),

        returnNewChartStats(return_new_week_chart_stats_data.type, return_new_week_chart_stats_data.data),

        returnNewChartStats(return_new_month_chart_stats_data.type, return_new_month_chart_stats_data.data),

        returnNewChartStats(return_new_year_chart_stats_data.type, return_new_year_chart_stats_data.data)
    ]

    dispatch(batchActions(action_array))
}

export const deleteOnlyTaskThunk = ({
    delete_task_data,
    update_category_data,
    update_priority_data,
    delete_completed_task_data
}) => (dispatch, getState) => {

    let action_array = [
        deleteTask(delete_task_data.type, delete_task_data.id),

        updateCategory(update_category_data.keyPath, update_category_data.notSetValue, update_category_data.updater),

        updatePriority(update_priority_data.keyPath, update_priority_data.notSetValue, update_priority_data.updater),

        deleteTask(delete_completed_task_data.type, delete_completed_task_data.id),
    ]

    dispatch(batchActions(action_array))
}