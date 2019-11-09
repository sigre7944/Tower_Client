import { connect } from 'react-redux'

import TaskDetailModal from './TaskDetailModal'

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
)(TaskDetailModal)