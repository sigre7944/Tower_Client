import { connect } from 'react-redux'
import { deleteActionThunk } from './actions/deleteActionThunk'
import DeleteReward from './DeleteReward'

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteActionThunk: (delete_reward_id) => dispatch(deleteActionThunk(delete_reward_id))
})

export default connect(
    null,
    mapDispatchToProps
)(DeleteReward)