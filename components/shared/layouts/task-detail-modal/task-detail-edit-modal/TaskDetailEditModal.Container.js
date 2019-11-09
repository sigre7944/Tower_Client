import { connect } from 'react-redux'

import TaskDetailEditModal from './TaskDetailEditModal'

const mapStateToProps = (state, ownProps) => {
    return (
        {
            categories: state.get("categories"),
            priorities: state.get("priorities"),
        }
    )
}

export default connect(
    mapStateToProps,
    null
)(TaskDetailEditModal)