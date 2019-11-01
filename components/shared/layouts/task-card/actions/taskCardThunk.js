import { updateChartStats } from '../../../actions/chartStatsAction'
import { updateTask } from '../../../actions/taskAction'
import { updateStats } from '../../../actions/statsAction'
import { batchActions } from 'redux-batched-actions'

export const updateBulkThunk = ({ completed_task_data, stats_data, chart_data }) => (dispatch, getState) => {
    dispatch(batchActions([
        updateTask(completed_task_data.action_type, completed_task_data.data),
        updateStats(stats_data.stats_action_type, stats_data.stats_timestamp, stats_data.stats_data),
        updateChartStats(chart_data.week_action_type, chart_data.week_timestamp, chart_data.week_chart_stats_data),
        updateChartStats(chart_data.month_action_type, chart_data.month_timestamp, chart_data.month_chart_stats_data),
        updateChartStats(chart_data.year_action_type, chart_data.year_timestamp, chart_data.year_chart_stats_data)
    ]))
}
