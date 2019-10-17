import { batchActions } from 'redux-batched-actions'
import { updateTask } from '../../../../../../../shared/actions/taskAction'
export const updateTaskSchedule = ({ type, day, month, year }) => (dispatch, getState) => {
    let action_array = [
        updateTask(type, ["schedule", "day"], day, (value) => day),
        updateTask(type, ["schedule", "month"], month, (value) => month),
        updateTask(type, ["schedule", "year"], year, (value) => year),
    ]

    dispatch(batchActions(action_array))
}