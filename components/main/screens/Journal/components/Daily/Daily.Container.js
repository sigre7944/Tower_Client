import { connect } from 'react-redux'
import { changeRouteAction } from '../../../../../shared/actions/otherAction'
import { updateHeaderText } from '../../../../../shared/actions/otherAction'
import Daily from './Daily.Presentational'

const mapStateToProps = (state) => ({
    routeName: state.get("currentRoute"),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName)),

    updateHeaderText: (data) => dispatch(updateHeaderText(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Daily)