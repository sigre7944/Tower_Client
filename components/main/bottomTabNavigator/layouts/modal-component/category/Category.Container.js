import {connect} from 'react-redux'
import Category from './Category'
import {createCategory} from './actions/createCategory'
import {updateCategory} from './actions/updateCategory'

const mapStateToProps = (state) => ({
    categories: state.categories,
    currentTask: state.currentTask,
})

const mapDispatchToProps = (dispatch) => ({
    createCategory: (data) => dispatch(createCategory(data)),
    updateCategory: (data) => dispatch(updateCategory(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)