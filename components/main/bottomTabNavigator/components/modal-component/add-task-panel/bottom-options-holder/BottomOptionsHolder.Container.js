import { connect } from 'react-redux'
import { addTaskThunk } from './actions/addTaskThunk'

import BottomOptionsHolder from './BottomOptionsHolder'


const mapStateToProps = (state, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            task_data: state.get("currentDayTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),

            addTaskDescription: state.get("addTaskDescription"),
            addTaskTitle: state.get("addTaskTitle")
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            task_data: state.get("currentWeekTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),

            addTaskDescription: state.get("addTaskDescription"),
            addTaskTitle: state.get("addTaskTitle")
        })
    }

    else
        return ({
            task_data: state.get("currentMonthTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),

            addTaskDescription: state.get("addTaskDescription"),
            addTaskTitle: state.get("addTaskTitle")
        })
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    addTaskThunk: (data) => { dispatch(addTaskThunk(data)) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomOptionsHolder)