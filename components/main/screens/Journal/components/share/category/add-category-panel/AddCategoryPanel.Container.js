import { connect } from 'react-redux'
import { updateCategory } from './actions/updateCategory'
import AddCategoryPanel from './AddCategoryPanel'

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCategory: (data) => dispatch(updateCategory(data))
})

export default connect(
    null,
    mapDispatchToProps
)(AddCategoryPanel)