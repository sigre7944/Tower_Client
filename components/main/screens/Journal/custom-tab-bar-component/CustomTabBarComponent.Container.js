import {connect} from 'react-redux'
import {changeRouteAction} from '../../../shared/actions/otherAction'
import CustomTabBarComponent from './CustomTabBarComponent'

const mapStateToProps = (state) => ({
    currentRoute: state["currentRoute"],
    day_tasks: state["day_tasks"],
    week_tasks: state["week_tasks"],
    month_tasks: state["month_tasks"],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomTabBarComponent)