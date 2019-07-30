export const categories = (state = {}, action) => {

    switch (action.type) {
        case 'CREATE_CATEGORY':
            return { ...state, ...action.data }

        default:

            return state
    }
}

