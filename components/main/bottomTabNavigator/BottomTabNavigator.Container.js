import {connect} from 'react-redux'
import {changeRoute} from './actions/ChangeRoute'
import BottomTabNavigator from './BottomTabNavigator.Presentational'

const mapStateToProps = (state) => ({
    routeName: state.currentRoute,
    // The redux connected component will get updated to re-render when mapping to the updated fields in redux store state.
    // currentWeekInMonth: state.currentWeekInMonth 
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRoute(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomTabNavigator)