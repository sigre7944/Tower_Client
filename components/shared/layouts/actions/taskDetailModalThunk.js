import {
    updateTask,
    deleteTask,
    returnNewCompletedTask
} from '../../actions/taskAction'
import { updateStats, returnNewStats } from '../../actions/statsAction'
import { updateChartStats, returnNewChartStats } from '../../actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { updateCategory } from '../../actions/categoryAction'

export const deleteTaskThunk = ({ completed_task_action_type,
    uncompleted_task_action_type, id,
    should_update_stats,
    update_stats_data,
    should_update_chart_stats,
    update_chart_stats_data,
    category_obj
}) => (dispatch, getState) => {

    let action_array = [
        deleteTask(completed_task_action_type, id),
        deleteTask(uncompleted_task_action_type, id),
        updateCategory(category_obj.id, category_obj.data)
    ]

    if (should_update_stats === true) {
        action_array.push(updateStats(update_stats_data.stats_action_type, update_stats_data.stats_timestamp, update_stats_data.stats_data))
    }

    if (should_update_chart_stats.week === true) {
        action_array.push(updateChartStats(update_chart_stats_data.week_chart_stats_action_type, update_chart_stats_data.week_chart_timestamp, update_chart_stats_data.week_chart_stats_data))
    }

    if (should_update_chart_stats.month === true) {
        action_array.push(updateChartStats(update_chart_stats_data.month_chart_stats_action_type, update_chart_stats_data.month_chart_timestamp, update_chart_stats_data.month_chart_stats_data))
    }

    if (should_update_chart_stats.year === true) {
        action_array.push(updateChartStats(update_chart_stats_data.year_chart_stats_action_type, update_chart_stats_data.year_chart_timestamp, update_chart_stats_data.year_chart_stats_data))
    }

    dispatch(batchActions(action_array))
}

export const editThunk = (action_type, {
    edit_task,
    should_update_category,
    update_category_data,
    should_update_from_now,
    stats_data = {},
    week_chart_stats_data,
    month_chart_stats_data,
    year_chart_stats_data,
    completed_tasks_data
}) => (dispatch, getState) => {

    let action_array = [
        updateTask(action_type, edit_task)
    ]

    if (should_update_category === true) {
        action_array = [...action_array, ...[
            updateCategory(update_category_data.old_category_key, update_category_data.old_category_data),
            updateCategory(update_category_data.new_category_key, update_category_data.new_category_data),
        ]]
    }

    if (stats_data.hasOwnProperty("action_type") && stats_data["action_type"] !== "" && stats_data["action_type"].length > 0) {
        if (should_update_from_now === true) {
            action_array = [...action_array, ...[
                updateStats(stats_data.action_type, stats_data.timestamp, stats_data.data),
                updateChartStats("UPDATE_WEEK_CHART_STATS", week_chart_stats_data.timestamp, week_chart_stats_data.data),
                updateChartStats("UPDATE_MONTH_CHART_STATS", month_chart_stats_data.timestamp, month_chart_stats_data.data),
                updateChartStats("UPDATE_YEAR_CHART_STATS", year_chart_stats_data.timestamp, year_chart_stats_data.data),
                updateTask(completed_tasks_data.action_type, completed_tasks_data.data)
            ]]
        }

        else {
            action_array = [...action_array, ...[
                returnNewStats(stats_data.action_type, stats_data.data),
                returnNewChartStats("RETURN_NEW_WEEK_CHART_STATS", week_chart_stats_data.data),
                returnNewChartStats("RETURN_NEW_MONTH_CHART_STATS", month_chart_stats_data.data),
                returnNewChartStats("RETURN_NEW_YEAR_CHART_STATS", year_chart_stats_data.data),
                returnNewCompletedTask(completed_tasks_data.action_type, completed_tasks_data.data)
            ]]
        }
    }

    dispatch(batchActions(action_array))
}
