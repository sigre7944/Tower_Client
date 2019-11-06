import { connect } from 'react-redux'
import { updateHeaderText } from '../../actions/otherAction'
import MonthFlatlist from './MonthFlatlist'

const mapStateToProps = (state, ownProps) => {
    return ({
        headerPressed: state.get("headerPressed"),
        currentRoute: state.get("currentRoute")
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateHeaderText: (data) => dispatch(updateHeaderText(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthFlatlist)