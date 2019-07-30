import {connect} from 'react-redux'
import {updateTitle} from './actions/updateTitle'
import {updateDescription} from './actions/updateDescription'
import AddTaskPanel from './AddTaskPanel'


const mapStateToProps = (state) => ({
    currentTask: state.currentTask
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (data) => {
        dispatch(updateTitle(data))
    },

    updateDescription: (data) => {
        dispatch(updateDescription(data))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskPanel)