import { connect } from 'react-redux'
import { changeRouteAction } from '../shared/actions/otherAction'
import { deleteRecordsInDayThunk } from "./actions/deleteRecordsThunk";
import PurchaseHistory from './PurchaseHistory'

const mapStateToProps = (state) => ({
    currentRoute: state["currentRoute"],
    rewards: state["rewards"],
    purchase_history: state["purchase_history"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName)),
    deleteRecordsInDayThunk: (data) => dispatch(deleteRecordsInDayThunk(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseHistory)