import { connect } from 'react-redux'
import { changeRouteAction, updateGeneralSettings } from '../../../shared/actions/otherAction'
import Settings from './Settings'

const mapStateToProps = (state) => ({
    currentRoute: state["currentRoute"],
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeRouteAction: (routeName) => dispatch(changeRouteAction(routeName)),
    updateGeneralSettings: (keyPath, notSetValue, updater) => dispatch(updateGeneralSettings(keyPath, notSetValue, updater))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)