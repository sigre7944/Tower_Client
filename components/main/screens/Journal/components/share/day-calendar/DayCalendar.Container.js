import { connect } from 'react-redux'
import DayCalendar from './DayCalendar'

const mapStateToProps = (state, ownProps) => {
    if(!ownProps.edit){
        return({
            task_data: state.get("currentDayTask")
        })
    }

    return {}
}

export default connect(
    mapStateToProps,
    null
)(DayCalendar)