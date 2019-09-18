import { connect } from 'react-redux'
import Priority from './Priority'
import { updateTask } from '../actions/taskAction'
let action_type = ""

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            action_type = "UPDATE_NEW_DAY_TASK"
            return ({
                priorities: state.get("priorities"),
                task_data: state.get("currentDayTask")
            })
        }

        else if (ownProps.currentAnnotation === "week") {
            action_type = "UPDATE_NEW_WEEK_TASK"
            return ({
                priorities: state.get("priorities"),
                task_data: state.get("currentWeekTask")
            })
        }

        else {
            action_type = "UPDATE_NEW_MONTH_TASK"
            return ({
                priorities: state.get("priorities"),
                task_data: state.get("currentMonthTask")
            })
        }
    }

    return ({
        priorities: state.get("priorities"),
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    if (!ownProps.edit) {
        return ({
            updateTask: (data) => dispatch(updateTask(action_type, data))
        })
    }

    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Priority)