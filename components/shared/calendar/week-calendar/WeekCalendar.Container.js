import { connect } from 'react-redux'
import WeekCalendar from './WeekCalendar'

const mapStateToProps = (state, ownProps) => {

    if(!ownProps.edit){
        return({
            task_data: state.currentWeekTask
        })
    }

    return null
}


export default connect(
    mapStateToProps,
    null
)(WeekCalendar)