import { connect } from 'react-redux'
import { toggleReturn } from '../../shared/actions/otherAction'
import Header from './Header'

const mapStateToProps = (state, ownProps) => ({
    headerText: state.get("headerText"),
    currentRoute: state.get("currentRoute")
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleReturn: () => dispatch(toggleReturn())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)