import { connect } from 'react-redux'
import MonthCalendar from './MonthCalendar'

const mapStateToProps = (state, ownProps) => {

    if(!ownProps.edit){
        return({
            task_data: state.currentMonthTask
        })
    }

    return {}
}

export default connect(
    mapStateToProps,
    null
)(MonthCalendar)