import { connect } from 'react-redux'
import { updateTaskPriorityAndReward } from './actions/updateTaskPriorityAndReward'
import Priority from './Priority'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            return ({
                task_data: state["currentDayTask"],
                priorities: state["priorities"]
            })
        }

        else if (ownProps.currentAnnotation === "week") {
            return ({
                task_data: state["currentWeekTask"],
                priorities: state["priorities"]
            })
        }

        return ({
            task_data: state["currentMonthTask"],
            priorities: state["priorities"]
        })
    }

    return {
        priorities: state["priorities"]
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