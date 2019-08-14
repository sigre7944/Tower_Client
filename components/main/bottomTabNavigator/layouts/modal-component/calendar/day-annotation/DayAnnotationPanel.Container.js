import {connect} from 'react-redux'
import {updateTask} from '../../../../../../shared/actions/updateTask'
import DayAnnotationPanel from './DayAnnotationPanel'

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTask: (data) => dispatch(updateTask("UPDATE_NEW_DAY_TASK", data))
})

export default connect(
    null,
    mapDispatchToProps
)(DayAnnotationPanel)