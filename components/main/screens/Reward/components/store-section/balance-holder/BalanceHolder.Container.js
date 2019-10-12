import { connect } from 'react-redux'
import BalanceHolder from './BalanceHolder'

const mapStateToProps = (state, ownProps) => ({
    balance: state.get("balance")
})

export default connect(
    mapStateToProps,
    null
)(BalanceHolder)