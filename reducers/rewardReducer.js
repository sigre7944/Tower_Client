import { Map, List, fromJS, OrderedMap } from 'immutable'

export const balance = (state = 4000, action) => {
    switch (action.type) {
        case 'DEPOSIT_BALANCE_AMOUNT':
            return state + action.amount

        case 'WITHDRAW_BALANCE_AMOUNT':
            return state - action.amount

        default:
            return state
    }
}

let rewards_map = fromJS({
    reward_01: {
        id: "reward_01",
        name: "Testing obj",
        value: "100",
    }
})

export const rewards = (state = OrderedMap(), action) => {
    switch (action.type) {
        case "UPDATE_KEYPATH_REWARD":
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "DELETE_KEYPATH_REWARD":
            return state.deleteIn(action.keyPath)

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