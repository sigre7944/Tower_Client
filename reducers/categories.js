let initialState = {
    cate_0: {
        name: "Inbox",
        color: "red",
    }
}

export const categories = (state = initialState, action) => {

    switch (action.type) {
        case 'CREATE_CATEGORY':
            return { ...state, ...action.data }

        default:

            return state
    }
}

