import {
    updateTask,
    deleteTask
} from '../../actions/taskAction'
import { updateStats } from '../../actions/statsAction'
import { updateChartStats } from '../../actions/chartStatsAction'
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

export const editThunk = (action_type, { edit_task, should_update_category, update_category_data, should_update_stats, update_stats_data, should_update_chart_stats, update_chart_stats_data }) => (dispatch, getState) => {

    let action_array = [
        updateTask(action_type, edit_task)
    ]

    if (should_update_category === true) {
        action_array = [...action_array, ...[
            updateCategory(update_category_data.old_category_key, update_category_data.old_category_data),
            updateCategory(update_category_data.new_category_key, update_category_data.new_category_data),
        ]]
    }

    if (should_update_stats === true) {
        action_array = [...action_array, ...[
            updateStats(update_stats_data.stats_action_type, update_stats_data.stats_timestamp, update_stats_data.stats_data)
        ]]
    }

    if (should_update_chart_stats.week === true) {
        action_array = [...action_array, ...[
            updateChartStats(update_chart_stats_data.week_chart_stats_action_type, update_chart_stats_data.week_chart_timestamp, update_chart_stats_data.week_chart_stats_data)
        ]]
    }

    if (should_update_chart_stats.month === true) {
        action_array = [...action_array, ...[
            updateChartStats(update_chart_stats_data.month_chart_stats_action_type, update_chart_stats_data.month_chart_timestamp, update_chart_stats_data.month_chart_stats_data)
        ]]
    }

    if (should_update_chart_stats.year === true) {
        action_array = [...action_array, ...[
            updateChartStats(update_chart_stats_data.year_chart_stats_action_type, update_chart_stats_data.year_chart_timestamp, update_chart_stats_data.year_chart_stats_data)
        ]]
    }

    dispatch(batchActions(action_array))
}