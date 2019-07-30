import {connect} from 'react-redux'
import Priority from './Priority'
import {updatePriority} from './actions/updatePriority'

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    currentTask: state.currentTask
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updatePriority: (data) => dispatch(updatePriority(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Priority)