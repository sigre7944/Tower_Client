import { connect } from 'react-redux'
import { updateCategory } from '../shared/actions/updateCategory'
import { createCategory } from '../shared/actions/createCategory'
import Drawer from './DrawerVer2'

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCategory: (data) => dispatch(createCategory(data)),
    updateCategory: (id, data) => dispatch(updateCategory(id, data))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Drawer)