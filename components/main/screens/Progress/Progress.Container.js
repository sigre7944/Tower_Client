import {connect} from 'react-redux'
import {changeRoute} from './actions/ChangeRoute'
import Progress from './Progress.Presentational'

const mapStateToProps = (state) => ({
    currentRoute: state.currentRoute,
    day_stats: state.day_stats,
    week_stats: state.week_stats,
    month_stats: state.month_stats
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRoute(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Progress)