import {connect} from 'react-redux'
import CRUDRewardSection from './CRUDRewardSection'

const mapStateToProps = (state) => ({
    rewards: state.get("rewards"),
})

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     changeRouteAction: (routeName) => dispatch(changeRoute(routeName))
// })

export default connect(
    mapStateToProps,
    null
)(CRUDRewardSection)