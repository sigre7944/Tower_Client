import { connect } from 'react-redux'
import TrackingSection from './TrackingSection'

const mapStateToProps = (state, ownProps) => ({
    main_reward: state.get("main_reward"),
    rewards: state.get("rewards"),
    balance: state.get("balance")
})

export default connect(
    mapStateToProps,
    null
)(TrackingSection)