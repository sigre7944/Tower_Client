import {connect} from 'react-redux'
import Goal from './Goal'
import {updateGoal} from './actions/updateGoal'


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateGoal: (data) => dispatch(updateGoal(data))
})

export default connect(
    null,
    mapDispatchToProps
)(Goal)