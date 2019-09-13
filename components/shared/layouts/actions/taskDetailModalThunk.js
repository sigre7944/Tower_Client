import {
    updateTask,
    deleteTask
} from '../../actions/taskAction'
import { updateStats } from '../../actions/statsAction'
import { updateChartStats } from '../../actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
import { updateCategory } from '../../actions/categoryAction'

export const deleteTaskThunk = ({ completed_task_action_type, uncompleted_task_action_type, id }) => (dispatch, getState) => {
    dispatch(batchActions([
        deleteTask(completed_task_action_type, id),
        deleteTask(uncompleted_task_action_type, id)
    ]))
}

export const editThunk = (action_type, { edit_task, should_update_category, update_category_data, is_priority_changed, update_stats_data, update_chart_stats_data }) => (dispatch, getState) => {
    if (should_update_category && is_priority_changed) {
        dispatch(batchActions([
            updateTask(action_type, edit_task),
            updateCategory(update_category_data.old_category_key, update_category_data.old_category_data),
            updateCategory(update_category_data.new_category_key, update_category_data.new_category_data),
            updateStats(update_stats_data.stats_action_type, update_stats_data.stats_timestamp, update_stats_data.stats_data),
            updateChartStats(update_chart_stats_data.week_chart_stats_action_type, update_chart_stats_data.week_chart_timestamp, update_chart_stats_data.week_chart_stats_data),
            updateChartStats(update_chart_stats_data.month_chart_stats_action_type, update_chart_stats_data.month_chart_timestamp, update_chart_stats_data.month_chart_stats_data),
            updateChartStats(update_chart_stats_data.year_chart_stats_action_type, update_chart_stats_data.year_chart_timestamp, update_chart_stats_data.year_chart_stats_data),
        ]))
    }

    else if (should_update_category && !is_priority_changed) {
        dispatch(batchActions([
            updateTask(action_type, edit_task),
            updateCategory(update_category_data.old_category_key, update_category_data.old_category_data),
            updateCategory(update_category_data.new_category_key, update_category_data.new_category_data),
        ]))
    }

    else {
        dispatch(batchActions([
            updateTask(action_type, edit_task),
            updateStats(update_stats_data.stats_action_type, update_stats_data.stats_timestamp, update_stats_data.stats_data),
            updateChartStats(update_chart_stats_data.week_chart_stats_action_type, update_chart_stats_data.week_chart_timestamp, update_chart_stats_data.week_chart_stats_data),
            updateChartStats(update_chart_stats_data.month_chart_stats_action_type, update_chart_stats_data.month_chart_timestamp, update_chart_stats_data.month_chart_stats_data),
            updateChartStats(update_chart_stats_data.year_chart_stats_action_type, update_chart_stats_data.year_chart_timestamp, update_chart_stats_data.year_chart_stats_data),
        ]))
    }
}