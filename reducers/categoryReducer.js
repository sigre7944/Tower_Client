import { Map, fromJS, OrderedMap, isKeyed } from "immutable"
let initialState = fromJS({
    id: `cate_0`,
    name: "Inbox",
    color: "#F78096",
    quantity: 0
})

let category_orderedMap = OrderedMap().asMutable()

category_orderedMap.set(Map(initialState).get("id"), initialState)

// let initiaState_orderedMap = fromJS(initialState, (key, value, path) => {
//     return isKeyed(value) ? value.toOrderedMap() : value.toList()
// })

export const categories = (state = category_orderedMap.toOrderedMap(), action) => {
    switch (action.type) {

        case 'UPDATE_CATEGORY':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

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