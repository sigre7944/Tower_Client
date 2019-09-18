import { connect } from 'react-redux'
import {
    updateTitle,
    updateDescription,
    updateType
} from '../../../../../shared/actions/otherAction'
import { addTaskThunk } from './actions/addTaskThunk'

import AddTaskPanel from './AddTaskPanel'


const mapStateToProps = (state) => ({
    currentDayTask: state.get("currentDayTask"),
    currentWeekTask: state.get("currentWeekTask"),
    currentMonthTask: state.get("currentMonthTask"),
    categories: state.get("categories"),
    priorities: state.get("priorities"),
    day_tasks: state.get("day_tasks"),
    week_tasks: state.get("week_tasks"),
    month_tasks: state.get("month_tasks"),
    addTaskDescription: state.get("addTaskDescription"),
    addTaskTitle: state.get("addTaskTitle")
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (data) => {
        dispatch(updateTitle(data))
    },

    updateDescription: (data) => {
        dispatch(updateDescription(data))
    },

    updateType: (type, data) => {
        dispatch(updateType(type, data))
    },

    addTaskThunk: (data) => { dispatch(addTaskThunk(data)) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskPanel)