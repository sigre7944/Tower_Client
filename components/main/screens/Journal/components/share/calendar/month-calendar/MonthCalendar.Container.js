import { connect } from 'react-redux'
import { updateTaskSchedule } from './actions/updateThunk'
import MonthCalendar from './MonthCalendar'

const mapStateToProps = (state, ownProps) => {
    if (!ownProps.edit) {
        return ({
            task_data: state["currentMonthTask"]
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
)(MonthCalendar)