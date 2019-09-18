import {connect} from 'react-redux'
import {changeRoute} from './actions/ChangeRoute'
import Progress from './Progress.Presentational'

const mapStateToProps = (state) => ({
    currentRoute: state.get("currentRoute"),
    day_stats: state.get("day_stats"),
    week_stats: state.get("week_stats"),
    month_stats: state.get("month_stats")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRoute(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Progress)