import {
  updateTask,
  deleteTask,
  deleteKeyPathTask,
  returnNewCompletedTask
} from "../../../../../../../../../shared/actions/taskAction";
import {
  updateChartStats,
  returnNewChartStats
} from "../../../../../../../../../shared/actions/chartStatsAction";
import { batchActions } from "redux-batched-actions";
import { updateCategory } from "../../../../../../../../../shared/actions/categoryAction";
import { updatePriority } from "../../../../../../../../../shared/actions/priorityAction";

export const deleteTaskAndHistoryThunk = ({
  delete_task_data,
  update_category_data,
  update_priority_data,
  delete_completed_task_data,
  return_new_day_chart_stats_data,
  return_new_week_chart_stats_data,
  return_new_month_chart_stats_data,
  return_new_year_chart_stats_data,
  deleted_task_data
}) => (dispatch, getState) => {
  let action_array = [
    //Delete task data in day_tasks/week_tasks/month_tasks
    deleteTask(delete_task_data.type, delete_task_data.id),

    //Update quantity in corresponding category
    updateCategory(
      update_category_data.keyPath,
      update_category_data.notSetValue,
      update_category_data.updater
    ),

    //Update tasks property in priorities
    updatePriority(
      update_priority_data.keyPath,
      update_priority_data.notSetValue,
      update_priority_data.updater
    ),

    //Delete the records of deleted task in day/week/month_completed_tasks
    deleteTask(delete_completed_task_data.type, delete_completed_task_data.id),

    //Delete deleted records of task in deleted_day/week/month_tasks
    deleteKeyPathTask(deleted_task_data.type, deleted_task_data.keyPath)
  ];

  // If we delete day, week, month tasks
  if (return_new_day_chart_stats_data.should_return) {
    action_array.push(
      returnNewChartStats(
        return_new_day_chart_stats_data.type,
        return_new_day_chart_stats_data.data
      )
    );
  }

  // If we delete week, month tasks
  if (return_new_week_chart_stats_data.should_return) {
    action_array.push(
      returnNewChartStats(
        return_new_week_chart_stats_data.type,
        return_new_week_chart_stats_data.data
      )
    );
  }

  // If we delete day, week, month tasks
  if (return_new_month_chart_stats_data.should_return) {
    action_array.push(
      returnNewChartStats(
        return_new_month_chart_stats_data.type,
        return_new_month_chart_stats_data.data
      )
    );
  }

  // If we delete day, week, month tasks
  if (return_new_year_chart_stats_data.should_return) {
    action_array.push(
      returnNewChartStats(
        return_new_year_chart_stats_data.type,
        return_new_year_chart_stats_data.data
      )
    );
  }

  dispatch(batchActions(action_array));
};

// Delete only record of the task at the time
export const deleteTaskAndHistoryAtTimeThunk = ({
  delete_timestamp_completed_task_data,
  deleted_task_data,
  delete_timestamp_day_chart_stats_data,
  delete_timestamp_week_chart_stats_data,
  delete_timestamp_month_chart_stats_data,
  delete_timestamp_year_chart_stats_data
}) => (dispatch, getState) => {
  let action_array = [
    // Delete the timestamp record in completed_day/week/month_tasks
    deleteKeyPathTask(
      delete_timestamp_completed_task_data.type,
      delete_timestamp_completed_task_data.keyPath
    ),

    // Update deleted timestamp, task info in deleted_day/week/month_tasks
    updateTask(
      deleted_task_data.type,
      deleted_task_data.keyPath,
      deleted_task_data.notSetValue,
      deleted_task_data.updater
    )
  ];

  // If we delete day, week, month tasks
  if (delete_timestamp_day_chart_stats_data.should_delete) {
    action_array.push(
      returnNewChartStats(
        delete_timestamp_day_chart_stats_data.type,
        delete_timestamp_day_chart_stats_data.data
      )
    );
  }

  // If we delete week, month tasks
  if (delete_timestamp_week_chart_stats_data.should_delete) {
    action_array.push(
      returnNewChartStats(
        delete_timestamp_week_chart_stats_data.type,
        delete_timestamp_week_chart_stats_data.data
      )
    );
  }

  // If we delete month tasks
  if (delete_timestamp_month_chart_stats_data.should_delete) {
    action_array.push(
      returnNewChartStats(
        delete_timestamp_month_chart_stats_data.type,
        delete_timestamp_month_chart_stats_data.data
      )
    );
  }

  // If we delete day, week, month tasks
  if (delete_timestamp_year_chart_stats_data.should_delete) {
    action_array.push(
      returnNewChartStats(
        delete_timestamp_year_chart_stats_data.type,
        delete_timestamp_year_chart_stats_data.data
      )
    );
  }

  dispatch(batchActions(action_array));
};
