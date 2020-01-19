import { connect } from 'react-redux'
import PremiumRow from './PremiumRow'

const mapStateToProps = (state) => ({
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PremiumRow)