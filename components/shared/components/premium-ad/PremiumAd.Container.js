import { connect } from 'react-redux'
import PremiumAd from './PremiumAd'

const mapStateToProps = (state) => ({
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PremiumAd)