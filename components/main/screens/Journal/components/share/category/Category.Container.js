import { connect } from 'react-redux'
import { updateTaskCategory } from './actions/updateTaskCategory'
import Category from './Category'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            return ({
                task_data: state.get("currentDayTask"),
                categories: state.get("categories")
            })
        }

        else if (ownProps.currentAnnotation === "week") {
            return ({
                task_data: state.get("currentWeekTask"),
                categories: state.get("categories")
            })
        }

        return ({
            task_data: state.get("currentMonthTask"),
            categories: state.get("categories")
        })
    }

    return {
        categories: state.get("categories")
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            updateTaskCategory: (data) => dispatch(updateTaskCategory("UPDATE_NEW_DAY_TASK", data))
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            updateTaskCategory: (data) => dispatch(updateTaskCategory("UPDATE_NEW_WEEK_TASK", data))
        })
    }

    else {
        return ({
            updateTaskCategory: (data) => dispatch(updateTaskCategory("UPDATE_NEW_MONTH_TASK", data))
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)