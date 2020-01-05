import { updateChartStats } from "../../../../../../../../shared/actions/chartStatsAction";
import { updateTask } from "../../../../../../../../shared/actions/taskAction";
import { updateBalance } from "../../../../../../../../shared/actions/rewardAction";
import { batchActions } from "redux-batched-actions";

export const updateBulkThunk = ({
  completed_task_data,
  chart_data,
  balance_data
}) => (dispatch, getState) => {
  let action_array = [
    // To update id
    updateTask(
      completed_task_data.type,
      completed_task_data.update_id.keyPath,
      completed_task_data.update_id.notSetValue,
      completed_task_data.update_id.updater
    ),

    // To update category
    updateTask(
      completed_task_data.type,
      completed_task_data.update_category.keyPath,
      completed_task_data.update_category.notSetValue,
      completed_task_data.update_category.updater
    ),

    // To update timestamp data
    updateTask(
      completed_task_data.type,
      completed_task_data.update_timestamp_data.keyPath,
      completed_task_data.update_timestamp_data.notSetValue,
      completed_task_data.update_timestamp_data.updater
    ),

    updateBalance(balance_data.type, balance_data.amount)
  ];

  // Update day chart stats if type is day
  if (chart_data.should_update_day_chart_stats) {
    action_array.push(
      updateChartStats(
        chart_data.day_action_type,
        chart_data.day_chart_keyPath,
        chart_data.day_chart_notSetValue,
        chart_data.day_chart_updater
      )
    );
  }

  // Update week chart stats if type is  day, week
  if (chart_data.should_update_week_chart_stats) {
    action_array.push(
      updateChartStats(
        chart_data.week_action_type,
        chart_data.week_chart_keyPath,
        chart_data.week_chart_notSetValue,
        chart_data.week_chart_updater
      )
    );
  }

  // Update month chart stats if type is week (start week and end week if diff months)
  if (chart_data.should_update_month_chart_stats_by_week_if_diff_months) {
    // Start week
    action_array.push(
      updateChartStats(
        chart_data.month_action_type,
        chart_data.start_month_chart_keyPath,
        chart_data.start_month_chart_notSetValue,
        chart_data.start_month_chart_updater
      )
    );

    // End week
    action_array.push(
      updateChartStats(
        chart_data.month_action_type,
        chart_data.end_month_chart_keyPath,
        chart_data.end_month_chart_notSetValue,
        chart_data.end_month_chart_updater
      )
    );
  }

  // Update month chart stats if type is day, week, month
  if (chart_data.should_update_month_chart_stats) {
    action_array.push(
      updateChartStats(
        chart_data.month_action_type,
        chart_data.month_chart_keyPath,
        chart_data.month_chart_notSetValue,
        chart_data.month_chart_updater
      )
    );
  }

  // Update year chart stats if type is day, week, month
  if (chart_data.should_update_year_chart_stats) {
    action_array.push(
      updateChartStats(
        chart_data.year_action_type,
        chart_data.year_chart_keyPath,
        chart_data.year_chart_notSetValue,
        chart_data.year_chart_updater
      )
    );
  }

  dispatch(batchActions(action_array));
};
