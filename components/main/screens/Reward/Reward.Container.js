import {connect} from 'react-redux'
import {changeRouteAction} from '../../../shared/actions/otherAction'
import Reward from './Reward'

const mapStateToProps = (state) => ({
    currentRoute: state.get("currentRoute"),
    rewards: state.get("rewards")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reward)