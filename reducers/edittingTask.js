export const edittingTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_EDIT_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}