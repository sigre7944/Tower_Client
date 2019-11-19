import { connect } from 'react-redux'
import {
    addRewardAndMainReward,
    editRewardAndMainReward,
    deleteReward
} from './actions/rewardActionThunk'
import AddEditReward from './AddEditReward'

const mapStateToProps = (state) => ({
    rewards: state.get("rewards"),
    main_reward: state.get("main_reward")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addRewardAndMainReward: (data) => dispatch(addRewardAndMainReward(data)),
    editRewardAndMainReward: (data) => dispatch(editRewardAndMainReward(data)),
    deleteReward: (data) => dispatch(deleteReward(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEditReward)