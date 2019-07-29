export const tasks = (state = [], action) => {
    switch (action.type){
        case 'ADD_TASK':
            return [... state, action.task]

        default:
            return state
    }
}