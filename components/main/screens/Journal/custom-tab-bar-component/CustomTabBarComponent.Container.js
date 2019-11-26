import { connect } from 'react-redux'
import { updateCurrentChosenJournalType } from '../../../../shared/actions/otherAction'
import CustomTabBarComponent from './CustomTabBarComponent'

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCurrentChosenJournalType: (data) => dispatch(updateCurrentChosenJournalType(data))
})

export default connect(
    null,
    mapDispatchToProps
)(CustomTabBarComponent)