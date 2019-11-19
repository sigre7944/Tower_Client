import { connect } from 'react-redux'
import { updatePurchaseItemThunk } from './actions/getRewardActionThunk'
import TrackingSection from './TrackingSection'

const mapStateToProps = (state, ownProps) => ({
    main_reward: state.get("main_reward"),
    rewards: state.get("rewards"),
    balance: state.get("balance"),
    purchase_history: state.get("purchase_history")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updatePurchaseItemThunk: (data) => dispatch(updatePurchaseItemThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackingSection)