import { Map, fromJS } from 'immutable'

let initialState = {
    pri_01: {
        name: "Do First",
        importance: 1,
        urgency: 1,
        defaultValue: 5
    },

    pri_02: {
        name: "Plan",
        importance: 1,
        urgency: 0,
        defaultValue: 3
    },

    pri_03: {
        name: "Delay",
        importance: 0,
        urgency: 1,
        defaultValue: 2
    },

    pri_04: {
        name: "Delegate",
        importance: 0,
        urgency: 0,
        defaultValue: 1
    },

}

export const priorities = (state = Map(fromJS(initialState)), action) => {
    switch (action.type) {
        default:
            return state
    }
}