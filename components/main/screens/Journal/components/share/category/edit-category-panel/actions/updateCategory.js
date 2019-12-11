import { batchActions } from 'redux-batched-actions'

import { updateTask } from '../../../../../../../../shared/actions/taskAction'

export const updateCategory = (category_data) => (dispatch, getState) => {

    let action_arrays = [
        updateTask("UPDATE_CATEGORY", category_data.keyPath, category_data.notSetValue, category_data.updater),
    ]

    dispatch(batchActions(action_arrays))
}