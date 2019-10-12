import { Map, List } from 'immutable'

export const balance = (state = 4000, action) => {
    switch (action.type) {
        case 'DEPOSIT_AMOUNT':
            return state + action.amount

        case 'WITHDRAW_AMOUNT':
            return state - action.amount

        default:
            return state
    }
}

let rewards_map = Map().asMutable()
rewards_map.set("is_add_button", {
    is_add_button: true
})

export const rewards = (state = rewards_map, action) => {
    switch (action.type) {
        case "CREATE_REWARD":
            return state.set(action.id, action.data)

        case "UPDATE_REWARD":
            return state.update(action.id, (value) => action.data)

        case "DELETE_REWARD":
            return state.delete(action.id)

        default:
            return state
    }
}

export const main_reward = (state = "", action) => {
    switch (action.type) {
        case "UPDATE_MAIN_REWARD":
            return action.id

        default:
            return state
    }
}

export const purchase_history = (state = Map(), action) => {
    switch (action.type) {
        case "ADD_PURCHASE_ITEM":
            return state.setIn([action.timestamp, action.id], action.data)

        case "UPDATE_PURCHASE_ITEM":
            return state.updateIn([action.timestamp, action.id], action.data, (value) => action.data)

        case "REMOVE_PURCHASE_ITEM":
            return state.deleteIn([action.timestamp, action.id])

        case "REMOVE_PURCHASE_TIMESTAMP":
            return state.delete(action.timestamp)

        default:
            return state
    }
}