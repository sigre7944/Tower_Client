import {connect} from 'react-redux'
import TaskDetailModal from '../TaskDetailModal'
import {updateEdittingTask} from '../day-edit/actions/updateEdittingTask'

const mapStateToProps = (state) => ({
    categories: state.categories,
    edittingTask: state.edittingTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateEdittingTask: (data) => dispatch(updateEdittingTask(ownProps.action_type, data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailModal)