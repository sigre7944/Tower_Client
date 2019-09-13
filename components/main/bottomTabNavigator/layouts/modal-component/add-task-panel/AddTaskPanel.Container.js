import { connect } from 'react-redux'
import {
    updateTitle,
    updateDescription,
    updateType
} from '../../../../../shared/actions/otherAction'
import { addTaskThunk } from './actions/addTaskThunk'

import AddTaskPanel from './AddTaskPanel'


const mapStateToProps = (state) => ({
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
    categories: state.categories,
    priorities: state.priorities,
    day_tasks: state.day_tasks,
    week_tasks: state.week_tasks,
    month_tasks: state.month_tasks,

    addTaskDescription: state.addTaskDescription,
    addTaskTitle: state.addTaskTitle
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