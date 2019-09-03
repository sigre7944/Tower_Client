
export const headerText = (state = "", action) => {
    switch(action.type){
        case 'UPDATE_HEADER_TEXT':
            return action.data

        default:
            return state
    }
}

export const headerPressed = (state = false, action) => {
    switch(action.type){
        case 'TOGGLE_RETURN':
            return !state

        default:
            return state
    }
}