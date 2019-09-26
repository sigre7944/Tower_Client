import { connect } from 'react-redux'
import Category from './Category'

import { updateTask } from '../actions/taskAction'

let action_type = ""

const mapStateToProps = (state, ownProps) => {

    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            action_type = "UPDATE_NEW_DAY_TASK"
            return ({
                categories: state.get("categories"),
                task_data: state.get("currentDayTask")
            })
        }

        else if (ownProps.currentAnnotation === "week") {
            action_type = "UPDATE_NEW_WEEK_TASK"
            return ({
                categories: state.get("categories"),
                task_data: state.get("currentWeekTask")
            })
        }

        else {
            action_type = "UPDATE_NEW_MONTH_TASK"
            return ({
                categories: state.get("categories"),
                task_data: state.get("currentMonthTask")
            })
        }
    }

    return ({
        categories: state.get("categories"),
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
)(Category)