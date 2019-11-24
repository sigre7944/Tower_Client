import { connect } from 'react-redux'

import TaskDetailModal from './TaskDetailModal'

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
)(TaskDetailModal)