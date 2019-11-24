import { connect } from 'react-redux'
import { updateCategory } from './actions/updateCategory'
import AddCategoryPanel from './AddCategoryPanel'

const mapStateToProps = (state, ownProps) => {
    return({
        categories: state["categories"]
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCategory: (data) => dispatch(updateCategory(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategoryPanel)