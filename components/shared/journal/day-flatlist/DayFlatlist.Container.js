import { connect } from 'react-redux'
import { updateHeaderText } from '../../actions/updateHeaderText'
import DayFlatlist from './DayFlatlist'

const mapStateToProps = (state, ownProps) => {
    return ({
        headerPressed: state.headerPressed
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateHeaderText: (data) => dispatch(updateHeaderText(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayFlatlist)