import { connect } from 'react-redux'

import TaskDetailEditModal from './TaskDetailEditModal'

const mapStateToProps = (state, ownProps) => {
    return (
        {
            categories: state["categories"],
            priorities: state["priorities"],
        }
    )
}

export default connect(
    mapStateToProps,
    null
)(TaskDetailEditModal)