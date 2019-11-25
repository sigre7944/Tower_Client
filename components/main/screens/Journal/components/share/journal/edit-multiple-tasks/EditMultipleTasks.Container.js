import { connect } from 'react-redux'
import { toggleEditMultipleTasksAction } from '../../../../../../../shared/actions/otherAction'
import EditMultipleTasks from './EditMultipleTasks'

const mapStateToProps = (state, ownProps) => {
    return ({
        toggleEditMultipleTasks: state["toggleEditMultipleTasks"],
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleReturn: () => dispatch(toggleReturn()),
    toggleEditMultipleTasksAction: () => dispatch(toggleEditMultipleTasksAction())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMultipleTasks)