import {connect} from 'react-redux'
import {changeRoute} from './actions/ChangeRoute'
import Progress from './Progress.Presentational'

const mapStateToProps = (state) => ({
    currentRoute: state["currentRoute"],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRoute(routeName))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Progress)