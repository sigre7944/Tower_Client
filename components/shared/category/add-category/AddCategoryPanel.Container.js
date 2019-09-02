import { connect } from 'react-redux'
import AddCategoryPanel from './AddCategoryPanel'
import { createCategory } from '../../actions/createCategory'
import { updateCategory } from '../../actions/updateCategory'

const mapStateToProps = (state) => ({
    categories: state.categories,
})

const mapDispatchToProps = (dispatch, ownProps) => {
    if (!ownProps.edit) {
        return ({
            createCategory: (data) => dispatch(createCategory(data))
        })
    }

    return ({
        updateCategory: (id, data) => dispatch(updateCategory(id, data))
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategoryPanel)