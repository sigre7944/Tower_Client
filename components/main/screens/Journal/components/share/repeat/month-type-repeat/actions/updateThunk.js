import { batchActions } from 'redux-batched-actions'

import { updateTask } from '../../../../../../../../shared/actions/taskAction'

export const updateThunk = ({ repeat_data, end_data, goal_data }) => (dispatch, getState) => {

    let action_arrays = [
        updateTask("UPDATE_NEW_MONTH_TASK", repeat_data.keyPath, repeat_data.notSetValue, repeat_data.updater),
        updateTask("UPDATE_NEW_MONTH_TASK", end_data.keyPath, end_data.notSetValue, end_data.updater),
        updateTask("UPDATE_NEW_MONTH_TASK", goal_data.keyPath, goal_data.notSetValue, goal_data.updater)
    ]

    dispatch(batchActions(action_arrays))
}