import { connect } from 'react-redux'
import { returnNewSortSettings } from "../../../../../../../../shared/actions/otherAction";
import SortPanel from './SortPanel'

const mapStateToProps = (state, ownProps) => {
    return ({
        sortSettings: state["sortSettings"]
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    returnNewSortSettings: (data) => dispatch(returnNewSortSettings(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortPanel)