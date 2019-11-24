import { connect } from 'react-redux'
import {
    updateType
} from '../../../../../../shared/actions/otherAction'

import TaskAnnotationTypeHolder from './TaskAnnotationTypeHolder'


const mapStateToProps = (state) => ({
    currentDayTask: state["currentDayTask"],
    currentWeekTask: state["currentWeekTask"],
    currentMonthTask: state["currentMonthTask"],

    categories: state["categories"],
    priorities: state["priorities"],

    addTaskDescription: state["addTaskDescription"],
    addTaskTitle: state["addTaskTitle"]
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