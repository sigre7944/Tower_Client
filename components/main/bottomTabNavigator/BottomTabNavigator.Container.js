import {connect} from 'react-redux'
import {changeRouteAction} from '../../shared/actions/otherAction'
import BottomTabNavigator from './BottomTabNavigator.Presentational'

const mapStateToProps = (state) => ({
    routeName: state.get("currentRoute"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomTabNavigator)