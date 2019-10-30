import { batchActions } from 'redux-batched-actions'
import {
    updateTitle,
    updateDescription
} from '../../../../../../../shared/actions/otherAction'
import { updateTask, resetNewTask } from '../../../../../../../shared/actions/taskAction'
import { updateCategory } from '../../../../../../../shared/actions/categoryAction'

// export const addTaskThunk = ({ category_key, category_data, add_task_action, add_data, update_task_action, reset_data, description, title }) => (dispatch, getState) => {
//     dispatch(batchActions([
//         updateTitle(title),
//         updateDescription(description),
//         updateTask(add_task_action, add_data),
//         updateTask(update_task_action, reset_data),
//         updateCategory(category_key, category_data)
//     ]))
// }

export const addTaskThunk = ({ add_task_data, category_data, reset_new_task_type }) => (dispatch, getState) => {
    let actions_array = [
        updateTitle(""),
        updateDescription(""),
        resetNewTask(reset_new_task_type),
        updateTask(add_task_data.type, add_task_data.keyPath, add_task_data.notSetValue, add_task_data.updater),
        updateCategory(category_data.keyPath, category_data.notSetValue, category_data.updater)
    ]

    dispatch(batchActions(actions_array))
}