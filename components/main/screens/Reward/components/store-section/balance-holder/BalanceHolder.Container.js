import { connect } from 'react-redux'
import BalanceHolder from './BalanceHolder'

const mapStateToProps = (state, ownProps) => ({
    balance: state["balance"]
})

export default connect(
    mapStateToProps,
    null
)(BalanceHolder)