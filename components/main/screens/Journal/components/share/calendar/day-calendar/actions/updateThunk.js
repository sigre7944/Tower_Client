import { batchActions } from 'redux-batched-actions'
import { updateTask } from '../../../../../../../../shared/actions/taskAction'
export const updateTaskSchedule = ({ day, month, year }) => (dispatch, getState) => {
    let action_array = [
        updateTask("UPDATE_NEW_DAY_TASK", ["schedule", "day"], day, (value) => day),
        updateTask("UPDATE_NEW_DAY_TASK", ["schedule", "month"], month, (value) => month),
        updateTask("UPDATE_NEW_DAY_TASK", ["schedule", "year"], year, (value) => year),
    ]

    dispatch(batchActions(action_array))
}