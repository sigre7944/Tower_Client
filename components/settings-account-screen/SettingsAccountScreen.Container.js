import { connect } from 'react-redux'
import SettingsAccountScreen from './SettingsAccountScreen'

const mapStateToProps = (state) => ({
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsAccountScreen)