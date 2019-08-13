import { connect } from 'react-redux'
import Category from './Category'
import { createCategory } from '../../main/bottomTabNavigator/layouts/modal-component/category/actions/createCategory'
import { updateTask } from '../actions/updateTask'

let action_type = ""

const mapStateToProps = (state, ownProps) => {
    if(ownProps.edit){
        action_type = "UPDATE_EDIT_TASK"
        return ({
            categories: state.categories,
            task_data: state.edittingTask
        })
    }

    else{
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
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCategory: (data) => dispatch(createCategory(data)),
    updateTask: (data) => dispatch(updateTask(action_type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)