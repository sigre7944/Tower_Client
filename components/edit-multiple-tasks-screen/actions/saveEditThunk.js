import { batchActions } from 'redux-batched-actions'
import { updateTask } from '../../shared/actions/taskAction'
import { updateCategory } from '../../shared/actions/categoryAction'
import { Map } from "immutable";

export const saveEditThunk = ({ edit_task_data, edit_category_data }) => (dispatch, getState) => {
    let action_array = []

    let update_task_action_type = edit_task_data.action_type,
        update_task_updater = edit_task_data.updater,
        chosen_category_id = edit_category_data.chosen_category_id

    edit_task_data.task_id_list.forEach((task_id, index) => {
        if (update_task_updater) {
            action_array.push(
                updateTask(update_task_action_type, [task_id, "schedule"], {}, (value) => Map(update_task_updater).toMap())
            )
        }

        let according_category_id = edit_task_data.category_id_list[index]

        if (according_category_id !== chosen_category_id && chosen_category_id !== null) {
            action_array.push(
                updateTask(update_task_action_type, [task_id, "category"], "cate_0", (value) => chosen_category_id),
                updateCategory([according_category_id, "quantity"], 0, (value) => value - 1 < 0 ? 0 : value - 1),
                updateCategory([chosen_category_id, "quantity"], 0, (value) => value + 1)
            )
        }
    })

    dispatch(batchActions(action_array))
}