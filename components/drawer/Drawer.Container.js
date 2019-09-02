import { connect } from 'react-redux'
import {
    updateCategory,
    createCategory,
    chooseCategory
} from '../shared/actions/categoryAction'

import Drawer from './DrawerVer2'

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCategory: (data) => dispatch(createCategory(data)),
    updateCategory: (id, data) => dispatch(updateCategory(id, data)),
    chooseCategory: (category) => dispatch(chooseCategory(category))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)