import { Map, fromJS, OrderedMap, isKeyed } from "immutable"
let initialState = fromJS({
    cate_0: {
        id: `cate_0`,
        name: "Inbox",
        color: "#F78096",
        quantity: 0
    }
}, (key, value, path) => {
    return isKeyed(value) ? value.toOrderedMap() : value.toList()
})

export const categories = (state = initialState, action) => {
    switch (action.type) {

        case 'UPDATE_CATEGORY':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'DELETE_CATEGORY':
            return state.delete(action.id)

        default:
            return state
    }
}

export const currentChosenCategory = (state = "cate_0", action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_CHOSEN_CATEGORY':
            return action.data

        default:
            return state
    }
}