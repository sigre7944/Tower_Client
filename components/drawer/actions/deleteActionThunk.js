import {
  deleteCategory,
  updateCategory,
  returnNewCategories
} from "../../shared/actions/categoryAction";
import {
  returnNewChartStats,
  resetChartStats
} from "../../shared/actions/chartStatsAction";
import { batchActions } from "redux-batched-actions";
import {
  deleteAllTasksInCategory,
  returnNewTasks,
  resetTasks
} from "../../shared/actions/taskAction";
import {
  returnNewPriorities,
  resetPriorities
} from "../../shared/actions/priorityAction";

export const deleteCategoryWithTasksAndHistory = ({
  category_id,
  new_priorities,
  new_day_chart_stats,
  new_week_chart_stats,
  new_month_chart_stats,
  new_year_chart_stats,
  new_deleted_day_tasks,
  new_deleted_week_tasks,
  new_deleted_month_tasks
}) => (dispatch, getState) => {
  dispatch(
    batchActions([
      deleteCategory(category_id),

      returnNewPriorities(new_priorities),

      deleteAllTasksInCategory(
        "DELETE_ALL_DAY_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_WEEK_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_MONTH_TASKS_WITH_CATEGORY",
        category_id
      ),

      deleteAllTasksInCategory(
        "DELETE_ALL_COMPLETED_DAY_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_COMPLETED_WEEK_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_COMPLETED_MONTH_TASKS_WITH_CATEGORY",
        category_id
      ),

      returnNewChartStats("RETURN_NEW_DAY_CHART_STATS", new_day_chart_stats),
      returnNewChartStats("RETURN_NEW_WEEK_CHART_STATS", new_week_chart_stats),
      returnNewChartStats(
        "RETURN_NEW_MONTH_CHART_STATS",
        new_month_chart_stats
      ),
      returnNewChartStats("RETURN_NEW_YEAR_CHART_STATS", new_year_chart_stats),

      returnNewTasks("RETURN_NEW_DELETED_DAY_TASKS", new_deleted_day_tasks),
      returnNewTasks("RETURN_NEW_DELETED_WEEK_TASKS", new_deleted_week_tasks),
      returnNewTasks("RETURN_NEW_DELETED_MONTH_TASKS", new_deleted_month_tasks)
    ])
  );
};

export const deleteTasksAndHistoryNotCategory = ({
  category_id,
  new_priorities,
  new_day_chart_stats,
  new_week_chart_stats,
  new_month_chart_stats,
  new_year_chart_stats,

  new_deleted_day_tasks,
  new_deleted_week_tasks,
  new_deleted_month_tasks
}) => (dispatch, getState) => {
  dispatch(
    batchActions([
      updateCategory([category_id, "quantity"], 0, v => 0),

      returnNewPriorities(new_priorities),

      deleteAllTasksInCategory(
        "DELETE_ALL_DAY_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_WEEK_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_MONTH_TASKS_WITH_CATEGORY",
        category_id
      ),

      deleteAllTasksInCategory(
        "DELETE_ALL_COMPLETED_DAY_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_COMPLETED_WEEK_TASKS_WITH_CATEGORY",
        category_id
      ),
      deleteAllTasksInCategory(
        "DELETE_ALL_COMPLETED_MONTH_TASKS_WITH_CATEGORY",
        category_id
      ),

      returnNewChartStats("RETURN_NEW_DAY_CHART_STATS", new_day_chart_stats),
      returnNewChartStats("RETURN_NEW_WEEK_CHART_STATS", new_week_chart_stats),
      returnNewChartStats(
        "RETURN_NEW_MONTH_CHART_STATS",
        new_month_chart_stats
      ),
      returnNewChartStats("RETURN_NEW_YEAR_CHART_STATS", new_year_chart_stats),

      returnNewTasks("RETURN_NEW_DELETED_DAY_TASKS", new_deleted_day_tasks),
      returnNewTasks("RETURN_NEW_DELETED_WEEK_TASKS", new_deleted_week_tasks),
      returnNewTasks("RETURN_NEW_DELETED_MONTH_TASKS", new_deleted_month_tasks)
    ])
  );
};

export const resetApplication = ({ new_categories }) => (
  dispatch,
  getState
) => {
  dispatch(
    batchActions([
      returnNewCategories(new_categories),
      resetPriorities(),
      resetChartStats("RESET_DAY_CHART_STATS"),
      resetChartStats("RESET_WEEK_CHART_STATS"),
      resetChartStats("RESET_MONTH_CHART_STATS"),
      resetChartStats("RESET_YEAR_CHART_STATS"),
      resetTasks("RESET_DAY_TASKS"),
      resetTasks("RESET_WEEK_TASKS"),
      resetTasks("RESET_MONTH_TASKS"),
      resetTasks("RESET_COMPLETED_DAY_TASKS"),
      resetTasks("RESET_COMPLETED_WEEK_TASKS"),
      resetTasks("RESET_COMPLETED_MONTH_TASKS"),
      resetTasks("RESET_DELETED_DAY_TASKS"),
      resetTasks("RESET_DELETED_WEEK_TASKS"),
      resetTasks("RESET_DELETED_MONTH_TASKS")
    ])
  );
};
