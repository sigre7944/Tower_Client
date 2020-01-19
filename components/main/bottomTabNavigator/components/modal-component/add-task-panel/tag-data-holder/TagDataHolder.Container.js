import { connect } from 'react-redux'

import TagDataHolder from './TagDataHolder'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            currentTask: state["currentDayTask"],

            categories: state["categories"],
            priorities: state["priorities"],
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            currentTask: state["currentWeekTask"],

            categories: state["categories"],
            priorities: state["priorities"],
        })
    }

    else
        return ({
            currentTask: state["currentMonthTask"],

            categories: state["categories"],
            priorities: state["priorities"],
        })
}

export default connect(
    mapStateToProps,
    null
)(TagDataHolder)