import { batchActions } from "redux-batched-actions";
import {
  updateTitle,
  updateDescription,
  returnCorrespondCreatedTask,
  updateTaskTypeCreated
} from "../../../../../../../shared/actions/otherAction";
import {
  updateTask,
  resetNewTask
} from "../../../../../../../shared/actions/taskAction";
import { updatePriority } from "../../../../../../../shared/actions/priorityAction";
import { updateCategory } from "../../../../../../../shared/actions/categoryAction";

export const addTaskThunk = ({
  add_task_data,
  category_data,
  reset_new_task_type,
  priority_data,
  return_correspond_created_task,
  update_task_type_created
}) => (dispatch, getState) => {
  let actions_array = [
    updateTitle(""),
    updateDescription(""),
    resetNewTask(reset_new_task_type),
    updateTask(
      add_task_data.type,
      add_task_data.keyPath,
      add_task_data.notSetValue,
      add_task_data.updater
    ),
    updateCategory(
      category_data.keyPath,
      category_data.notSetValue,
      category_data.updater
    ),
    updatePriority(
      priority_data.keyPath,
      priority_data.notSetValue,
      priority_data.updater
    ),
    returnCorrespondCreatedTask(
      return_correspond_created_task.type,
      return_correspond_created_task.data
    ),
    updateTaskTypeCreated(update_task_type_created.data)
  ];

  dispatch(batchActions(actions_array));
};
