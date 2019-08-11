import { connect } from 'react-redux'
import { updateTitle } from './actions/updateTitle'
import { updateDescription } from './actions/updateDescription'
import { updateType } from './actions/updateType'
import { changeAnnotation } from './actions/changeAnnotation'
import { addTask } from './actions/addTask'
import AddTaskPanel from './AddTaskPanel'


const mapStateToProps = (state) => ({
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
    categories: state.categories,
    priorities: state.priorities,
    currentAnnotation: state.currentAnnotation
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (type, data) => {
        dispatch(updateTitle(type, data))
    },

    updateDescription: (type, data) => {
        dispatch(updateDescription(type, data))
    },

    updateType: (type, data) => {
        dispatch(updateType(type, data))
    },

    changeAnnotation: (annotation) => {
        dispatch(changeAnnotation(annotation))
    },

    addTask: (data) => {
        dispatch(addTask(data))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskPanel)