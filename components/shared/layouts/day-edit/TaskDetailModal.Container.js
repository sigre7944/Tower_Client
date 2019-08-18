import {connect} from 'react-redux'
import TaskDetailModal from '../TaskDetailModal'
import {updateTask} from '../../actions/updateTask'

const mapStateToProps = (state) => ({
    categories: state.categories,
    edittingTask: state.edittingTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateEdittingTask: (data) => dispatch(updateTask(ownProps.action_type, data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailModal)