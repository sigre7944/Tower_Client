import { connect } from 'react-redux'
import {
    updateTitle,
    updateDescription,
} from '../../../../../../shared/actions/otherAction'
import { addTaskThunk } from './actions/addTaskThunk'

import TitleAndDescriptionHolder from './TitleAndDescriptionHolder'


const mapStateToProps = (state, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            task_data: state["currentDayTask"],

            categories: state["categories"],
            priorities: state["priorities"],

            addTaskDescription: state["addTaskDescription"],
            addTaskTitle: state["addTaskTitle"]
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            task_data: state["currentWeekTask"],

            categories: state["categories"],
            priorities: state["priorities"],

            addTaskDescription: state["addTaskDescription"],
            addTaskTitle: state["addTaskTitle"]
        })
    }

    else
        return ({
            task_data: state["currentMonthTask"],

            categories: state["categories"],
            priorities: state["priorities"],

            addTaskDescription: state["addTaskDescription"],
            addTaskTitle: state["addTaskTitle"]
        })
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (data) => {
        dispatch(updateTitle(data))
    },

    updateDescription: (data) => {
        dispatch(updateDescription(data))
    },

    addTaskThunk: (data) => {
        dispatch(addTaskThunk(data))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleAndDescriptionHolder)