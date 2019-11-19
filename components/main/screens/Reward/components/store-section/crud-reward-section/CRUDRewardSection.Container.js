import { connect } from 'react-redux'
import { updatePurchaseItemThunk } from './actions/getRewardActionThunk'
import CRUDRewardSection from './CRUDRewardSection'

const mapStateToProps = (state) => ({
    rewards: state.get("rewards"),
    purchase_history: state.get("purchase_history"),
    balance: state.get("balance")
})

const mapDispatchToProps = (dispatch) => ({
    updatePurchaseItemThunk: (sending_obj) => dispatch(updatePurchaseItemThunk(sending_obj))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CRUDRewardSection)