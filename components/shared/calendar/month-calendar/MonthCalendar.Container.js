import { connect } from 'react-redux'
import MonthCalendar from './MonthCalendar'

const mapStateToProps = (state, ownProps) => {

    if(ownProps.edit){
        return({
            task_data: state.edittingTask
        })
    }

    else{
        return({
            task_data: state.currentMonthTask
        })
    }
}

export default connect(
    mapStateToProps,
    null
)(MonthCalendar)