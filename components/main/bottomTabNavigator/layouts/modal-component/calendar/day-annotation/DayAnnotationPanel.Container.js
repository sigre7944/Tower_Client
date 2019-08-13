import {connect} from 'react-redux'
import DayAnnotationPanel from './DayAnnotationPanel'
import {updateTask} from '../../../../../../shared/actions/updateTask'

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTask: (data) => dispatch(updateTask("UPDATE_NEW_DAY_TASK", data))
})

export default connect(
    null,
    mapDispatchToProps
)(DayAnnotationPanel)