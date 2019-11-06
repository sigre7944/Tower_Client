import { connect } from 'react-redux'
import { updateTaskPriorityAndReward } from './actions/updateTaskPriorityAndReward'
import Priority from './Priority'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            return ({
                task_data: state.get("currentDayTask"),
                priorities: state.get("priorities")
            })
        }

        else if (ownProps.currentAnnotation === "week") {
            return ({
                task_data: state.get("currentWeekTask"),
                priorities: state.get("priorities")
            })
        }

        return ({
            task_data: state.get("currentMonthTask"),
            priorities: state.get("priorities")
        })
    }

    return {
        priorities: state.get("priorities")
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            updateTaskPriorityAndReward: (data) => dispatch(updateTaskPriorityAndReward("UPDATE_NEW_DAY_TASK", data))
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            updateTaskPriorityAndReward: (data) => dispatch(updateTaskPriorityAndReward("UPDATE_NEW_WEEK_TASK", data))
        })
    }

    else {
        return ({
            updateTaskPriorityAndReward: (data) => dispatch(updateTaskPriorityAndReward("UPDATE_NEW_MONTH_TASK", data))
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Priority)