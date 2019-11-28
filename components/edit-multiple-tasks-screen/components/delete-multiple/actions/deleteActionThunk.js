import {
    updateTask,
    deleteTask,
    deleteKeyPathTask,
    returnNewCompletedTask,
    returnNewTasks
} from '../../../../shared/actions/taskAction'
import { updateChartStats, returnNewChartStats } from '../../../../shared/actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { returnNewCategories } from '../../../../shared/actions/categoryAction'
import { updatePriority, returnNewPriorities } from '../../../../shared/actions/priorityAction'

export const deleteAction = ({
    new_tasks,
    new_completed_tasks_map,
    new_categories,
    new_priorities,
    new_deleted_tasks,
    new_day_chart_stats_map,
    new_week_chart_stats_map,
    new_month_chart_stats_map,
    new_year_chart_stats_map,
}) => (dispatch, getState) => {

    let action_array = [
        // Update new day/week/month tasks with deletions of chosen tasks
        returnNewTasks(new_tasks.type, new_tasks.data),

        // update new day/week/month completed tasks with deletions of chosen tasks
        returnNewTasks(new_completed_tasks_map.type, new_completed_tasks_map.data),

        //Update quantity in corresponding category
        returnNewCategories(new_categories),

        // Update new priorities with deletions of chosen task ids
        returnNewPriorities(new_priorities),

        //Update new records after mitigating the deleted task's records
        returnNewTasks("RETURN_NEW_DAY_CHART_STATS", new_day_chart_stats_map),

        //Update new records after mitigating the deleted task's records
        returnNewTasks("RETURN_NEW_WEEK_CHART_STATS", new_week_chart_stats_map),

        //Update new records after mitigating the deleted task's records
        returnNewTasks("RETURN_NEW_MONTH_CHART_STATS", new_month_chart_stats_map),

        //Update new records after mitigating the deleted task's records
        returnNewTasks("RETURN_NEW_YEAR_CHART_STATS", new_year_chart_stats_map),

        // Update new day/week/month deleted tasks with deletions of chosen tasks
        returnNewTasks(new_deleted_tasks.type, new_deleted_tasks.data)
    ]

    dispatch(batchActions(action_array))
}

// Delete only records of the tasks at the time
export const deleteRecords = ({
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