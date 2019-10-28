import { Map, fromJS } from "immutable"

let initialState = fromJS({
    cate_0: {
        id: "cate_0",
        name: "Inbox",
        color: "#F78096",
        quantity: 0
    }
})

export const categories = (state = Map(initialState), action) => {
    switch (action.type) {
        // case 'CREATE_CATEGORY':
        //     return state.set(action.id, { ...action.data })

        case 'UPDATE_CATEGORY':
            return state.updateIn(action.keyPath, action.updater)

        case 'DELETE_CATEGORY':
            return state.delete(action.id)

        default:
            return state
    }
}

export const currentChosenCategory = (state = "general", action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_CHOSEN_CATEGORY':
            return action.data

        default:
            return state
    }
}