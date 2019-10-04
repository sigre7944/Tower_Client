import {connect} from 'react-redux'
import CRUDRewardSection from './CRUDRewardSection'

const mapStateToProps = (state) => ({
    rewards: state.get("rewards"),
})

export default connect(
    mapStateToProps,
    null
)(CRUDRewardSection)