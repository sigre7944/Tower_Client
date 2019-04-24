import {connect} from 'react-redux'

import DisplayAllTodos from '../components/DisplayAllTodos.Presentational'

const mapStateToProps = (state) => ({
    allTodos : state.allTodos
})

export default connect(
    mapStateToProps,
    null
)(DisplayAllTodos)