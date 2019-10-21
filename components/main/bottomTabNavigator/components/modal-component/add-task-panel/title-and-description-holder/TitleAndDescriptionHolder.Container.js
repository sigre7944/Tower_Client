import { connect } from 'react-redux'
import {
    updateTitle,
    updateDescription,
} from '../../../../../../shared/actions/otherAction'

import TitleAndDescriptionHolder from './TitleAndDescriptionHolder'


const mapStateToProps = (state) => ({
    addTaskDescription: state.get("addTaskDescription"),
    addTaskTitle: state.get("addTaskTitle")
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateTitle: (data) => {
        dispatch(updateTitle(data))
    },

    updateDescription: (data) => {
        dispatch(updateDescription(data))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleAndDescriptionHolder)