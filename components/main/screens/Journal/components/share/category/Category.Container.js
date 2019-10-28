import { connect } from 'react-redux'
// import { updateTaskSchedule } from './actions/updateThunk'
import Category from './Category'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            return ({
                task_data: state.get("currentDayTask"),
                categories: state.get("categories")
            })
        }

        else if (ownProps.currentAnnotation === "week"){
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTaskSchedule: (data) => dispatch(updateTaskSchedule(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)