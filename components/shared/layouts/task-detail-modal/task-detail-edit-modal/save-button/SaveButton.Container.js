import { connect } from 'react-redux'

import SaveButton from './SaveButton'


const mapDispatchToProps = (dispatch, ownProps) => ({
    editThunk: (data) => dispatch(editThunk(ownProps.action_type, data)),
    deleteTaskThunk: (data) => dispatch(deleteTaskThunk(data))
})

export default connect(
    null,
    null
)(SaveButton)