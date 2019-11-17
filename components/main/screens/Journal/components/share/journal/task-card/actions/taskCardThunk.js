import { updateChartStats } from '../../../../../../../../shared/actions/chartStatsAction'
import { updateTask } from '../../../../../../../../shared/actions/taskAction'
import { batchActions } from 'redux-batched-actions'

export const updateBulkThunk = ({ completed_task_data, chart_data }) => (dispatch, getState) => {
    dispatch(batchActions([
        updateTask(completed_task_data.type, completed_task_data.keyPath, completed_task_data.notSetValue, completed_task_data.updater),

        updateChartStats(chart_data.day_action_type, chart_data.day_chart_keyPath, chart_data.day_chart_notSetValue, chart_data.day_chart_updater),

        updateChartStats(chart_data.week_action_type, chart_data.week_chart_keyPath, chart_data.week_chart_notSetValue, chart_data.week_chart_updater),

        updateChartStats(chart_data.month_action_type, chart_data.month_chart_keyPath, chart_data.month_chart_notSetValue, chart_data.month_chart_updater),

        updateChartStats(chart_data.year_action_type, chart_data.year_chart_keyPath, chart_data.year_chart_notSetValue, chart_data.year_chart_updater),
    ]))
}
