import {connect} from 'react-redux'
import {addTodoToAll} from '../../../../../actions/addAllTodo'
import AddAllTodo from '../components/AddAllTodo.Presentational'

const mapStateToProps  = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addTodoToAll: (title) => dispatch(addTodoToAll(title))
})

const AddAllTodoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAllTodo)

export default AddAllTodoContainer