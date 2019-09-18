import { connect } from 'react-redux'
import { changeRouteAction } from '../../../../../shared/actions/otherAction'
import { updateHeaderText } from '../../../../../shared/actions/otherAction'
import Daily from './Daily.Presentational'

const mapStateToProps = (state) => ({
    routeName: state.get("currentRoute"),
    day_tasks: state.get("day_tasks"),
    categories: state.get("categories"),
    priorities: state.get("priorities"),
    headerPressed: state.get("headerPressed")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName)),

    updateHeaderText: (data) => dispatch(updateHeaderText(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Daily)