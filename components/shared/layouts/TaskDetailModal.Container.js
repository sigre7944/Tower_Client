import { connect } from 'react-redux'
import TaskDetailModal from './TaskDetailModal'

import {
    editThunk,
    deleteTaskThunk
} from './actions/taskDetailModalThunk'

const mapStateToProps = (state) => ({
    categories: state.categories,
    priorities: state.priorities,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    editThunk: (data) => dispatch(editThunk(ownProps.action_type, data)),

    deleteTaskThunk: (data) => dispatch(deleteTaskThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailModal)