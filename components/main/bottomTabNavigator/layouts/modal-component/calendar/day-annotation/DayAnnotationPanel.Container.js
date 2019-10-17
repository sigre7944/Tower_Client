import { connect } from 'react-redux'
import { updateTask } from '../../../../../../shared/actions/taskAction'
import { updateTaskSchedule } from './actions/updateThunk'
import DayAnnotationPanel from './DayAnnotationPanel'

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTaskSchedule: (data) => dispatch(updateTaskSchedule(data))
})

export default connect(
    null,
    mapDispatchToProps
)(DayAnnotationPanel)