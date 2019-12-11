import { batchActions } from 'redux-batched-actions'

import { updateTask } from '../../../../../../../../../../shared/actions/taskAction'
import { updateCategory } from '../../../../../../../../../../shared/actions/categoryAction'
import { updatePriority } from '../../../../../../../../../../shared/actions/priorityAction'


export const updateEditedTask = ({
    edited_task_data,
    old_category_data,
    new_category_data,
    old_priority_data,
    new_priority_data,
    new_completed_task_data,
}) => (dispatch, getState) => {
    let action_arrays = [
        updateTask(edited_task_data.type, edited_task_data.keyPath, edited_task_data.notSetValue, edited_task_data.updater),

        updateCategory(old_category_data.keyPath, old_category_data.notSetValue, old_category_data.updater),
        updateCategory(new_category_data.keyPath, new_category_data.notSetValue, new_category_data.updater),

        updatePriority(old_priority_data.keyPath, old_priority_data.notSetValue, old_priority_data.updater),
        updatePriority(new_priority_data.keyPath, new_priority_data.notSetValue, new_priority_data.updater),

        updateTask(new_completed_task_data.type, new_completed_task_data.keyPath, new_completed_task_data.notSetValue, new_completed_task_data.updater)
    ]

    dispatch(batchActions(action_arrays))
}