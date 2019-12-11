import { batchActions } from 'redux-batched-actions'
import { updateTask, returnNewTasks } from '../../shared/actions/taskAction'
import { updateCategory } from '../../shared/actions/categoryAction'

export const saveEditThunk = ({ edit_task_data, edit_category_data }) => (dispatch, getState) => {
    let action_array = []
    let update_task_action_type = edit_task_data.action_type,
        chosen_category_id = edit_category_data.chosen_category_id

    edit_task_data.task_update_list.forEach((task_update_data, index) => {
        action_array.push(
            updateTask(update_task_action_type, task_update_data.keyPath, task_update_data.notSetValue, task_update_data.updater)
        )

        let according_category_id = task_update_data.category

        if (according_category_id !== chosen_category_id && chosen_category_id !== null) {
            action_array.push(
                updateCategory([according_category_id, "quantity"], 0, (value) => value - 1 < 0 ? 0 : value - 1),
                updateCategory([chosen_category_id, "quantity"], 0, (value) => value + 1)
            )
        }
    })

    dispatch(batchActions(action_array))
}