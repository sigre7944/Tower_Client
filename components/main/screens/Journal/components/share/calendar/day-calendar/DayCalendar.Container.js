import { connect } from 'react-redux'
import { updateTaskSchedule } from './actions/updateThunk'
import DayCalendar from './DayCalendar'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        return ({
            task_data: state["currentDayTask"]
        })
    }

    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTaskSchedule: (data) => dispatch(updateTaskSchedule(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayCalendar)