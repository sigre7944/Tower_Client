import { batchActions } from 'redux-batched-actions'
import { updateTask } from '../../../../../../../../shared/actions/taskAction'
export const updateTaskSchedule = ({ day, week, month, year, noWeekInMonth }) => (dispatch, getState) => {
    let action_array = [
        updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "day"], day, (value) => day),
        updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "week"], week, (value) => week),
        updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "month"], month, (value) => month),
        updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "year"], year, (value) => year),
        updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "noWeekInMonth"], noWeekInMonth, (value) => noWeekInMonth),
    ]

    dispatch(batchActions(action_array))
}