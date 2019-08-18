import { connect } from 'react-redux'
import DayCalendar from './DayCalendar'

const mapStateToProps = (state, ownProps) => {
    if(!ownProps.edit){
        return({
            task_data: state.currentDayTask
        })
    }

    return null
}

export default connect(
    mapStateToProps,
    null
)(DayCalendar)