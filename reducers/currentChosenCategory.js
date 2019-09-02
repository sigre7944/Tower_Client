export const currentChosenCategory = (state = "general", action) => {
    switch(action.type){
        case 'UPDATE_CURRENT_CHOSEN_CATEGORY':
            return action.data

        default:
            return state
    }
}