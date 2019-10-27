import { connect } from 'react-redux'
import {
    updateType
} from '../../../../../../shared/actions/otherAction'

import TaskAnnotationTypeHolder from './TaskAnnotationTypeHolder'


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
    updateType: (type, keyPath, notSetValue, updater) => {
        dispatch(updateType(type, keyPath, notSetValue, updater))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskAnnotationTypeHolder)