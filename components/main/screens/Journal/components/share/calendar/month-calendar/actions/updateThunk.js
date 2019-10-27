import { batchActions } from 'redux-batched-actions'
import { updateTask } from '../../../../../../../../shared/actions/taskAction'
export const updateTaskSchedule = ({ month, year }) => (dispatch, getState) => {
    let action_array = [
        updateTask("UPDATE_NEW_MONTH_TASK", ["schedule", "month"], month, (value) => month),
        updateTask("UPDATE_NEW_MONTH_TASK", ["schedule", "year"], year, (value) => year),
    ]

    dispatch(batchActions(action_array))
}