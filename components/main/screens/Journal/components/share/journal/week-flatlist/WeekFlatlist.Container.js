import { connect } from 'react-redux'
import { updateHeaderText } from '../../../../../../../shared/actions/otherAction'
import WeekFlatlist from './WeekFlatlist'

const mapStateToProps = (state, ownProps) => {
    return ({
        headerPressed: state["headerPressed"],
        currentRoute: state["currentRoute"]
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateHeaderText: (data) => dispatch(updateHeaderText(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeekFlatlist)