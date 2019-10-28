import { connect } from 'react-redux'
// import { updateTaskSchedule } from './actions/updateThunk'
import Category from './Category'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        if (ownProps.currentAnnotation === "day") {
            return ({
                task_data: state.get("currentDayTask")
            })
        }

        else if (ownProps.currentAnnotation === "week"){
            return ({
                task_data: state.get("currentWeekTask")
            })
        }

        return ({
            task_data: state.get("currentMonthTask")
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