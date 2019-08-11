export const currentTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}