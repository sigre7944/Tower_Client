import { connect } from 'react-redux'
import { updateTaskSchedule } from './actions/updateThunk'
import WeekCalendar from './WeekCalendar'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        return ({
            task_data: state["currentWeekTask"]
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
)(WeekCalendar)