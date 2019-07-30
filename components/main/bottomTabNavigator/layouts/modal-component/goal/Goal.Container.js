import {connect} from 'react-redux'
import Goal from './Goal'
import {updateGoal} from './actions/updateGoal'

const mapStateToProps = (state) => ({
    currentTask: state.currentTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateGoal: (data) => dispatch(updateGoal(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Goal)