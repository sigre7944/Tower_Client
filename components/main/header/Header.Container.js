import { connect } from 'react-redux'
import {toggleReturn} from './actions/toggleReturn'
import Header from './Header'

const mapStateToProps = (state, ownProps) => ({
    headerText: state.headerText
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleReturn: () => dispatch(toggleReturn())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)