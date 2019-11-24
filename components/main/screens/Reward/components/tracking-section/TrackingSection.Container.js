import { connect } from 'react-redux'
import { updatePurchaseItemThunk } from './actions/getRewardActionThunk'
import TrackingSection from './TrackingSection'

const mapStateToProps = (state, ownProps) => ({
    main_reward: state["main_reward"],
    rewards: state["rewards"],
    balance: state["balance"],
    purchase_history: state["purchase_history"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updatePurchaseItemThunk: (data) => dispatch(updatePurchaseItemThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackingSection)