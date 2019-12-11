import { batchActions } from 'redux-batched-actions'

import { updateTask } from '../../../../../../../shared/actions/taskAction'

export const updateTaskPriorityAndReward = (type, { priority_data, reward_data }) => (dispatch, getState) => {

    let action_arrays = [
        updateTask(type, priority_data.keyPath, priority_data.notSetValue, priority_data.updater),
        updateTask(type, reward_data.keyPath, reward_data.notSetValue, reward_data.updater),
    ]

    dispatch(batchActions(action_arrays))
}