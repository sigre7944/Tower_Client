import {
    updateTask,
    deleteTask
} from '../../actions/taskAction'
import { batchActions } from 'redux-batched-actions'
import { updateCategory } from '../../actions/categoryAction'

export const editThunk = (action_type, { edit_task, new_category_key, new_category_data, old_category_key, old_category_data }) => (dispatch, getState) => {
    dispatch(batchActions([
        updateTask(action_type, edit_task),
        updateCategory(old_category_key, old_category_data),
        updateCategory(new_category_key, new_category_data)
    ]))
}

export const deleteTaskThunk = ({ completed_task_action_type, uncompleted_task_action_type, id }) => (dispatch, getState) => {
    dispatch(batchActions([
        deleteTask(completed_task_action_type, id),
        deleteTask(uncompleted_task_action_type, id)
    ]))
}