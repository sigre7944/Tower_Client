import { connect } from 'react-redux'
import {
    updateTitle,
    updateDescription,
} from '../../../../../shared/actions/otherAction'
import { addTaskThunk } from './actions/addTaskThunk'

import AddTaskPanel from './AddTaskPanel'


const mapStateToProps = (state) => ({
    currentDayTask: state.get("currentDayTask"),
    currentWeekTask: state.get("currentWeekTask"),
    currentMonthTask: state.get("currentMonthTask"),
    
    categories: state.get("categories"),
    priorities: state.get("priorities"),

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

    addTaskThunk: (data) => { dispatch(addTaskThunk(data)) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskPanel)