import { connect } from 'react-redux'
import {
    updateTitle,
    updateDescription,
} from '../../../../../../shared/actions/otherAction'
import { addTaskThunk } from './actions/addTaskThunk'

import BottomOptionsHolder from './BottomOptionsHolder'


const mapStateToProps = (state, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            currentTask: state.get("currentDayTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),

            addTaskDescription: state.get("addTaskDescription"),
            addTaskTitle: state.get("addTaskTitle")
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            currentTask: state.get("currentWeekTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),

            addTaskDescription: state.get("addTaskDescription"),
            addTaskTitle: state.get("addTaskTitle")
        })
    }

    else
        return ({
            currentTask: state.get("currentMonthTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),

            addTaskDescription: state.get("addTaskDescription"),
            addTaskTitle: state.get("addTaskTitle")
        })
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (data) => {
        dispatch(updateTitle(data))
    },

    updateDescription: (data) => {
        dispatch(updateDescription(data))
    },

    addTaskThunk: (data) => { dispatch(addTaskThunk(data)) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomOptionsHolder)