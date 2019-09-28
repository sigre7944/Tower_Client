import { Map } from 'immutable'

export const balance = (state = 0, action) => {
    switch (action.type) {
        case 'DEPOSIT_AMOUNT':
            return state + action.amount

        case 'WITHDRAW_AMOUNT':
            return state - action.amount

        default:
            return state
    }
}

export const rewards = (state = Map(), action) => {
    switch (action.type) {

        default:
            return state
    }
}