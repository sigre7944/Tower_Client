export const tasks = (state = [], action) => {
    switch (action.type){
        case 'ADD_NEW_TASK':
            return [... state, action.data]

        default:
            return state
    }
}