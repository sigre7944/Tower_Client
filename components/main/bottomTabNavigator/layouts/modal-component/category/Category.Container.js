import {connect} from 'react-redux'
import Category from './Category'
import {createCategory} from './actions/createCategory'
import {updateCategory} from './actions/updateCategory'

const mapStateToProps = (state) => ({
    categories: state.categories,
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
})

const mapDispatchToProps = (dispatch) => ({
    createCategory: (data) => dispatch(createCategory(data)),
    updateCategory: (type, category) => dispatch(updateCategory(type, category))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)