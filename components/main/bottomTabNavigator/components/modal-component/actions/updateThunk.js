import { batchActions } from 'redux-batched-actions'

import { updateTask } from '../../../../../shared/actions/taskAction'

export const updateThunk = ({
    type,
    startTime_data,
    trackingTime_data,
    schedule_data,
    category_data,
    repeat_data,
    end_data,
    priority_data,
    goal_data
}) => (dispatch, getState) => {

    let action_arrays = [
        updateTask(type, startTime_data.keyPath, startTime_data.notSetValue, startTime_data.updater),
        updateTask(type, trackingTime_data.keyPath, trackingTime_data.notSetValue, trackingTime_data.updater),
        updateTask(type, schedule_data.keyPath, schedule_data.notSetValue, schedule_data.updater),
        updateTask(type, category_data.keyPath, category_data.notSetValue, category_data.updater),
        updateTask(type, repeat_data.keyPath, repeat_data.notSetValue, repeat_data.updater),
        updateTask(type, end_data.keyPath, end_data.notSetValue, end_data.updater),
        updateTask(type, priority_data.keyPath, priority_data.notSetValue, priority_data.updater),
        updateTask(type, goal_data.keyPath, goal_data.notSetValue, goal_data.updater)
    ]

    dispatch(batchActions(action_arrays))
}