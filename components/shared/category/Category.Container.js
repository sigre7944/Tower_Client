import { connect } from 'react-redux'
import Category from './Category'
import { createCategory } from '../actions/createCategory'
import { updateTask } from '../actions/updateTask'

let action_type = ""

const mapStateToProps = (state, ownProps) => {
    
    if(!ownProps.edit){
        if(ownProps.currentAnnotation === "day"){
            action_type = "UPDATE_NEW_DAY_TASK"
            return ({
                categories: state.categories,
                task_data: state.currentDayTask
            })
        }

        else if(ownProps.currentAnnotation === "week"){
            action_type = "UPDATE_NEW_WEEK_TASK"
            return ({
                categories: state.categories,
                task_data: state.currentWeekTask
            })
        }

        else{
            action_type = "UPDATE_NEW_MONTH_TASK"
            return ({
                categories: state.categories,
                task_data: state.currentMonthTask
            })
        }
    }

    return null
}

const mapDispatchToProps = (dispatch, ownProps) => {
    if (!ownProps.edit) {
        return ({
            updateTask: (data) => dispatch(updateTask(action_type, data))
        })
    }

    return null
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)