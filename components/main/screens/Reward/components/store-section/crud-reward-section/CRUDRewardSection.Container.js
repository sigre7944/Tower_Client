import { connect } from 'react-redux'
import { updatePurchaseItemThunk } from './actions/getRewardActionThunk'
import CRUDRewardSection from './CRUDRewardSection'

const mapStateToProps = (state) => ({
    rewards: state["rewards"],
    purchase_history: state["purchase_history"],
    balance: state["balance"],
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch) => ({
    updatePurchaseItemThunk: (sending_obj) => dispatch(updatePurchaseItemThunk(sending_obj))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CRUDRewardSection)