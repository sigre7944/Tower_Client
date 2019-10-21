import { connect } from 'react-redux'

import TagDataHolder from './TagDataHolder'

const mapStateToProps = (state, ownProps) => {
    if (ownProps.currentAnnotation === "day") {
        return ({
            currentTask: state.get("currentDayTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),
        })
    }

    else if (ownProps.currentAnnotation === "week") {
        return ({
            currentTask: state.get("currentWeekTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),
        })
    }

    else
        return ({
            currentTask: state.get("currentMonthTask"),

            categories: state.get("categories"),
            priorities: state.get("priorities"),
        })
}

export default connect(
    mapStateToProps,
    null
)(TagDataHolder)