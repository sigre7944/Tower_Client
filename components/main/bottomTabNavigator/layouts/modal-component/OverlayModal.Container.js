import {connect} from 'react-redux'

import OverlayModal from './OverlayModal'

const mapStateToProps = (state) => ({
    currentTask: state.currentTask
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverlayModal)