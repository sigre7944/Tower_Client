import { Map, fromJS } from 'immutable'

let initialState = {
    pri_01: {
        name: "Do first",
        importance: 1,
        urgency: 1,
        defaultValue: 5,
        color: "#F78096",
        tasks: [] // item = {id: task_id, category: task_category}
    },

    pri_02: {
        name: "Plan",
        importance: 1,
        urgency: 0,
        defaultValue: 3.5,
        color: "#EFDA6E",
        tasks: []
    },

    pri_03: {
        name: "Delay",
        importance: 0,
        urgency: 1,
        defaultValue: 2,
        color: "#6F73D9",
        tasks: []
    },

    pri_04: {
        name: "Delegate",
        importance: 0,
        urgency: 0,
        defaultValue: 0.5,
        color: "#CBC8C8",
        tasks: []
    },

}

export const priorities = (state = Map(fromJS(initialState)), action) => {
    switch (action.type) {
        case "UPDATE_PRIORITY":
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "RETURN_NEW_PRIORITIES":
            return action.data.toMap()

        default:
            return state
    }
}