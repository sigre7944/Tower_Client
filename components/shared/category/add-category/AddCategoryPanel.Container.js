import {connect} from 'react-redux'
import AddCategoryPanel from './AddCategoryPanel'
import {createCategory} from '../../actions/createCategory'

const mapStateToProps = (state) => ({
    categories: state.categories,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCategory: (data) => dispatch(createCategory(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategoryPanel)