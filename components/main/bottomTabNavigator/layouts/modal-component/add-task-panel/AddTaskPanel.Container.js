import {connect} from 'react-redux'
import {updateTitle} from './actions/updateTitle'
import {updateDescription} from './actions/updateDescription'
import AddTaskPanel from './AddTaskPanel'


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (data) => {
        dispatch(updateTitle(data))
    },

    updateDescription: (data) => {
        dispatch(updateDescription(data))
    }
})

export default connect(
    null,
    mapDispatchToProps
)(AddTaskPanel)