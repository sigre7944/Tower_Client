import {combineReducers} from 'redux'
import {allTodos} from './allTodos'
import {allCompletedTodos} from './allCompletedTodos'
const rootReducer = combineReducers({
    allTodos,
    allCompletedTodos
})
export default rootReducer