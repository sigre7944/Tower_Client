import { connect } from 'react-redux'
import UserAccount from './UserAccount'

const mapStateToProps = (state) => ({
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccount)