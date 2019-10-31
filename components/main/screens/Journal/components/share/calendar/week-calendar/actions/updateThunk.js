import { batchActions } from 'redux-batched-actions'
import { updateTask } from '../../../../../../../../shared/actions/taskAction'
export const updateTaskSchedule = ({ monday, sunday, week, start_month, end_month, chosen_month, start_year, end_year, chosen_year, start_noWeekInMonth, end_noWeekInMonth }) =>
    (dispatch, getState) => {
        let action_array = [
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "monday"], -1, (value) => monday),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "sunday"], -1, (value) => sunday),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "week"], -1, (value) => week),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "start_month"], -1, (value) => start_month),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "end_month"], -1, (value) => end_month),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "chosen_month"], -1, (value) => chosen_month),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "start_year"], -1, (value) => start_year),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "end_year"], -1, (value) => end_year),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "chosen_year"], -1, (value) => chosen_year),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "start_noWeekInMonth"], -1, (value) => start_noWeekInMonth),
            updateTask("UPDATE_NEW_WEEK_TASK", ["schedule", "end_noWeekInMonth"], -1, (value) => end_noWeekInMonth),
        ]

        dispatch(batchActions(action_array))
    }