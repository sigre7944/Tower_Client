import {connect} from 'react-redux'
import Category from '../Category'
import {createCategory} from '../../../main/bottomTabNavigator/layouts/modal-component/category/actions/createCategory'
import {updateCategory} from '../edit-container/actions/updateCategory'
const mapStateToProps = (state) => ({
    categories: state.categories,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCategory: (data) => dispatch(createCategory(data)),
    updateCategory: (data) => dispatch(updateCategory(ownProps.action_type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)