import {
    updateTask,
    deleteTask,
    deleteKeyPathTask,
    returnNewCompletedTask,
    returnNewTasks
} from '../../../../shared/actions/taskAction'
import { updateChartStats, returnNewChartStats } from '../../../../shared/actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { updateCategory } from '../../../../shared/actions/categoryAction'
import { updatePriority, returnNewPriorities } from '../../../../shared/actions/priorityAction'

export const deleteTasksAndHistories = ({
    new_tasks_data,
    new_completed_tasks_data,
    update_category_data,
    new_priority_data,
    delete_completed_task_data,
    return_new_day_chart_stats_data,
    return_new_week_chart_stats_data,
    return_new_month_chart_stats_data,
    return_new_year_chart_stats_data,
    deleted_task_data,
}) => (dispatch, getState) => {

    let action_array = [
        // Update new day/week/month tasks with deletions of chosen tasks
        returnNewTasks(new_tasks_data.type, new_tasks_data.data),

        // update new day/week/month completed tasks with deletions of chosen tasks
        returnNewCompletedTask(new_completed_tasks_data.type, new_completed_tasks_data.data),

        //Update quantity in corresponding category
        updateCategory(update_category_data.keyPath, update_category_data.notSetValue, update_category_data.updater),

        // Update new priorities with deletions of chosen task ids
        returnNewPriorities(new_priority_data.data),

        //Delete the records of deleted task in day/week/month_completed_tasks
        deleteTask(delete_completed_task_data.type, delete_completed_task_data.id),

        //Update new records after mitigating the deleted task's records
        returnNewChartStats(return_new_day_chart_stats_data.type, return_new_day_chart_stats_data.data),

        //Update new records after mitigating the deleted task's records
        returnNewChartStats(return_new_week_chart_stats_data.type, return_new_week_chart_stats_data.data),

        //Update new records after mitigating the deleted task's records
        returnNewChartStats(return_new_month_chart_stats_data.type, return_new_month_chart_stats_data.data),

        //Update new records after mitigating the deleted task's records
        returnNewChartStats(return_new_year_chart_stats_data.type, return_new_year_chart_stats_data.data),

        //Delete deleted records of task in deleted_day/week/month_tasks
        deleteKeyPathTask(deleted_task_data.type, deleted_task_data.keyPath)
    ]

    dispatch(batchActions(action_array))
}

// Delete only record of the task at the time
export const deleteTaskAndHistoryAtTimeThunk = ({
    delete_timestamp_completed_task_data,
    deleted_task_data,
    delete_timestamp_day_chart_stats_data,
    delete_timestamp_week_chart_stats_data,
    delete_timestamp_month_chart_stats_data,
    delete_timestamp_year_chart_stats_data,
}) => (dispatch, getState) => {

    let action_array = [
        // Delete the timestamp record in completed_day/week/month_tasks
        deleteKeyPathTask(
            delete_timestamp_completed_task_data.type,
            delete_timestamp_completed_task_data.keyPath,
        ),

        // Update deleted timestamp, task info in deleted_day/week/month_tasks
        updateTask(deleted_task_data.type, deleted_task_data.keyPath, deleted_task_data.notSetValue, deleted_task_data.updater),
    ]

    if (delete_timestamp_day_chart_stats_data.action_bool) {
        action_array.push(
            // Update deleted timestamp's task records in day/week/month/year_chart_stats
            returnNewChartStats(
                delete_timestamp_day_chart_stats_data.type,
                delete_timestamp_day_chart_stats_data.data
            ),
        )
    }

    if (delete_timestamp_week_chart_stats_data.action_bool) {
        action_array.push(
            returnNewChartStats(
                delete_timestamp_week_chart_stats_data.type,
                delete_timestamp_week_chart_stats_data.data,
            ),
        )
    }

    if (delete_timestamp_month_chart_stats_data.action_bool) {
        action_array.push(
            returnNewChartStats(
                delete_timestamp_month_chart_stats_data.type,
                delete_timestamp_month_chart_stats_data.data,
            ),
        )
    }

    if (delete_timestamp_year_chart_stats_data.action_bool) {
        action_array.push(
            returnNewChartStats(
                delete_timestamp_year_chart_stats_data.type,
                delete_timestamp_year_chart_stats_data.data,
            ),
        )
    }

    dispatch(batchActions(action_array))
}