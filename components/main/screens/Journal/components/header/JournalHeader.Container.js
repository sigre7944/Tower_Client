import { connect } from 'react-redux'
import { toggleReturn, toggleEditMultipleTasksAction } from '../../../../../shared/actions/otherAction'
import JournalHeader from './JournalHeader'

const mapStateToProps = (state, ownProps) => {
    return ({
        headerText: state["headerText"],
        currentRoute: state["currentRoute"],
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleReturn: () => dispatch(toggleReturn()),
    toggleEditMultipleTasksAction: () => dispatch(toggleEditMultipleTasksAction())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JournalHeader)