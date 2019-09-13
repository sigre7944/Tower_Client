import { updateChartStats } from '../../actions/chartStatsAction'
import { batchActions } from 'redux-batched-actions'
export const updateChartStatsThunk = ({
    week_action_type,
    week_timestamp,
    week_chart_stats_data,
    month_action_type,
    month_timestamp,
    month_chart_stats_data,
    year_action_type,
    year_timestamp,
    year_chart_stats_data
}) => (dispatch, getState) => {
    dispatch(batchActions([
        updateChartStats(week_action_type, week_timestamp, week_chart_stats_data),
        updateChartStats(month_action_type, month_timestamp, month_chart_stats_data),
        updateChartStats(year_action_type, year_timestamp, year_chart_stats_data)
    ]))
}