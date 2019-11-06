import { connect } from 'react-redux'
import { updateRewardAndMainReward } from './actions/rewardActionThunk'
import AddEditReward from './AddEditReward'

const mapStateToProps = (state) => ({
    rewards: state.get("rewards"),
    main_reward: state.get("main_reward")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateRewardAndMainReward: (sending_obj) => dispatch(updateRewardAndMainReward(sending_obj))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEditReward)