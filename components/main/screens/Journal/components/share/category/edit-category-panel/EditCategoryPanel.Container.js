import { connect } from 'react-redux'
import { updateCategory } from './actions/updateCategory'
import EditCategoryPanel from './EditCategoryPanel'

const mapStateToProps = (state, ownProps) => {
    return({
        categories: state.get("categories")
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCategory: (data) => dispatch(updateCategory(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCategoryPanel)