import { batchActions } from 'redux-batched-actions'
import {
    updateTitle,
    updateDescription
} from '../../../../../../shared/actions/otherAction'
import { updateTask } from '../../../../../../shared/actions/taskAction'
import { updateCategory } from '../../../../../../shared/actions/categoryAction'

export const addTaskThunk = ({ category_key, category_data, add_task_action, add_data, update_task_action, reset_data, description, title }) => (dispatch, getState) => {
    dispatch(batchActions([
        updateTitle(title),
        updateDescription(description),
        updateTask(add_task_action, add_data),
        updateTask(update_task_action, reset_data),
        updateCategory(category_key, category_data)
    ]))
}