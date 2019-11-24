import { connect } from 'react-redux'
import { changeRouteAction } from '../../../shared/actions/otherAction'
import Settings from './Settings'

const mapStateToProps = (state) => ({
    currentRoute: state["currentRoute"],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)