import { connect } from 'react-redux'
import {updatePurchaseItemThunk, addPurchaseItemThunk} from './actions/getRewardActionThunk'
import TrackingSection from './TrackingSection'

const mapStateToProps = (state, ownProps) => ({
    main_reward: state.get("main_reward"),
    rewards: state.get("rewards"),
    balance: state.get("balance"),
    purchase_history: state.get("purchase_history")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addPurchaseItemThunk: (sending_obj) => dispatch(addPurchaseItemThunk(sending_obj)),
    updatePurchaseItemThunk: (sending_obj) => dispatch(updatePurchaseItemThunk(sending_obj))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackingSection)