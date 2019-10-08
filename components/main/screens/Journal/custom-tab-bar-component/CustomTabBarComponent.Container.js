import {connect} from 'react-redux'
import {changeRouteAction} from '../../../shared/actions/otherAction'
import CustomTabBarComponent from './CustomTabBarComponent'

const mapStateToProps = (state) => ({
    currentRoute: state.get("currentRoute"),
    day_tasks: state.get("day_tasks"),
    week_tasks: state.get("week_tasks"),
    month_tasks: state.get("month_tasks"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomTabBarComponent)