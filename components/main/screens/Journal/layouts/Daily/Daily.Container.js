import {connect} from 'react-redux'
import {changeRoute} from './actions/ChangeRoute'
import {updateHeaderText} from './actions/updateHeaderText'
import Daily from './Daily.Presentational'

const mapStateToProps = (state) => ({
    routeName: state.currentRoute,
    day_tasks: state.day_tasks,
    categories: state.categories,
    priorities: state.priorities,
    headerPressed: state.headerPressed
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRoute(routeName)),

    updateHeaderText: (data) => dispatch(updateHeaderText(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Daily)